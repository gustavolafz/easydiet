'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon, PlusIcon, Cross2Icon } from '@radix-ui/react-icons';

export default function Calendar() {
  const [mesAtual, setMesAtual] = useState(new Date());
  const [diasDoMes, setDiasDoMes] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalPlanejamento, setModalPlanejamento] = useState(false);
  const [refeicoesDoDia, setRefeicoesDoDia] = useState([]);
  const [tipoRefeicao, setTipoRefeicao] = useState('');
  const [descricaoRefeicao, setDescricaoRefeicao] = useState('');

  // Dados de exemplo para marcar dias com refeições planejadas
  const [diasComRefeicoes, setDiasComRefeicoes] = useState([
    { dia: 5, mes: new Date().getMonth(), ano: new Date().getFullYear(), totalRefeicoes: 3 },
    { dia: 12, mes: new Date().getMonth(), ano: new Date().getFullYear(), totalRefeicoes: 1 },
    { dia: 15, mes: new Date().getMonth(), ano: new Date().getFullYear(), totalRefeicoes: 2 },
    { dia: 20, mes: new Date().getMonth(), ano: new Date().getFullYear(), totalRefeicoes: 4 },
  ]);

  useEffect(() => {
    gerarDiasDoMes(mesAtual);
  }, [mesAtual]);

  // Gerar array com todos os dias do mês
  const gerarDiasDoMes = (data) => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    
    // Primeiro dia do mês
    const primeiroDia = new Date(ano, mes, 1);
    // Último dia do mês
    const ultimoDia = new Date(ano, mes + 1, 0);
    
    // Dia da semana em que começa o mês (0 = Domingo, 1 = Segunda, ...)
    const diaDaSemanaInicio = primeiroDia.getDay();
    // Total de dias no mês
    const totalDias = ultimoDia.getDate();
    
    // Array para armazenar os dias
    const dias = [];
    
    // Adicionar dias vazios antes do primeiro dia do mês (para alinhar com os dias da semana)
    for (let i = 0; i < diaDaSemanaInicio; i++) {
      dias.push({ dia: null, mes, ano });
    }
    
    // Adicionar todos os dias do mês
    for (let dia = 1; dia <= totalDias; dia++) {
      dias.push({ dia, mes, ano });
    }
    
    setDiasDoMes(dias);
  };

  // Verificar se um dia tem refeições planejadas
  const verificarRefeicoesPlanejadas = (dia, mes, ano) => {
    return diasComRefeicoes.find(d => 
      d.dia === dia && d.mes === mes && d.ano === ano
    );
  };

  // Avançar para o próximo mês
  const avancarMes = () => {
    const novaData = new Date(mesAtual);
    novaData.setMonth(novaData.getMonth() + 1);
    setMesAtual(novaData);
  };

  // Voltar para o mês anterior
  const voltarMes = () => {
    const novaData = new Date(mesAtual);
    novaData.setMonth(novaData.getMonth() - 1);
    setMesAtual(novaData);
  };

  // Abrir modal de visualização de refeições do dia
  const abrirModalDia = (dia, mes, ano) => {
    if (!dia) return; // Não abrir para dias vazios
    
    setDiaSelecionado({ dia, mes, ano });
    setModalAberto(true);
    
    // Simular busca de refeições do dia
    // Na implementação real, aqui seria feita uma chamada à API
    // fetchRefeicoesDia(dia, mes, ano);
    
    // Dados de exemplo
    const refeicoes = [
      { id: 1, tipo: 'Café da Manhã', descricao: 'Ovos mexidos, torrada integral, café' },
      { id: 2, tipo: 'Almoço', descricao: 'Frango grelhado, arroz integral, salada' },
      { id: 3, tipo: 'Jantar', descricao: 'Sopa de legumes, pão integral' }
    ];
    
    setRefeicoesDoDia(refeicoes);
  };

  // Abrir modal para adicionar uma nova refeição planejada
  const abrirModalPlanejamento = () => {
    setModalPlanejamento(true);
    setModalAberto(false);
  };

  // Adicionar nova refeição planejada
  const adicionarRefeicao = () => {
    if (!tipoRefeicao || !descricaoRefeicao) return;
    
    // Simulação de chamada à API para adicionar refeição
    // const adicionarRefeicaoApi = async () => {
    //   try {
    //     const response = await fetch('/api/refeicoes/planejar', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         dia: diaSelecionado.dia,
    //         mes: diaSelecionado.mes,
    //         ano: diaSelecionado.ano,
    //         tipo: tipoRefeicao,
    //         descricao: descricaoRefeicao
    //       })
    //     });
    //     
    //     if (response.ok) {
    //       const novaRefeicao = await response.json();
    //       setRefeicoesDoDia([...refeicoesDoDia, novaRefeicao]);
    //       atualizarDiasComRefeicoes();
    //     }
    //   } catch (error) {
    //     console.error('Erro ao adicionar refeição:', error);
    //   }
    // };
    //
    // adicionarRefeicaoApi();
    
    // Simulação
    const novaRefeicao = {
      id: Date.now(),
      tipo: tipoRefeicao,
      descricao: descricaoRefeicao
    };
    
    setRefeicoesDoDia([...refeicoesDoDia, novaRefeicao]);
    
    // Atualizar dias com refeições
    const diaExistente = diasComRefeicoes.find(
      d => d.dia === diaSelecionado.dia && d.mes === diaSelecionado.mes && d.ano === diaSelecionado.ano
    );
    
    if (diaExistente) {
      setDiasComRefeicoes(diasComRefeicoes.map(d => 
        d.dia === diaSelecionado.dia && d.mes === diaSelecionado.mes && d.ano === diaSelecionado.ano
          ? { ...d, totalRefeicoes: d.totalRefeicoes + 1 }
          : d
      ));
    } else {
      setDiasComRefeicoes([
        ...diasComRefeicoes,
        { ...diaSelecionado, totalRefeicoes: 1 }
      ]);
    }
    
    // Fechar modal e limpar campos
    setModalPlanejamento(false);
    setModalAberto(true);
    setTipoRefeicao('');
    setDescricaoRefeicao('');
  };

  // Remover refeição planejada
  const removerRefeicao = (id) => {
    // Simulação de chamada à API para remover refeição
    // const removerRefeicaoApi = async (id) => {
    //   try {
    //     const response = await fetch(`/api/refeicoes/planejar/${id}`, {
    //       method: 'DELETE'
    //     });
    //     
    //     if (response.ok) {
    //       setRefeicoesDoDia(refeicoesDoDia.filter(refeicao => refeicao.id !== id));
    //       atualizarDiasComRefeicoes();
    //     }
    //   } catch (error) {
    //     console.error('Erro ao remover refeição:', error);
    //   }
    // };
    //
    // removerRefeicaoApi(id);
    
    // Simulação
    const novasRefeicoes = refeicoesDoDia.filter(refeicao => refeicao.id !== id);
    setRefeicoesDoDia(novasRefeicoes);
    
    // Atualizar dias com refeições
    if (novasRefeicoes.length === 0) {
      setDiasComRefeicoes(diasComRefeicoes.filter(
        d => !(d.dia === diaSelecionado.dia && d.mes === diaSelecionado.mes && d.ano === diaSelecionado.ano)
      ));
    } else {
      setDiasComRefeicoes(diasComRefeicoes.map(d => 
        d.dia === diaSelecionado.dia && d.mes === diaSelecionado.mes && d.ano === diaSelecionado.ano
          ? { ...d, totalRefeicoes: novasRefeicoes.length }
          : d
      ));
    }
  };

  // Formatar data para exibição
  const formatarData = (dia, mes, ano) => {
    const data = new Date(ano, mes, dia);
    return data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Formatar nome do mês
  const formatarMes = (data) => {
    return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  // Verificar se o dia é hoje
  const ehHoje = (dia, mes, ano) => {
    const hoje = new Date();
    return dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();
  };

  return (
    <div className="pt-20 pb-20 px-4">
      {/* Cabeçalho do calendário */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={voltarMes} className="p-2 text-gray-700">
          <CaretLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 capitalize">{formatarMes(mesAtual)}</h1>
        <button onClick={avancarMes} className="p-2 text-gray-700">
          <CaretRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((diaSemana, index) => (
          <div key={index} className="text-sm font-medium text-gray-500 py-1">
            {diaSemana}
          </div>
        ))}
      </div>

      {/* Calendário */}
      <motion.div 
        className="grid grid-cols-7 gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {diasDoMes.map((data, index) => {
          const { dia, mes, ano } = data;
          const refeicoesPlanejadas = dia ? verificarRefeicoesPlanejadas(dia, mes, ano) : null;
          const hoje = dia ? ehHoje(dia, mes, ano) : false;
          
          return (
            <motion.div
              key={index}
              className={`
                aspect-square relative flex flex-col items-center justify-center rounded-lg cursor-pointer
                ${!dia ? 'bg-transparent' : hoje ? 'bg-green-100 border border-green-500' : 'bg-white shadow-sm'}
                ${refeicoesPlanejadas ? 'ring-1 ring-green-400' : ''}
              `}
              whileHover={dia ? { scale: 1.05 } : {}}
              onClick={() => dia && abrirModalDia(dia, mes, ano)}
            >
              {dia && (
                <>
                  <span className={`text-lg ${hoje ? 'font-bold text-green-600' : 'text-gray-700'}`}>
                    {dia}
                  </span>
                  
                  {refeicoesPlanejadas && (
                    <div className="absolute bottom-1 w-full flex justify-center">
                      <div className="flex space-x-1">
                        {Array.from({ length: Math.min(refeicoesPlanejadas.totalRefeicoes, 3) }).map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        ))}
                        {refeicoesPlanejadas.totalRefeicoes > 3 && (
                          <span className="text-xs text-green-600">+{refeicoesPlanejadas.totalRefeicoes - 3}</span>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Modal de visualização de refeições do dia */}
      {modalAberto && diaSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {formatarData(diaSelecionado.dia, diaSelecionado.mes, diaSelecionado.ano)}
              </h2>
              <button onClick={() => setModalAberto(false)} className="text-gray-500">
                <Cross2Icon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="text-md font-medium mb-4">Refeições Planejadas</h3>
              
              {refeicoesDoDia.length > 0 ? (
                <ul className="space-y-3 mb-4">
                  {refeicoesDoDia.map((refeicao) => (
                    <li key={refeicao.id} className="bg-gray-50 rounded-lg p-3 relative">
                      <h4 className="font-medium text-green-700">{refeicao.tipo}</h4>
                      <p className="text-sm text-gray-600 mt-1">{refeicao.descricao}</p>
                      <button 
                        onClick={() => removerRefeicao(refeicao.id)}
                        className="absolute top-2 right-2 text-red-500"
                      >
                        <Cross2Icon className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center italic py-4">
                  Nenhuma refeição planejada para este dia
                </p>
              )}
              
              <button 
                onClick={abrirModalPlanejamento}
                className="w-full py-2 bg-green-500 text-white rounded-lg flex items-center justify-center"
              >
                <PlusIcon className="mr-1" /> Adicionar Refeição
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal para adicionar nova refeição */}
      {modalPlanejamento && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Adicionar Refeição</h2>
              <button onClick={() => {
                setModalPlanejamento(false);
                setModalAberto(true);
              }} className="text-gray-500">
                <Cross2Icon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Refeição
                </label>
                <select 
                  value={tipoRefeicao}
                  onChange={(e) => setTipoRefeicao(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Café da Manhã">Café da Manhã</option>
                  <option value="Lanche da Manhã">Lanche da Manhã</option>
                  <option value="Almoço">Almoço</option>
                  <option value="Lanche da Tarde">Lanche da Tarde</option>
                  <option value="Jantar">Jantar</option>
                  <option value="Ceia">Ceia</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea 
                  value={descricaoRefeicao}
                  onChange={(e) => setDescricaoRefeicao(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                  placeholder="Descreva os alimentos que serão consumidos..."
                  required
                ></textarea>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setModalPlanejamento(false);
                    setModalAberto(true);
                  }}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg"
                >
                  Cancelar
                </button>
                <button 
                  onClick={adicionarRefeicao}
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg"
                  disabled={!tipoRefeicao || !descricaoRefeicao}
                >
                  Salvar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 