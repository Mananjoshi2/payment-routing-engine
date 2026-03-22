import {
  TransactionInput,
  PaymentMethod,
  PaymentRecommendation,
  AlternativeRecommendation,
  RoutingResult,
  OptimizationMode
} from './types';
import { PAYMENT_METHODS } from './payment-data';

export class PaymentRoutingEngine {
  /**
   * Calculate effective fee based on transaction amount
   */
  private calculateEffectiveFee(method: PaymentMethod, amount: number): number {
    const { fixedFee, percentageFee } = method.feeProfile;
    return fixedFee + (amount * percentageFee);
  }

  /**
   * Get candidate payment methods based on geography and context
   */
  private getCandidateMethods(input: TransactionInput): PaymentMethod[] {
    return PAYMENT_METHODS.filter(method => {
      // Check country support
      if (!method.supportedCountries.includes(input.customerCountry)) {
        return false;
      }

      // Check risk suitability
      if (!method.riskSuitability.includes(input.riskLevel)) {
        return false;
      }

      // Check mobile compatibility
      if (input.deviceContext === 'mobile' && !method.mobileFriendly) {
        return false;
      }

      // Link (saved payment) only for returning customers
      if (method.id === 'link' && input.customerType !== 'returning') {
        return false;
      }

      return true;
    });
  }

  /**
   * Calculate success rate adjustments based on context
   */
  private calculateSuccessRate(method: PaymentMethod, input: TransactionInput): number {
    let successRate = method.baseSuccessRate;

    // Customer type adjustment
    if (input.customerType === 'returning') {
      successRate += method.returningCustomerAdvantage;
    }

    // Device context adjustment
    if (input.deviceContext === 'mobile' && method.mobileFriendly) {
      successRate += 0.02; // Mobile-friendly methods get a boost on mobile
    } else if (input.deviceContext === 'mobile' && !method.mobileFriendly) {
      successRate -= 0.05; // Non-mobile-friendly methods are penalized on mobile
    }

    // Risk level adjustment
    if (input.riskLevel === 'high') {
      successRate -= 0.03; // Higher risk reduces success rates
    } else if (input.riskLevel === 'low') {
      successRate += 0.02; // Low risk improves success rates
    }

    // Amount-based adjustment (very small or very large amounts)
    if (input.amount < 10) {
      successRate -= 0.01; // Small amounts might have slightly lower conversion
    } else if (input.amount > 1000) {
      successRate -= 0.02; // Large amounts have higher friction
    }

    // Cap success rate between 70% and 99%
    return Math.max(0.70, Math.min(0.99, successRate));
  }

  /**
   * Calculate friction score (lower is better)
   */
  private calculateFrictionScore(method: PaymentMethod, input: TransactionInput): number {
    const frictionScores = { low: 0.1, medium: 0.3, high: 0.7 };
    let score = frictionScores[method.friction];

    // Saved wallet context bonus
    if (input.deviceContext === 'saved_wallet') {
      score *= 0.3; // Huge reduction in friction for saved wallets
    }

    // Returning customer bonus
    if (input.customerType === 'returning') {
      score *= 0.7; // Returning customers experience less friction
    }

    return score;
  }

  /**
   * Calculate cost score (lower fees are better)
   */
  private calculateCostScore(method: PaymentMethod, amount: number): number {
    const effectiveFee = this.calculateEffectiveFee(method, amount);
    const feePercentage = effectiveFee / amount;
    
    // Normalize to 0-1 scale (lower fees = higher score)
    // 5% fee = 0 score, 0% fee = 1 score
    return Math.max(0, 1 - (feePercentage / 0.05));
  }

  /**
   * Calculate overall score based on optimization mode
   */
  private calculateOverallScore(
    method: PaymentMethod,
    input: TransactionInput,
    successRate: number,
    frictionScore: number,
    costScore: number
  ): number {
    const weights = this.getOptimizationWeights(input.optimizationMode);
    
    return (
      (successRate * weights.successRate) +
      ((1 - frictionScore) * weights.friction) +
      (costScore * weights.cost)
    ) / (weights.successRate + weights.friction + weights.cost);
  }

  /**
   * Get optimization weights based on mode
   */
  private getOptimizationWeights(mode: OptimizationMode) {
    switch (mode) {
      case 'conversion':
        return { successRate: 0.6, friction: 0.3, cost: 0.1 };
      case 'cost':
        return { successRate: 0.3, friction: 0.2, cost: 0.5 };
      case 'balanced':
        return { successRate: 0.4, friction: 0.3, cost: 0.3 };
      default:
        return { successRate: 0.4, friction: 0.3, cost: 0.3 };
    }
  }

  /**
   * Generate reasoning for recommendation
   */
  private generateReasoning(
    method: PaymentMethod,
    input: TransactionInput,
    successRate: number,
    effectiveFee: number
  ): string {
    const reasons: string[] = [];

    // Base reasoning
    reasons.push(`${method.name} offers ${(successRate * 100).toFixed(1)}% estimated success rate`);

    // Optimization-specific reasoning
    if (input.optimizationMode === 'conversion') {
      if (method.friction === 'low') {
        reasons.push('low customer friction');
      }
      if (input.deviceContext === 'mobile' && method.mobileFriendly) {
        reasons.push('excellent mobile experience');
      }
    } else if (input.optimizationMode === 'cost') {
      const feePercentage = (effectiveFee / input.amount * 100).toFixed(2);
      reasons.push(`competitive ${feePercentage}% effective fee`);
    } else {
      reasons.push('balanced performance across all metrics');
    }

    // Context-specific reasoning
    if (input.customerType === 'returning' && method.returningCustomerAdvantage > 0.05) {
      reasons.push('strong performance with returning customers');
    }

    if (input.riskLevel === 'low' && method.baseSuccessRate > 0.95) {
      reasons.push('ideal for low-risk transactions');
    }

    return reasons.join(', ') + '.';
  }

