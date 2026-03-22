'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { InputPanel } from '@/components/simulator/input-panel';
import { OutputPanel } from '@/components/simulator/output-panel';
import { MethodologySection } from '@/components/methodology-section';
import { PaymentRoutingEngine } from '@/lib/payment-rules';
import { TransactionInput, RoutingResult } from '@/lib/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [result, setResult] = useState<RoutingResult | null>(null);
  
  const routingEngine = new PaymentRoutingEngine();

  const handleSimulation = async (input: TransactionInput) => {
    setIsLoading(true);
    setHasRun(true);
    
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const routingResult = routingEngine.calculateOptimalRouting(input);
      setResult(routingResult);
    } catch (error) {
      console.error('Routing calculation failed:', error);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
            Payment Routing Engine
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal">
            Optimize payment method selection across conversion rates, processing costs, and customer experience.
          </p>
        </div>

        {/* Main Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <InputPanel onSubmit={handleSimulation} isLoading={isLoading} />
          <OutputPanel
            recommendation={result?.primaryRecommendation || null}
            alternatives={result?.alternatives || []}
            isLoading={isLoading}
            hasRun={hasRun}
          />
        </div>

        {/* Results Metadata */}
        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Methods Evaluated</div>
                  <div className="text-3xl font-bold text-gray-900 mt-1">
                    {result.metadata.totalMethodsEvaluated}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Confidence</div>
                  <div className="text-3xl font-bold text-gray-900 mt-1 capitalize">
                    {result.metadata.confidenceLevel}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Processing Time</div>
                  <div className="text-3xl font-bold text-gray-900 mt-1">
                    {result.metadata.processingTime}ms
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                ${result.simulationContext.amount.toFixed(2)} {result.simulationContext.currency} • {result.simulationContext.customerCountry}
              </div>
            </div>
          </motion.div>
        )}
      </motion.section>

      {/* Methodology Section */}
      <MethodologySection />

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Payment Routing Engine • Deterministic decision engine for payment optimization</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
