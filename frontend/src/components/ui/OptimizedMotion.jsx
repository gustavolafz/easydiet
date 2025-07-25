'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import React from 'react';

// Variantes de animação otimizadas
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

// Componente wrapper otimizado
export const OptimizedMotion = ({ children, variant = 'fadeIn', delay = 0, ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    fadeIn: fadeInVariants,
    slideUp: slideUpVariants,
    scale: scaleVariants,
  };

  if (shouldReduceMotion) {
    return <div {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants[variant]}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Hook para animações condicionais
export const useOptimizedAnimation = () => {
  const shouldReduceMotion = useReducedMotion();

  return {
    animate: shouldReduceMotion ? false : true,
    transition: shouldReduceMotion ? { duration: 0 } : undefined,
  };
};

// Componente de lista otimizada
export const OptimizedList = ({ children, staggerDelay = 0.1 }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Item de lista otimizado
export const OptimizedListItem = ({ children, ...props }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div {...props}>{children}</div>;
  }

  return (
    <motion.div
      variants={slideUpVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}; 