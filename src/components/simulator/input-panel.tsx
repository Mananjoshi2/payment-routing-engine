'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TransactionInput, PresetScenario, Country, CustomerType, RiskLevel, DeviceContext, OptimizationMode, BusinessModel } from '@/lib/types';
import { PRESET_SCENARIOS, COUNTRY_LABELS, RISK_LEVEL_LABELS } from '@/lib/payment-data';
import { Zap, RotateCcw } from 'lucide-react';

interface InputPanelProps {
  onSubmit: (input: TransactionInput) => void;
  isLoading: boolean;
}

export function InputPanel({ onSubmit, isLoading }: InputPanelProps) {
  const [input, setInput] = useState<TransactionInput>({
    amount: 100,
    currency: 'USD',
    customerCountry: 'US',
    customerType: 'new',
    riskLevel: 'medium',
    deviceContext: 'desktop',
    optimizationMode: 'balanced',
    businessModel: 'ecommerce'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  const handlePreset = (presetId: string) => {
    const preset = PRESET_SCENARIOS.find(p => p.id === presetId);
    if (preset) {
      setInput(prev => ({
        ...prev,
        ...preset.inputs,
      }));
    }
  };

  const handleReset = () => {
    setInput({
      amount: 100,
      currency: 'USD',
      customerCountry: 'US',
      customerType: 'new',
      riskLevel: 'medium',
      deviceContext: 'desktop',
      optimizationMode: 'balanced',
      businessModel: 'ecommerce'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full border-gray-200 shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-lg font-semibold text-gray-900">Transaction Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Preset Scenarios */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Sample Scenarios</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRESET_SCENARIOS.map((preset) => (
                <Button
                  key={preset.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreset(preset.id)}
                  className="h-auto p-4 text-left justify-start border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 min-h-[80px] w-full"
                >
                  <div className="flex flex-col w-full min-w-0">
                    <div className="font-semibold text-sm text-gray-900 mb-2 leading-tight break-words">{preset.name}</div>
                    <div className="text-xs text-gray-500 leading-relaxed break-words whitespace-normal">{preset.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-semibold text-gray-700">Transaction Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  max="10000"
                  step="0.01"
                  value={input.amount}
                  onChange={(e) => setInput(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                  className="font-mono border-gray-200 focus:border-gray-400 focus:ring-gray-200 focus:ring-2 transition-colors"
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-semibold text-gray-700">Customer Country</Label>
                <Select
                  value={input.customerCountry}
                  onValueChange={(value: string | null) => value && setInput(prev => ({ ...prev, customerCountry: value as Country }))}
                >
                  <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-200 focus:ring-2 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(COUNTRY_LABELS).map(([code, label]) => (
                      <SelectItem key={code} value={code}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Type */}
              <div className="space-y-2">
                <Label htmlFor="customerType" className="text-sm font-semibold text-gray-700">Customer Type</Label>
                <Select
                  value={input.customerType}
                  onValueChange={(value: string | null) => value && setInput(prev => ({ ...prev, customerType: value as CustomerType }))}
                >
                  <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-200 focus:ring-2 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Customer</SelectItem>
                    <SelectItem value="returning">Returning Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Risk Level */}
              <div className="space-y-2">
                <Label htmlFor="riskLevel" className="text-sm font-semibold text-gray-700">Risk Level</Label>
                <Select
                  value={input.riskLevel}
                  onValueChange={(value: string | null) => value && setInput(prev => ({ ...prev, riskLevel: value as RiskLevel }))}
                >
                  <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-200 focus:ring-2 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(RISK_LEVEL_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Device Context */}
              <div className="space-y-2">
                <Label htmlFor="deviceContext" className="text-sm font-semibold text-gray-700">Device Context</Label>
                <Select
                  value={input.deviceContext}
                  onValueChange={(value: string | null) => value && setInput(prev => ({ ...prev, deviceContext: value as DeviceContext }))}
                >
                  <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-200 focus:ring-2 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="saved_wallet">Saved Wallet Environment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Optimization Mode */}
              <div className="space-y-2">
                <Label htmlFor="optimizationMode" className="text-sm font-semibold text-gray-700">Optimization Goal</Label>
                <Select
                  value={input.optimizationMode}
                  onValueChange={(value: string | null) => value && setInput(prev => ({ ...prev, optimizationMode: value as OptimizationMode }))}
                >
                  <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-200 focus:ring-2 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conversion">Maximize Conversion</SelectItem>
                    <SelectItem value="cost">Minimize Cost</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Business Model */}
              <div className="space-y-2">
                <Label htmlFor="businessModel" className="text-sm font-semibold text-gray-700">Business Model (Optional)</Label>
                <Select
                  value={input.businessModel}
                  onValueChange={(value: string | null) => value && setInput(prev => ({ ...prev, businessModel: value as BusinessModel }))}
                >
                  <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-200 focus:ring-2 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="marketplace">Marketplace</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white border-0 transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Run Analysis</span>
                    </div>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
