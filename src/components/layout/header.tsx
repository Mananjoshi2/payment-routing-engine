'use client';

import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-200 bg-white sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gray-900 rounded-lg">
                <Cpu className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">
                Payment Routing
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-xs text-gray-400">
              Deterministic Engine
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
