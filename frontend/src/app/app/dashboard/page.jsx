'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

export default function Dashboard() {
  // Dados de exemplo para o dashboard
  const [metricas, setMetricas] = useState({
    caloriasConsumidas: 1450,
    caloriasAlvo: 2000,
    proteinas: 75,
    carboidratos: 150,
    gorduras: 45,
    aguaConsumida: 1.5,
    aguaAlvo: 2.5,
    passosDados: 6500,
    passosAlvo: 10000
  });

  // Memoiza cálculos de porcentagem
  const porcentagens = useMemo(() => ({
    calorias: Math.min(Math.round((metricas.caloriasConsumidas / metricas.caloriasAlvo) * 100), 100),
    agua: Math.min(Math.round((metricas.aguaConsumida / metricas.aguaAlvo) * 100), 100),
    passos: Math.min(Math.round((metricas.passosDados / metricas.passosAlvo) * 100), 100)
  }), [metricas]);

  // Memoiza cálculo de macros totais
  const macrosTotais = useMemo(() => {
    const total = metricas.proteinas + metricas.carboidratos + metricas.gorduras;
    return {
      total,
      proteinasPerc: Math.round((metricas.proteinas / total) * 100),
      carboidratosPerc: Math.round((metricas.carboidratos / total) * 100),
      gordurasPerc: Math.round((metricas.gorduras / total) * 100)
    };
  }, [metricas.proteinas, metricas.carboidratos, metricas.gorduras]);

  // Simular chamada à API para obter os dados
  React.useEffect(() => {
    // Aqui seria feita a chamada à API
    // const fetchDados = async () => {
    //   try {
    //     const response = await fetch('/api/metricas/hoje');
    //     const dados = await response.json();
    //     setMetricas(dados);
    //   } catch (error) {
    //     console.error('Erro ao buscar métricas:', error);
    //   }
    // };
    // 
    // fetchDados();
  }, []);

  const calcularPorcentagem = useCallback((valor, alvo) => {
    return Math.min(Math.round((valor / alvo) * 100), 100);
  }, []);

  return (
    <div className="pt-20 pb-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Meu Progresso</h1>
      
      {/* Card de calorias */}
      <motion.div 
        className="bg-white p-4 rounded-xl shadow-sm mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-semibold text-gray-700 mb-2">Calorias</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold">{metricas.caloriasConsumidas}</span>
          <span className="text-gray-500">/{metricas.caloriasAlvo} kcal</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-500 h-2.5 rounded-full" 
            style={{ width: `${porcentagens.calorias}%` }}
          ></div>
        </div>
      </motion.div>
      
      {/* Macronutrientes */}
      <motion.div 
        className="bg-white p-4 rounded-xl shadow-sm mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="font-semibold text-gray-700 mb-3">Macronutrientes</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-blue-600 font-semibold">{metricas.proteinas}g</span>
            </div>
            <p className="text-xs text-gray-600">Proteínas</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-amber-600 font-semibold">{metricas.carboidratos}g</span>
            </div>
            <p className="text-xs text-gray-600">Carboidratos</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-rose-600 font-semibold">{metricas.gorduras}g</span>
            </div>
            <p className="text-xs text-gray-600">Gorduras</p>
          </div>
        </div>
      </motion.div>
      
      {/* Água e Passos */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <motion.div 
          className="bg-white p-4 rounded-xl shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="font-semibold text-gray-700 mb-2">Água</h2>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-500">{metricas.aguaConsumida}L</span>
            <span className="text-gray-500 text-xs">Meta: {metricas.aguaAlvo}L</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${porcentagens.agua}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white p-4 rounded-xl shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="font-semibold text-gray-700 mb-2">Passos</h2>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-green-500">{metricas.passosDados}</span>
            <span className="text-gray-500 text-xs">Meta: {metricas.passosAlvo}</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${porcentagens.passos}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Resumo da dieta */}
      <motion.div 
        className="bg-white p-4 rounded-xl shadow-sm mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="font-semibold text-gray-700 mb-3">Resumo da Dieta</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Café da manhã</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span>350 kcal</span>
              <ArrowRightIcon className="ml-1" />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">Almoço</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span>650 kcal</span>
              <ArrowRightIcon className="ml-1" />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-sm">Jantar</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span>450 kcal</span>
              <ArrowRightIcon className="ml-1" />
            </div>
          </div>
          
          <button className="w-full py-2 text-center text-green-600 text-sm font-medium flex items-center justify-center mt-2">
            Ver relatório completo
            <DoubleArrowRightIcon className="ml-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
} 