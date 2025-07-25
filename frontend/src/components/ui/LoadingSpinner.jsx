'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner({ text = "Carregando..." }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[200px] w-full">
      <motion.div
        className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="mt-4 text-gray-600 animate-pulse">{text}</p>
    </div>
  );
} 