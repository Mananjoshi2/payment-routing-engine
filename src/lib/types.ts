export interface TransactionInput {
  amount: number;
  currency: string;
  customerCountry: Country;
  customerType: CustomerType;
  riskLevel: RiskLevel;
  deviceContext: DeviceContext;
  optimizationMode: OptimizationMode;
  businessModel?: BusinessModel;
}

export type Country = 
  | 'US'
  | 'CA'
  | 'GB'
  | 'IN'
  | 'BR'
  | 'DE'
  | 'SG';

export type CustomerType = 'new' | 'returning';

export type RiskLevel = 'low' | 'medium' | 'high';

export type DeviceContext = 'desktop' | 'mobile' | 'saved_wallet';

export type OptimizationMode = 'conversion' | 'cost' | 'balanced';

export type BusinessModel = 'saas' | 'ecommerce' | 'marketplace';

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentType;
  supportedCountries: Country[];
  baseSuccessRate: number;
  feeProfile: FeeProfile;
  friction: FrictionLevel;
  mobileFriendly: boolean;
  returningCustomerAdvantage: number;
  riskSuitability: RiskLevel[];
  description: string;
}

export type PaymentType = 
  | 'card'
  | 'wallet'
  | 'bank_debit'
  | 'bank_redirect'
  | 'voucher';

export interface FeeProfile {
  fixedFee: number; // in USD
  percentageFee: number; // decimal (e.g., 0.029 for 2.9%)
  effectiveFee: number; // calculated based on transaction amount
}

export type FrictionLevel = 'low' | 'medium' | 'high';

export interface PaymentRecommendation {
  method: PaymentMethod;
  estimatedSuccessRate: number;
  estimatedFee: number;
  confidence: number;
  reasoning: string;
  score: number;
  keyTradeoffs: string[];
  optimizationMode: OptimizationMode;
}

export interface AlternativeRecommendation {
  method: PaymentMethod;
  estimatedSuccessRate: number;
  estimatedFee: number  ;
  reasonNotPrimary: string;
  score: number;
}

export interface RoutingResult {
  primaryRecommendation: PaymentRecommendation;
  alternatives: AlternativeRecommendation[];
  simulationContext: TransactionInput;
  metadata: {
    totalMethodsEvaluated: number;
    confidenceLevel: 'high' | 'medium' | 'low';
    processingTime: number; // ms
  };
}

export interface PresetScenario {
  id: string;
  name: string;
  description: string;
  inputs: Partial<TransactionInput>;
}
