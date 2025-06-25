'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, Cross2Icon, Pencil1Icon, TrashIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Search } from 'lucide-react';

export default function EasyDiet() {
  const [modalAberto, setModalAberto] = useState(false);
  const [dietaEmEdicao, setDietaEmEdicao] = useState(null);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [dietaParaExcluir, setDietaParaExcluir] = useState(null);
  const [modoDieta, setModoDieta] = useState('lista'); // 'lista', 'detalhes'
  const [dietaSelecionada, setDietaSelecionada] = useState(null);

  // Form state
  const [formDieta, setFormDieta] = useState({
    nome: '',
    descricao: '',
    objetivo: '',
    restricoes: [],
    duracaoSemanas: 4,
    calorias: 1800,
    refeicoes: [
      { id: 1, tipo: 'Café da manhã', alimentos: [] },
      { id: 2, tipo: 'Lanche da manhã', alimentos: [] },
      { id: 3, tipo: 'Almoço', alimentos: [] },
      { id: 4, tipo: 'Lanche da tarde', alimentos: [] },
      { id: 5, tipo: 'Jantar', alimentos: [] },
    ],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('g');

  const handleSearchFood = async () => {
    if (!searchTerm.trim()) return;
    try {
      const res = await fetch(`/api/food/search?nome=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      setSearchResults(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error('Erro ao buscar alimento:', err);
    }
  };

  const addFoodToMeal = (mealId) => {
    if (!selectedFood) return;

    const updatedRefeicoes = formDieta.refeicoes.map((refeicao) => {
      if (refeicao.id === mealId) {
        return {
          ...refeicao,
          alimentos: [
            ...refeicao.alimentos,
            {
              id: Date.now(),
              nome: selectedFood.name,
              quantidade: '',
              unidade: 'g',
            },
          ],
        };
      }
      return refeicao;
    });

    setFormDieta({ ...formDieta, refeicoes: updatedRefeicoes });
    setSelectedFood(null);
    setSearchResults([]);
  };

  const handleQuantityChange = (mealId, index, value) => {
    const updatedRefeicoes = formDieta.refeicoes.map((refeicao) => {
      if (refeicao.id === mealId) {
        const updatedAlimentos = refeicao.alimentos.map((alimento, i) => {
          if (i === index) {
            return { ...alimento, quantidade: value };
          }
          return alimento;
        });
        return { ...refeicao, alimentos: updatedAlimentos };
      }
      return refeicao;
    });
    setFormDieta({ ...formDieta, refeicoes: updatedRefeicoes });
  };

  const handleUnitChange = (mealId, index, value) => {
    const updatedRefeicoes = formDieta.refeicoes.map((refeicao) => {
      if (refeicao.id === mealId) {
        const updatedAlimentos = refeicao.alimentos.map((alimento, i) => {
          if (i === index) {
            return { ...alimento, unidade: value };
          }
          return alimento;
        });
        return { ...refeicao, alimentos: updatedAlimentos };
      }
      return refeicao;
    });
    setFormDieta({ ...formDieta, refeicoes: updatedRefeicoes });
  };

  // Dados de exemplo para dietas
  const [dietas, setDietas] = useState([
    {
      id: 1,
      nome: 'Dieta Low Carb',
      descricao: 'Dieta com baixo teor de carboidratos para perda de peso',
      objetivo: 'Perda de peso',
      restricoes: ['Açúcar', 'Farinhas refinadas'],
      duracaoSemanas: 8,
      calorias: 1600,
      progresso: 35,
      ativa: true,
      dataCriacao: '2023-10-15',
      refeicoes: [
        { id: 1, tipo: 'Café da manhã', alimentos: ['Ovos mexidos', 'Abacate', 'Chá verde'] },
        { id: 2, tipo: 'Lanche da manhã', alimentos: ['Castanhas'] },
        { id: 3, tipo: 'Almoço', alimentos: ['Frango grelhado', 'Salada verde', 'Brócolis'] },
        { id: 4, tipo: 'Lanche da tarde', alimentos: ['Iogurte natural', 'Framboesas'] },
        { id: 5, tipo: 'Jantar', alimentos: ['Peixe assado', 'Legumes cozidos'] }
      ]
    },
    {
      id: 2,
      nome: 'Dieta Mediterrânea',
      descricao: 'Baseada em alimentos consumidos nos países mediterrâneos',
      objetivo: 'Saúde cardiovascular',
      restricoes: [],
      duracaoSemanas: 12,
      calorias: 2000,
      progresso: 10,
      ativa: false,
      dataCriacao: '2023-11-05',
      refeicoes: [
        { id: 1, tipo: 'Café da manhã', alimentos: ['Iogurte grego', 'Mel', 'Frutas frescas'] },
        { id: 2, tipo: 'Lanche da manhã', alimentos: ['Azeitonas', 'Pão integral'] },
        { id: 3, tipo: 'Almoço', alimentos: ['Salada de grão-de-bico', 'Azeite de oliva', 'Peixe'] },
        { id: 4, tipo: 'Lanche da tarde', alimentos: ['Nozes', 'Uvas'] },
        { id: 5, tipo: 'Jantar', alimentos: ['Vegetais grelhados', 'Massa integral', 'Vinho tinto'] }
      ]
    }
  ]);

  // Abrir modal para criar/editar dieta
  const abrirModalDieta = (dieta = null) => {
    if (dieta) {
      setDietaEmEdicao(dieta);
      setFormDieta({
        nome: dieta.nome,
        descricao: dieta.descricao,
        objetivo: dieta.objetivo,
        restricoes: [...dieta.restricoes],
        duracaoSemanas: dieta.duracaoSemanas,
        calorias: dieta.calorias,
        refeicoes: dieta.refeicoes
      });
    } else {
      setDietaEmEdicao(null);
      setFormDieta({
        nome: '',
        descricao: '',
        objetivo: '',
        restricoes: [],
        duracaoSemanas: 4,
        calorias: 1800,
        refeicoes: [
          { id: 1, tipo: 'Café da manhã', alimentos: [] },
          { id: 2, tipo: 'Lanche da manhã', alimentos: [] },
          { id: 3, tipo: 'Almoço', alimentos: [] },
          { id: 4, tipo: 'Lanche da tarde', alimentos: [] },
          { id: 5, tipo: 'Jantar', alimentos: [] }
        ]
      });
    }
    
    setModalAberto(true);
  };

  // Fechar modal
  const fecharModal = () => {
    setModalAberto(false);
    setDietaEmEdicao(null);
  };

  // Atualizar formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDieta({
      ...formDieta,
      [name]: value
    });
  };

  // Alternar restrições alimentares
  const toggleRestricao = (restricao) => {
    if (formDieta.restricoes.includes(restricao)) {
      setFormDieta({
        ...formDieta,
        restricoes: formDieta.restricoes.filter(r => r !== restricao)
      });
    } else {
      setFormDieta({
        ...formDieta,
        restricoes: [...formDieta.restricoes, restricao]
      });
    }
  };

  // Salvar nova dieta ou editar existente
  const salvarDieta = () => {
    // const salvarDietaApi = async () => {
    //   try {
    //     const method = dietaEmEdicao ? 'PUT' : 'POST';
    //     const url = dietaEmEdicao ? `/api/dietas/${dietaEmEdicao.id}` : '/api/user/diet';
        
    //     const response = await fetch(url, {
    //       method,
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(formDieta),
    //     });
        
    //     if (response.ok) {
    //       const resultado = await response.json();
          
    //       if (dietaEmEdicao) {
    //         setDietas(dietas.map(d => d.id === dietaEmEdicao.id ? resultado : d));
    //       } else {
    //         setDietas([...dietas, resultado]);
    //       }
          
    //       fecharModal();
    //     } else {
    //       throw new Error('Falha ao salvar dieta');
    //     }
    //   } catch (error) {
    //     console.error('Erro ao salvar dieta:', error);
    //   }
    // };
    
    // salvarDietaApi();
    
    // Simulação
    if (dietaEmEdicao) {
      // Editar dieta existente
      setDietas(dietas.map(d => {
        if (d.id === dietaEmEdicao.id) {
          return {
            ...d,
            ...formDieta
          };
        }
        return d;
      }));
    } else {
      // Criar nova dieta
      const novaDieta = {
        id: Date.now(),
        ...formDieta,
        progresso: 0,
        ativa: false,
        dataCriacao: new Date().toISOString().split('T')[0],
        refeicoes: [
          { id: 1, tipo: 'Café da manhã', alimentos: [] },
          { id: 2, tipo: 'Lanche da manhã', alimentos: [] },
          { id: 3, tipo: 'Almoço', alimentos: [] },
          { id: 4, tipo: 'Lanche da tarde', alimentos: [] },
          { id: 5, tipo: 'Jantar', alimentos: [] }
        ]
      };
      
      setDietas([...dietas, novaDieta]);
    }
    
    fecharModal();
  };

  // Confirmar exclusão de dieta
  const confirmarExclusao = (dieta) => {
    setDietaParaExcluir(dieta);
    setModalConfirmacao(true);
  };

  // Excluir dieta
  const excluirDieta = () => {
    // Simular chamada à API para excluir dieta
    // const excluirDietaApi = async () => {
    //   try {
    //     const response = await fetch(`/api/dietas/${dietaParaExcluir.id}`, {
    //       method: 'DELETE',
    //     });
    //     
    //     if (response.ok) {
    //       setDietas(dietas.filter(d => d.id !== dietaParaExcluir.id));
    //       setModalConfirmacao(false);
    //       setDietaParaExcluir(null);
    //     } else {
    //       throw new Error('Falha ao excluir dieta');
    //     }
    //   } catch (error) {
    //     console.error('Erro ao excluir dieta:', error);
    //   }
    // };
    //
    // excluirDietaApi();
    
    // Simulação
    setDietas(dietas.filter(d => d.id !== dietaParaExcluir.id));
    setModalConfirmacao(false);
    setDietaParaExcluir(null);
  };

  // Alternar o status ativo da dieta
  const alternarStatusDieta = (dieta) => {
    // Simular chamada à API para atualizar status
    // const atualizarStatusApi = async (dieta) => {
    //   try {
    //     const response = await fetch(`/api/dietas/${dieta.id}/status`, {
    //       method: 'PATCH',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ ativa: !dieta.ativa }),
    //     });
    //     
    //     if (response.ok) {
    //       setDietas(dietas.map(d => {
    //         if (d.id === dieta.id) {
    //           return { ...d, ativa: !d.ativa };
    //         }
    //         return d;
    //       }));
    //     }
    //   } catch (error) {
    //     console.error('Erro ao atualizar status da dieta:', error);
    //   }
    // };
    //
    // atualizarStatusApi(dieta);
    
    // Simulação
    setDietas(dietas.map(d => {
      if (d.id === dieta.id) {
        return { ...d, ativa: !d.ativa };
      }
      return d;
    }));
  };

  // Abrir detalhes da dieta
  const abrirDetalhesDieta = (dieta) => {
    setDietaSelecionada(dieta);
    setModoDieta('detalhes');
  };

  // Voltar para lista de dietas
  const voltarParaLista = () => {
    setModoDieta('lista');
    setDietaSelecionada(null);
  };

  // Formatar data
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div className="pt-20 pb-20 px-4">
      {modoDieta === 'lista' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Minhas Dietas</h1>
            <button 
              onClick={() => abrirModalDieta()}
              className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* Lista de dietas */}
          <div className="space-y-4 mb-20">
            {dietas.map((dieta) => (
              <motion.div 
                key={dieta.id}
                className="bg-white rounded-xl shadow-sm p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-gray-800">{dieta.nome}</h2>
                    <p className="text-sm text-gray-500 mt-1">{dieta.descricao}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => abrirModalDieta(dieta)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <Pencil1Icon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => confirmarExclusao(dieta)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Progresso</span>
                    <span className="text-sm font-medium">{dieta.progresso}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full" 
                      style={{ width: `${dieta.progresso}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${dieta.ativa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {dieta.ativa ? 'Ativa' : 'Inativa'}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      Criada em {formatarData(dieta.dataCriacao)}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => alternarStatusDieta(dieta)}
                      className={`text-xs py-1 px-2 rounded ${dieta.ativa ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                    >
                      {dieta.ativa ? 'Desativar' : 'Ativar'}
                    </button>
                    <button 
                      onClick={() => abrirDetalhesDieta(dieta)}
                      className="text-xs py-1 px-2 bg-blue-100 text-blue-800 rounded flex items-center"
                    >
                      Detalhes <ChevronRightIcon className="ml-1 w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {dietas.length === 0 && (
              <div className="text-center py-8 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500">Você ainda não possui dietas cadastradas</p>
                <button 
                  onClick={() => abrirModalDieta()}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
                >
                  Criar minha primeira dieta
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Detalhes da dieta */}
          <div className="mb-6">
            <button 
              onClick={voltarParaLista}
              className="text-gray-600 flex items-center mb-4"
            >
              ← Voltar para lista
            </button>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{dietaSelecionada.nome}</h1>
            <p className="text-gray-500">{dietaSelecionada.descricao}</p>
          </div>
          
          {/* Informações gerais */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-4 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-semibold text-gray-700 mb-3">Informações Gerais</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Objetivo</p>
                <p className="font-medium">{dietaSelecionada.objetivo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Calorias diárias</p>
                <p className="font-medium">{dietaSelecionada.calorias} kcal</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Duração</p>
                <p className="font-medium">{dietaSelecionada.duracaoSemanas} semanas</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className={`font-medium ${dietaSelecionada.ativa ? 'text-green-600' : 'text-gray-600'}`}>
                  {dietaSelecionada.ativa ? 'Ativa' : 'Inativa'}
                </p>
              </div>
            </div>
            
            {dietaSelecionada.restricoes.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Restrições alimentares</p>
                <div className="flex flex-wrap gap-2">
                  {dietaSelecionada.restricoes.map((restricao, index) => (
                    <span 
                      key={index} 
                      className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"
                    >
                      {restricao}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Plano de refeições */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="font-semibold text-gray-700 mb-4">Plano de Refeições</h2>
            
            <div className="space-y-4">
              {dietaSelecionada.refeicoes.map((refeicao) => (
                <div key={refeicao.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-medium text-gray-800 mb-2">{refeicao.tipo}</h3>
                  
                  {refeicao.alimentos.length > 0 ? (
                    <ul className="ml-4">
                      {refeicao.alimentos.map((alimento, index) => (
                        <li key={index} className="text-sm text-gray-600 mb-1 list-disc list-inside">
                          {alimento}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Nenhum alimento definido</p>
                  )}
                  
                  <button className="text-xs text-green-600 mt-2 flex items-center">
                    <PlusIcon className="mr-1" /> Adicionar alimentos
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* Modal para criar/editar dieta */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {dietaEmEdicao ? 'Editar Dieta' : 'Nova Dieta'}
              </h2>
              <button onClick={fecharModal} className="text-gray-500">
                <Cross2Icon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da dieta
                  </label>
                  <input 
                    type="text" 
                    name="nome" 
                    value={formDieta.nome} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Ex: Dieta Low Carb"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea 
                    name="descricao" 
                    value={formDieta.descricao} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    rows="2"
                    placeholder="Descreva brevemente o objetivo ou características desta dieta"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objetivo principal
                  </label>
                  <select 
                    name="objetivo" 
                    value={formDieta.objetivo} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Perda de peso">Perda de peso</option>
                    <option value="Ganho de massa muscular">Ganho de massa muscular</option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Saúde geral">Saúde geral</option>
                    <option value="Saúde cardiovascular">Saúde cardiovascular</option>
                    <option value="Desempenho esportivo">Desempenho esportivo</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calorias diárias
                  </label>
                  <input 
                    type="number" 
                    name="calorias" 
                    value={formDieta.calorias} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    min="1000"
                    max="5000"
                    step="50"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duração (semanas)
                  </label>
                  <input 
                    type="number" 
                    name="duracaoSemanas" 
                    value={formDieta.duracaoSemanas} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    min="1"
                    max="52"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Restrições alimentares
                  </label>
                  <div className="space-y-2">
                    {['Glúten', 'Lactose', 'Açúcar', 'Farinhas refinadas', 'Frutos do mar', 'Oleaginosas'].map((restricao) => (
                      <div key={restricao} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`restricao-${restricao}`} 
                          checked={formDieta.restricoes.includes(restricao)}
                          onChange={() => toggleRestricao(restricao)}
                          className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500" 
                        />
                        <label htmlFor={`restricao-${restricao}`} className="ml-2 text-sm text-gray-700">
                          {restricao}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Buscar alimento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                  <button
                    onClick={handleSearchFood}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl transition"
                  >
                    <Search size={16} />
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <ul className="border rounded-xl p-2 max-h-32 overflow-y-auto bg-gray-50 shadow-inner">
                    {searchResults.map((food) => (
                      <li
                        key={food._id}
                        className="cursor-pointer hover:bg-green-100 p-1 rounded transition"
                        onClick={() => setSelectedFood(food)}
                      >
                        {food.name}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Refeições */}
                {formDieta.refeicoes.map((refeicao) => (
                  <div key={refeicao.id} className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">{refeicao.tipo}</h3>

                    {refeicao.alimentos.map((alimento, index) => (
                      <div key={index} className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-semibold text-gray-800">
                          {alimento.nome}
                        </span>
                        <input
                          type="number"
                          placeholder="Qtd"
                          className="w-20 border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={alimento.quantidade}
                          onChange={(e) => handleQuantityChange(refeicao.id, index, e.target.value)}
                        />
                        <select
                          className="border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={alimento.unidade}
                          onChange={(e) => handleUnitChange(refeicao.id, index, e.target.value)}
                        >
                          <option value="g">g</option>
                          <option value="ml">ml</option>
                          <option value="un">un</option>
                        </select>
                      </div>
                    ))}

                    {selectedFood && (
                      <button
                        onClick={() => addFoodToMeal(refeicao.id)}
                        className="text-green-600 hover:text-green-800 transition mt-2"
                      >
                        Adicionar {selectedFood.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t flex justify-end space-x-2">
              <button 
                onClick={fecharModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
              >
                Cancelar
              </button>
              <button 
                onClick={salvarDieta}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                disabled={!formDieta.nome || !formDieta.objetivo}
              >
                {dietaEmEdicao ? 'Atualizar' : 'Criar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de confirmação para exclusão */}
      {modalConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold text-center mb-2">Confirmar exclusão</h2>
              <p className="text-gray-600 text-center mb-4">
                Tem certeza que deseja excluir a dieta "{dietaParaExcluir.nome}"? Esta ação não pode ser desfeita.
              </p>
              
              <div className="flex justify-center space-x-2">
                <button 
                  onClick={() => setModalConfirmacao(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
                >
                  Cancelar
                </button>
                <button 
                  onClick={excluirDieta}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Excluir
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}