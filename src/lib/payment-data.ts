import { PaymentMethod, Country, CustomerType, RiskLevel, DeviceContext, OptimizationMode, BusinessModel, TransactionInput, FrictionLevel, PresetScenario } from './types';

export const PAYMENT_METHODS: PaymentMethod[] = [
  // Card payments
  {
    id: 'card',
    name: 'Card',
    type: 'card',
    supportedCountries: ['US', 'CA', 'GB', 'IN', 'BR', 'DE', 'SG'],
    baseSuccessRate: 0.94,
    feeProfile: {
      fixedFee: 0.30,
      percentageFee: 0.029,
      effectiveFee: 0
    },
    friction: 'medium',
    mobileFriendly: true,
    returningCustomerAdvantage: 0.05,
    riskSuitability: ['low', 'medium', 'high'],
    description: 'Traditional credit and debit card payments'
  },

  // Digital wallets
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    type: 'wallet',
    supportedCountries: ['US', 'CA', 'GB', 'DE', 'SG'],
    baseSuccessRate: 0.96,
    feeProfile: {
      fixedFee: 0.30,
      percentageFee: 0.029,
      effectiveFee: 0
    },
    friction: 'low',
    mobileFriendly: true,
    returningCustomerAdvantage: 0.03,
    riskSuitability: ['low', 'medium'],
    description: 'Frictionless mobile wallet payments'
  },

  {
    id: 'google_pay',
    name: 'Google Pay',
    type: 'wallet',
    supportedCountries: ['US', 'CA', 'GB', 'IN', 'DE', 'SG'],
    baseSuccessRate: 0.95,
    feeProfile: {
      fixedFee: 0.30,
      percentageFee: 0.029,
      effectiveFee: 0
    },
    friction: 'low',
    mobileFriendly: true,
    returningCustomerAdvantage: 0.03,
    riskSuitability: ['low', 'medium'],
    description: 'Frictionless mobile wallet payments'
  },

  // Bank debit methods
  {
    id: 'ach',
    name: 'ACH Bank Debit',
    type: 'bank_debit',
    supportedCountries: ['US'],
    baseSuccessRate: 0.89,
    feeProfile: {
      fixedFee: 0.25,
      percentageFee: 0.008,
      effectiveFee: 0
    },
    friction: 'high',
    mobileFriendly: true,
    returningCustomerAdvantage: 0.08,
    riskSuitability: ['low', 'medium'],
    description: 'Direct bank transfer with lower fees'
  },

  {
    id: 'sepa_debit',
    name: 'SEPA Direct Debit',
    type: 'bank_debit',
    supportedCountries: ['DE', 'GB'],
    baseSuccessRate: 0.91,
    feeProfile: {
      fixedFee: 0.35,
      percentageFee: 0.008,
      effectiveFee: 0
    },
    friction: 'high',
    mobileFriendly: true,
    returningCustomerAdvantage: 0.07,
    riskSuitability: ['low', 'medium'],
    description: 'European bank transfer with low fees'
  },

  // Local methods
  {
    id: 'upi',
    name: 'UPI',
    type: 'bank_redirect',
    supportedCountries: ['IN'],
    baseSuccessRate: 0.93,
    feeProfile: {
      fixedFee: 0.10,
      percentageFee: 0.015,
      effectiveFee: 0
    },
    friction: 'low',
    mobileFriendly: true,
    returningCustomerAdvantage: 0.04,
    riskSuitability: ['low', 'medium'],
    description: 'Unified Payments Interface - India\'s popular payment system'
  },

  {
    id: 'boleto',
    name: 'Boleto',
    type: 'voucher',
    supportedCountries: ['BR'],
    baseSuccessRate: 0.88,
    feeProfile: {
      fixedFee: 0.50,
      percentageFee: 0.035,
      effectiveFee: 0
    },
    friction: 'high',
    mobileFriendly: false,
    returningCustomerAdvantage: 0.02,
    riskSuitability: ['medium', 'high'],
    description: 'Brazilian voucher-based payment method'
  },

  // Saved payment methods
  {
    id: 'link',
    name: 'Link (Saved Payment)',
    type: 'wallet',
    supportedCountries: ['US', 'CA', 'GB', 'IN', 'BR', 'DE', 'SG'],
    baseSuccessRate: 0.97,
    feeProfile: {
      fixedFee: 0.30,
      percentageFee: 0.029,
      effectiveFee: 0
    },
    friction: 'low',
    mobileFriendly: true,
    returningCustomerAdvantage: 0.12,
    riskSuitability: ['low', 'medium', 'high'],
    description: 'One-click payments with saved payment methods'
  }
];

export const COUNTRY_LABELS: Record<Country, string> = {
  'US': 'United States',
  'CA': 'Canada',
  'GB': 'United Kingdom',
  'IN': 'India',
  'BR': 'Brazil',
  'DE': 'Germany',
  'SG': 'Singapore'
};

export const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  'low': 'Low Risk',
  'medium': 'Medium Risk',
  'high': 'High Risk'
};

export const FRICTION_LABELS: Record<FrictionLevel, string> = {
  'low': 'Low Friction',
  'medium': 'Medium Friction',
  'high': 'High Friction'
};

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'us-new-low-risk-desktop',
    name: 'US New Customer (Low Risk)',
    description: 'First-time US customer on desktop',
    inputs: {
      amount: 100,
      customerCountry: 'US',
      customerType: 'new',
      riskLevel: 'low',
      deviceContext: 'desktop',
      optimizationMode: 'conversion',
      businessModel: 'ecommerce'
    }
  },
  {
    id: 'us-returning-mobile',
    name: 'US Returning Mobile Customer',
    description: 'Returning US customer on mobile',
    inputs: {
      amount: 50,
      customerCountry: 'US',
      customerType: 'returning',
      riskLevel: 'low',
      deviceContext: 'mobile',
      optimizationMode: 'conversion',
      businessModel: 'ecommerce'
    }
  },
  {
    id: 'br-high-risk-new',
    name: 'Brazil High-Risk New Customer',
    description: 'High-risk transaction from new Brazilian customer',
    inputs: {
      amount: 250,
      customerCountry: 'BR',
      customerType: 'new',
      riskLevel: 'high',
      deviceContext: 'desktop',
      optimizationMode: 'conversion',
      businessModel: 'ecommerce'
    }
  },
  {
    id: 'de-returning-saas',
    name: 'Germany SaaS Subscription',
    description: 'Returning German customer for SaaS',
    inputs: {
      amount: 1000,
      customerCountry: 'DE',
      customerType: 'returning',
      riskLevel: 'medium',
      deviceContext: 'desktop',
      optimizationMode: 'cost',
      businessModel: 'saas'
    }
  }
];
