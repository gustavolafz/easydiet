'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, Cross2Icon, MagnifyingGlassIcon, CalendarIcon } from '@radix-ui/react-icons';

export default function Daily() {
  const [modalAberto, setModalAberto] = useState(false);
  const [refeicaoSelecionada, setRefeicaoSelecionada] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [dataAtual, setDataAtual] = useState(new Date());

  // Dados de exemplo para refeições do dia
  const [refeicoesHoje, setRefeicoesHoje] = useState([
    {
      id: 1,
      tipo: 'Café da Manhã',
      horario: '07:30',
      alimentos: [
        { id: 1, nome: 'Pão integral', quantidade: '2 fatias', calorias: 160 },
        { id: 2, nome: 'Ovos mexidos', quantidade: '2 unidades', calorias: 140 },
        { id: 3, nome: 'Café com leite', quantidade: '1 xícara', calorias: 50 }
      ],
      totalCalorias: 350
    },
    {
      id: 2,
      tipo: 'Almoço',
      horario: '12:00',
      alimentos: [
        { id: 1, nome: 'Arroz integral', quantidade: '100g', calorias: 120 },
        { id: 2, nome: 'Feijão', quantidade: '80g', calorias: 130 },
        { id: 3, nome: 'Peito de frango grelhado', quantidade: '150g', calorias: 250 },
        { id: 4, nome: 'Salada verde', quantidade: '1 porção', calorias: 45 }
      ],
      totalCalorias: 545
    }
  ]);

  // Dados de exemplo para alimentos disponíveis
  const [alimentosDisponiveis, setAlimentosDisponiveis] = useState([
    { id: 1, nome: 'Maçã', calorias: 52, proteinas: 0.3, carboidratos: 14, gorduras: 0.2 },
    { id: 2, nome: 'Banana', calorias: 89, proteinas: 1.1, carboidratos: 23, gorduras: 0.3 },
    { id: 3, nome: 'Iogurte natural', calorias: 110, proteinas: 8, carboidratos: 12, gorduras: 3 },
    { id: 4, nome: 'Frango grelhado', calorias: 165, proteinas: 31, carboidratos: 0, gorduras: 3.6 },
    { id: 5, nome: 'Arroz integral', calorias: 120, proteinas: 2.6, carboidratos: 25, gorduras: 0.9 },
    { id: 6, nome: 'Aveia', calorias: 187, proteinas: 6.9, carboidratos: 33.7, gorduras: 3.4 },
  ]);

  // Obter as refeições do dia selecionado
  const buscarRefeicoesDoDia = (data) => {
    // Simulação de chamada à API
    // const fetchRefeicoes = async (data) => {
    //   try {
    //     const dataFormatada = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`;
    //     const response = await fetch(`/api/refeicoes/${dataFormatada}`);
    //     const dados = await response.json();
    //     setRefeicoesHoje(dados);
    //   } catch (error) {
    //     console.error('Erro ao buscar refeições:', error);
    //   }
    // };
    //
    // fetchRefeicoes(data);
  };

  React.useEffect(() => {
    buscarRefeicoesDoDia(dataAtual);
  }, [dataAtual]);

  const abrirModal = (tipoRefeicao) => {
    setRefeicaoSelecionada(tipoRefeicao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setRefeicaoSelecionada(null);
    setTermoBusca('');
  };

  const adicionarAlimento = (alimento) => {
    // Simulação de chamada à API para adicionar alimento
    // const adicionarAlimentoApi = async (tipoRefeicao, alimento) => {
    //   try {
    //     const response = await fetch('/api/refeicoes/adicionar', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         data: dataAtual,
    //         tipoRefeicao,
    //         alimento
    //       }),
    //     });
    //
    //     if (response.ok) {
    //       buscarRefeicoesDoDia(dataAtual);
    //     } else {
    //       throw new Error('Falha ao adicionar alimento');
    //     }
    //   } catch (error) {
    //     console.error('Erro ao adicionar alimento:', error);
    //   }
    // };
    //
    // adicionarAlimentoApi(refeicaoSelecionada, alimento);

    // Simulação da atualização da lista
    const refeicaoExistente = refeicoesHoje.find(r => r.tipo === refeicaoSelecionada);
    
    if (refeicaoExistente) {
      const novasRefeicoes = refeicoesHoje.map(refeicao => {
        if (refeicao.tipo === refeicaoSelecionada) {
          const novosAlimentos = [...refeicao.alimentos, { 
            id: Math.random(), 
            nome: alimento.nome, 
            quantidade: '1 porção', 
            calorias: alimento.calorias 
          }];
          
          return {
            ...refeicao,
            alimentos: novosAlimentos,
            totalCalorias: novosAlimentos.reduce((total, a) => total + a.calorias, 0)
          };
        }
        return refeicao;
      });
      
      setRefeicoesHoje(novasRefeicoes);
    } else {
      const novaRefeicao = {
        id: Math.random(),
        tipo: refeicaoSelecionada,
        horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        alimentos: [{ 
          id: Math.random(), 
          nome: alimento.nome, 
          quantidade: '1 porção', 
          calorias: alimento.calorias 
        }],
        totalCalorias: alimento.calorias
      };
      
      setRefeicoesHoje([...refeicoesHoje, novaRefeicao]);
    }
    
    fecharModal();
  };

  const removerAlimento = (refeicaoId, alimentoId) => {
    // Simulação de chamada à API para remover alimento
    // const removerAlimentoApi = async (refeicaoId, alimentoId) => {
    //   try {
    //     const response = await fetch('/api/refeicoes/remover', {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         refeicaoId,
    //         alimentoId
    //       }),
    //     });
    //
    //     if (response.ok) {
    //       buscarRefeicoesDoDia(dataAtual);
    //     } else {
    //       throw new Error('Falha ao remover alimento');
    //     }
    //   } catch (error) {
    //     console.error('Erro ao remover alimento:', error);
    //   }
    // };
    //
    // removerAlimentoApi(refeicaoId, alimentoId);

    // Simulação da atualização da lista
    const novasRefeicoes = refeicoesHoje.map(refeicao => {
      if (refeicao.id === refeicaoId) {
        const novosAlimentos = refeicao.alimentos.filter(a => a.id !== alimentoId);
        return {
          ...refeicao,
          alimentos: novosAlimentos,
          totalCalorias: novosAlimentos.reduce((total, a) => total + a.calorias, 0)
        };
      }
      return refeicao;
    });
    
    // Remove refeições vazias
    const refeicoesComAlimentos = novasRefeicoes.filter(r => r.alimentos.length > 0);
    setRefeicoesHoje(refeicoesComAlimentos);
  };

  const alimentosFiltrados = alimentosDisponiveis.filter(alimento => 
    alimento.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  // Formatação da data para exibição
  const formatarData = (data) => {
    return data.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  // Mudar para o dia anterior
  const irParaDiaAnterior = () => {
    const novaData = new Date(dataAtual);
    novaData.setDate(novaData.getDate() - 1);
    setDataAtual(novaData);
  };

  // Mudar para o próximo dia
  const irParaProximoDia = () => {
    const novaData = new Date(dataAtual);
    novaData.setDate(novaData.getDate() + 1);
    setDataAtual(novaData);
  };

  return (
    <div className="pt-20 pb-20 px-4">
      {/* Seletor de data */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={irParaDiaAnterior} className="p-2">
          <span className="text-2xl font-bold">←</span>
        </button>
        
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 text-green-600 mr-2" />
          <h1 className="text-lg font-semibold text-gray-800 capitalize">
            {formatarData(dataAtual)}
          </h1>
        </div>
        
        <button onClick={irParaProximoDia} className="p-2">
          <span className="text-2xl font-bold">→</span>
        </button>
      </div>

      {/* Resumo de calorias do dia */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-sm font-medium text-gray-600 mb-2">Total de calorias</h2>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold">
            {refeicoesHoje.reduce((total, refeicao) => total + refeicao.totalCalorias, 0)}
          </span>
          <span className="text-gray-500">/ 2000 kcal</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div 
            className="bg-green-500 h-2.5 rounded-full" 
            style={{ width: `${Math.min(refeicoesHoje.reduce((total, refeicao) => total + refeicao.totalCalorias, 0) / 2000 * 100, 100)}%` }}
          ></div>
        </div>
      </motion.div>

      {/* Lista de refeições */}
      <div className="space-y-5 mb-20">
        {/* Refeições padrão */}
        {['Café da Manhã', 'Lanche da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar', 'Ceia'].map((tipo, index) => {
          const refeicao = refeicoesHoje.find(r => r.tipo === tipo);
          
          return (
            <motion.div 
              key={tipo}
              className="bg-white rounded-xl shadow-sm p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2 className="font-semibold text-gray-800">{tipo}</h2>
                  {refeicao && <p className="text-xs text-gray-500">{refeicao.horario}</p>}
                </div>
                
                <div className="flex items-center">
                  {refeicao && (
                    <span className="text-sm font-medium mr-2">
                      {refeicao.totalCalorias} kcal
                    </span>
                  )}
                  <button 
                    onClick={() => abrirModal(tipo)}
                    className="bg-green-100 text-green-600 p-1.5 rounded-full"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {refeicao ? (
                <ul className="space-y-2">
                  {refeicao.alimentos.map(alimento => (
                    <li key={alimento.id} className="flex justify-between items-center py-1 border-b border-gray-100">
                      <div>
                        <p className="text-sm">{alimento.nome}</p>
                        <p className="text-xs text-gray-500">{alimento.quantidade}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">{alimento.calorias} kcal</span>
                        <button 
                          onClick={() => removerAlimento(refeicao.id, alimento.id)}
                          className="text-red-500 p-1"
                        >
                          <Cross2Icon className="w-3 h-3" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Nenhum alimento registrado
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Modal para adicionar alimentos */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Adicionar ao {refeicaoSelecionada}</h2>
                <button onClick={fecharModal} className="text-gray-500">
                  <Cross2Icon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Buscar alimento..."
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1">
              <ul className="divide-y">
                {alimentosFiltrados.map(alimento => (
                  <li 
                    key={alimento.id} 
                    className="p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => adicionarAlimento(alimento)}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{alimento.nome}</span>
                      <span className="text-gray-500">{alimento.calorias} kcal</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span>P: {alimento.proteinas}g</span> • 
                      <span> C: {alimento.carboidratos}g</span> • 
                      <span> G: {alimento.gorduras}g</span>
                    </div>
                  </li>
                ))}
                
                {alimentosFiltrados.length === 0 && (
                  <li className="p-4 text-center text-gray-500">
                    Nenhum alimento encontrado
                  </li>
                )}
              </ul>
            </div>
            
            <div className="p-3 border-t">
              <button className="text-sm text-green-600 font-medium flex items-center justify-center w-full">
                <PlusIcon className="mr-1" /> Cadastrar novo alimento
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 