  /**
   * Generate key tradeoffs
   */
  private generateKeyTradeoffs(
    method: PaymentMethod,
    input: TransactionInput,
    alternatives: AlternativeRecommendation[]
  ): string[] {
    const tradeoffs: string[] = [];

    // Fee vs success rate tradeoffs
    const cheaperAlternatives = alternatives.filter(alt => 
      alt.estimatedFee < this.calculateEffectiveFee(method, input.amount)
    );

    if (cheaperAlternatives.length > 0 && input.optimizationMode !== 'cost') {
      const cheapestAlt = cheaperAlternatives[0];
      const savings = this.calculateEffectiveFee(method, input.amount) - cheapestAlt.estimatedFee;
      tradeoffs.push(`Could save $${savings.toFixed(2)} with ${cheapestAlt.method.name} but with ${(cheapestAlt.estimatedSuccessRate * 100).toFixed(1)}% success rate`);
    }

    // Friction tradeoffs
    if (method.friction === 'high' && input.optimizationMode === 'conversion') {
      const lowFrictionAlternatives = alternatives.filter(alt => 
        alt.method.friction === 'low'
      );
      if (lowFrictionAlternatives.length > 0) {
        tradeoffs.push(`Higher friction than ${lowFrictionAlternatives[0].method.name} but offers better rates`);
      }
    }

    // Mobile optimization tradeoffs
    if (input.deviceContext === 'mobile' && !method.mobileFriendly) {
      tradeoffs.push('Not optimized for mobile checkout experience');
    }

    return tradeoffs;
  }

  /**
   * Main routing calculation
   */
  public calculateOptimalRouting(input: TransactionInput): RoutingResult {
    const startTime = performance.now();
    
    // Get candidate methods
    const candidates = this.getCandidateMethods(input);
    
    // Score each method
    const scoredMethods = candidates.map(method => {
      const successRate = this.calculateSuccessRate(method, input);
      const frictionScore = this.calculateFrictionScore(method, input);
      const costScore = this.calculateCostScore(method, input.amount);
      const overallScore = this.calculateOverallScore(method, input, successRate, frictionScore, costScore);
      const effectiveFee = this.calculateEffectiveFee(method, input.amount);

      return {
        method,
        successRate,
        frictionScore,
        costScore,
        overallScore,
        effectiveFee
      };
    });

    // Sort by overall score
    scoredMethods.sort((a, b) => b.overallScore - a.overallScore);

    // Generate primary recommendation
    const best = scoredMethods[0];
    if (!best) {
      throw new Error('No suitable payment methods found');
    }

    const primaryRecommendation: PaymentRecommendation = {
      method: best.method,
      estimatedSuccessRate: best.successRate,
      estimatedFee: best.effectiveFee,
      confidence: Math.min(0.95, best.overallScore + 0.3),
      reasoning: this.generateReasoning(best.method, input, best.successRate, best.effectiveFee),
      score: best.overallScore,
      keyTradeoffs: [],
      optimizationMode: input.optimizationMode
    };

    // Generate alternatives
    const alternatives: AlternativeRecommendation[] = scoredMethods.slice(1, 4).map(scored => {
      let reasonNotPrimary = '';
      
      if (scored.successRate < best.successRate * 0.95) {
        reasonNotPrimary = `Lower success rate (${(scored.successRate * 100).toFixed(1)}% vs ${(best.successRate * 100).toFixed(1)}%)`;
      } else if (scored.effectiveFee > best.effectiveFee * 1.2) {
        reasonNotPrimary = `Higher fees ($${scored.effectiveFee.toFixed(2)} vs $${best.effectiveFee.toFixed(2)})`;
      } else if (scored.method.friction === 'high' && best.method.friction !== 'high') {
        reasonNotPrimary = 'Higher customer friction';
      } else {
        reasonNotPrimary = 'Slightly lower overall score';
      }

      return {
        method: scored.method,
        estimatedSuccessRate: scored.successRate,
        estimatedFee: scored.effectiveFee,
        reasonNotPrimary,
        score: scored.overallScore
      };
    });

    // Add tradeoffs to primary recommendation
    primaryRecommendation.keyTradeoffs = this.generateKeyTradeoffs(best.method, input, alternatives);

    const processingTime = performance.now() - startTime;

    return {
      primaryRecommendation,
      alternatives,
      simulationContext: input,
      metadata: {
        totalMethodsEvaluated: candidates.length,
        confidenceLevel: primaryRecommendation.confidence > 0.8 ? 'high' : 
                        primaryRecommendation.confidence > 0.6 ? 'medium' : 'low',
        processingTime: Math.round(processingTime)
      }
    };
  }
}
