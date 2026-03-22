'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Cpu, TrendingUp, Shield, Info } from 'lucide-react';

export function MethodologySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Routing Engine Architecture</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our deterministic payment routing engine evaluates and scores payment methods based on transaction context and optimization objectives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="text-center h-full border-gray-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Context Analysis</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Evaluates geography, device, customer profile, and risk parameters to filter suitable payment methods.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center h-full border-gray-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Success Rate Modeling</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Calculates expected conversion rates using historical patterns and user experience factors.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card className="text-center h-full border-gray-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Risk Assessment</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Matches payment methods to appropriate risk levels and fraud prevention requirements.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Card className="text-center h-full border-gray-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Optimization</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Balances conversion rates, costs, and user experience based on selected objectives.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <Info className="h-5 w-5" />
              <span>Scoring Factors</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Success Rate</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">Variable Weight</Badge>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Base rates adjusted for customer type, device context, and risk parameters.
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Customer Friction</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">Medium Weight</Badge>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Evaluates checkout complexity, authentication requirements, and user familiarity.
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Processing Cost</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">Variable Weight</Badge>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Fixed fees plus percentage-based costs normalized for transaction amount.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <BookOpen className="h-5 w-5" />
              <span>System Characteristics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">Modeled Tradeoffs</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Success rates, fees, and recommendations are modeled for analysis and comparison.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">Deterministic Logic</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Identical inputs consistently produce the same routing recommendations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">Real-World Variance</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Actual performance varies by processor, merchant profile, and market conditions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">Local Processing</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    All calculations execute locally in the browser with no external dependencies.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
