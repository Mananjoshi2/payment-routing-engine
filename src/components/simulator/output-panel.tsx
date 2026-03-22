'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PaymentRecommendation, AlternativeRecommendation } from '@/lib/types';
import { CheckCircle, TrendingUp, DollarSign, Target, Info, ArrowRight } from 'lucide-react';

interface OutputPanelProps {
  recommendation: PaymentRecommendation | null;
  alternatives: AlternativeRecommendation[];
  isLoading: boolean;
  hasRun: boolean;
}

export function OutputPanel({ recommendation, alternatives, isLoading, hasRun }: OutputPanelProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="h-full border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500">Processing payment options...</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!hasRun) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="h-full border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Configure parameters and run analysis</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!recommendation) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="h-full border-gray-200 shadow-sm">
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-gray-500">No suitable payment methods found</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
    >
      {/* Primary Recommendation */}
      <Card className="border border-green-500/20 shadow-lg bg-gradient-to-br from-green-50/30 to-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Recommended Method</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-2xl font-semibold text-gray-900">{recommendation.method.name}</h3>
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs font-medium">
                  {recommendation.optimizationMode === 'conversion' ? 'Best for conversion' : 
                   recommendation.optimizationMode === 'cost' ? 'Lowest cost' : 
                   'Balanced recommendation'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{recommendation.method.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {(recommendation.estimatedSuccessRate * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 font-medium">Success Rate</div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-green-100/50">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-blue-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xl font-bold">
                  {(recommendation.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">Confidence</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-green-600">
                <DollarSign className="h-4 w-4" />
                <span className="text-xl font-bold">
                  ${recommendation.estimatedFee.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">Est. Fee</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-gray-700">
                <Target className="h-4 w-4" />
                <span className="text-xl font-bold">
                  {(recommendation.score * 100).toFixed(0)}
                </span>
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">Score</div>
            </div>
          </div>

          {/* Reasoning */}
          <div className="bg-green-50/50 p-4 rounded-lg border border-green-100">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-green-700 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900 mb-2">Analysis Summary</h4>
                <p className="text-sm text-green-800 leading-relaxed">{recommendation.reasoning}</p>
              </div>
            </div>
          </div>

          {/* Tradeoffs */}
          {recommendation.keyTradeoffs.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Key Tradeoffs</h4>
              <div className="space-y-2">
                {recommendation.keyTradeoffs.map((tradeoff, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <ArrowRight className="h-3 w-3 text-gray-400 mt-1 flex-shrink-0" />
                    <span>{tradeoff}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Alternative Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alternatives.map((alternative, index) => (
                <motion.div
                  key={alternative.method.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors duration-200"
                >
                  <div className="flex-1 pr-6">
                    <h4 className="font-semibold text-gray-900 text-base">{alternative.method.name}</h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{alternative.reasonNotPrimary}</p>
                  </div>
                  <div className="text-right space-y-1 flex-shrink-0">
                    <div className="text-lg font-bold text-gray-900">
                      {(alternative.estimatedSuccessRate * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-500">
                      ${alternative.estimatedFee.toFixed(2)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
