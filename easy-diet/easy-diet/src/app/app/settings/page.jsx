'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@radix-ui/react-switch';
import { CheckIcon, Cross2Icon, ExclamationTriangleIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export default function Settings() {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [lembreteRefeicoes, setLembreteRefeicoes] = useState(true);
  const [lembreteAgua, setLembreteAgua] = useState(true);
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [idiomaAtual, setIdiomaAtual] = useState('Português');
  const [unidadeMedida, setUnidadeMedida] = useState('Métrico');
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTipo, setModalTipo] = useState(''); // 'idioma', 'unidade'
  
  // Funções para lidar com alterações de configurações
  const toggleNotificacoes = () => {
    setNotificacoesAtivas(!notificacoesAtivas);
    salvarConfiguracao('notificacoes', !notificacoesAtivas);
  };
  
  const toggleLembreteRefeicoes = () => {
    setLembreteRefeicoes(!lembreteRefeicoes);
    salvarConfiguracao('lembreteRefeicoes', !lembreteRefeicoes);
  };
  
  const toggleLembreteAgua = () => {
    setLembreteAgua(!lembreteAgua);
    salvarConfiguracao('lembreteAgua', !lembreteAgua);
  };
  
  const toggleTemaEscuro = () => {
    setTemaEscuro(!temaEscuro);
    salvarConfiguracao('temaEscuro', !temaEscuro);
  };
  
  const abrirModalIdioma = () => {
    setModalTipo('idioma');
    setModalAberto(true);
  };
  
  const abrirModalUnidade = () => {
    setModalTipo('unidade');
    setModalAberto(true);
  };
  
  const fecharModal = () => {
    setModalAberto(false);
    setModalTipo('');
  };
  
  const alterarIdioma = (idioma) => {
    setIdiomaAtual(idioma);
    salvarConfiguracao('idioma', idioma);
    fecharModal();
  };
  
  const alterarUnidade = (unidade) => {
    setUnidadeMedida(unidade);
    salvarConfiguracao('unidadeMedida', unidade);
    fecharModal();
  };
  
  // Simular o salvamento de configurações
  const salvarConfiguracao = (chave, valor) => {
    // Simular chamada à API para salvar configuração
    // const salvarConfiguracaoApi = async (chave, valor) => {
    //   try {
    //     const response = await fetch('/api/configuracoes', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         chave,
    //         valor
    //       }),
    //     });
    //     
    //     if (!response.ok) {
    //       throw new Error('Falha ao salvar configuração');
    //     }
    //   } catch (error) {
    //     console.error('Erro ao salvar configuração:', error);
    //   }
    // };
    //
    // salvarConfiguracaoApi(chave, valor);
    
    // Simulação de salvamento no localStorage
    localStorage.setItem(`config_${chave}`, JSON.stringify(valor));
  };
  
  // Simular o carregamento de configurações salvas
  useEffect(() => {
    // Simular carregamento inicial das configurações
    // const carregarConfiguracoes = async () => {
    //   try {
    //     const response = await fetch('/api/configuracoes');
    //     const dados = await response.json();
    //     
    //     if (dados) {
    //       setNotificacoesAtivas(dados.notificacoes ?? true);
    //       setLembreteRefeicoes(dados.lembreteRefeicoes ?? true);
    //       setLembreteAgua(dados.lembreteAgua ?? true);
    //       setTemaEscuro(dados.temaEscuro ?? false);
    //       setIdiomaAtual(dados.idioma ?? 'Português');
    //       setUnidadeMedida(dados.unidadeMedida ?? 'Métrico');
    //     }
    //   } catch (error) {
    //     console.error('Erro ao carregar configurações:', error);
    //   }
    // };
    //
    // carregarConfiguracoes();
    
    // Simulação com localStorage
    const notificacoes = JSON.parse(localStorage.getItem('config_notificacoes'));
    if (notificacoes !== null) setNotificacoesAtivas(notificacoes);
    
    const lembreteRef = JSON.parse(localStorage.getItem('config_lembreteRefeicoes'));
    if (lembreteRef !== null) setLembreteRefeicoes(lembreteRef);
    
    const lembreteAg = JSON.parse(localStorage.getItem('config_lembreteAgua'));
    if (lembreteAg !== null) setLembreteAgua(lembreteAg);
    
    const tema = JSON.parse(localStorage.getItem('config_temaEscuro'));
    if (tema !== null) setTemaEscuro(tema);
    
    const idioma = localStorage.getItem('config_idioma');
    if (idioma) setIdiomaAtual(JSON.parse(idioma));
    
    const unidade = localStorage.getItem('config_unidadeMedida');
    if (unidade) setUnidadeMedida(JSON.parse(unidade));
  }, []);
  
  // Limpar todos os dados do usuário
  const limparDados = () => {
    // Mostrar um diálogo de confirmação real antes de limpar
    if (confirm("Tem certeza que deseja limpar todos os seus dados? Esta ação não pode ser desfeita.")) {
      // Simular chamada à API para limpar dados
      // const limparDadosApi = async () => {
      //   try {
      //     const response = await fetch('/api/usuario/limpar-dados', {
      //       method: 'DELETE',
      //     });
      //     
      //     if (response.ok) {
      //       // Redirecionar para página de login ou mostrar mensagem de sucesso
      //     } else {
      //       throw new Error('Falha ao limpar dados');
      //     }
      //   } catch (error) {
      //     console.error('Erro ao limpar dados:', error);
      //   }
      // };
      //
      // limparDadosApi();
      
      // Simulação: limpar localStorage
      localStorage.clear();
      alert('Seus dados foram removidos com sucesso.');
    }
  };
  
  // Fazer logout
  const fazerLogout = () => {
    // Simular chamada à API para fazer logout
    // const logoutApi = async () => {
    //   try {
    //     const response = await fetch('/api/auth/logout', {
    //       method: 'POST',
    //     });
    //     
    //     if (response.ok) {
    //       // Redirecionar para página de login
    //       window.location.href = '/login';
    //     } else {
    //       throw new Error('Falha ao fazer logout');
    //     }
    //   } catch (error) {
    //     console.error('Erro ao fazer logout:', error);
    //   }
    // };
    //
    // logoutApi();
    
    // Simulação: redirecionar para página de login
    alert('Logout realizado com sucesso');
    // window.location.href = '/login';
  };

  return (
    <div className="pt-20 pb-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Configurações</h1>
      
      {/* Notificações */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-4 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-semibold text-gray-700 mb-4">Notificações</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Notificações ativas</h3>
              <p className="text-xs text-gray-500">Receba notificações do aplicativo</p>
            </div>
            <Switch 
              checked={notificacoesAtivas} 
              onCheckedChange={toggleNotificacoes}
              className={`${notificacoesAtivas ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex h-5 w-10 items-center rounded-full`}
            >
              <span className={`${notificacoesAtivas ? 'translate-x-5' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Lembrete de refeições</h3>
              <p className="text-xs text-gray-500">Lembretes para registrar suas refeições</p>
            </div>
            <Switch 
              checked={lembreteRefeicoes} 
              onCheckedChange={toggleLembreteRefeicoes}
              disabled={!notificacoesAtivas}
              className={`${lembreteRefeicoes && notificacoesAtivas ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex h-5 w-10 items-center rounded-full`}
            >
              <span className={`${lembreteRefeicoes ? 'translate-x-5' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Lembrete de água</h3>
              <p className="text-xs text-gray-500">Lembretes para beber água</p>
            </div>
            <Switch 
              checked={lembreteAgua} 
              onCheckedChange={toggleLembreteAgua}
              disabled={!notificacoesAtivas}
              className={`${lembreteAgua && notificacoesAtivas ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex h-5 w-10 items-center rounded-full`}
            >
              <span className={`${lembreteAgua ? 'translate-x-5' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>
          </div>
        </div>
      </motion.div>
      
      {/* Aparência */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-4 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="font-semibold text-gray-700 mb-4">Aparência</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Tema escuro</h3>
              <p className="text-xs text-gray-500">Usar tema escuro no aplicativo</p>
            </div>
            <Switch 
              checked={temaEscuro} 
              onCheckedChange={toggleTemaEscuro}
              className={`${temaEscuro ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex h-5 w-10 items-center rounded-full`}
            >
              <span className={`${temaEscuro ? 'translate-x-5' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>
          </div>
        </div>
      </motion.div>
      
      {/* Configurações regionais */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-4 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="font-semibold text-gray-700 mb-4">Configurações regionais</h2>
        
        <div className="space-y-4">
          <button 
            className="w-full flex items-center justify-between py-2"
            onClick={abrirModalIdioma}
          >
            <div>
              <h3 className="text-sm font-medium text-left">Idioma</h3>
              <p className="text-xs text-gray-500 text-left">{idiomaAtual}</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="border-t border-gray-100"></div>
          
          <button 
            className="w-full flex items-center justify-between py-2"
            onClick={abrirModalUnidade}
          >
            <div>
              <h3 className="text-sm font-medium text-left">Unidade de medida</h3>
              <p className="text-xs text-gray-500 text-left">{unidadeMedida}</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </motion.div>
      
      {/* Conta */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-4 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="font-semibold text-gray-700 mb-4">Conta</h2>
        
        <div className="space-y-4">
          <button 
            className="w-full flex items-center justify-between py-2"
            onClick={() => window.location.href = '/app/profile'}
          >
            <div>
              <h3 className="text-sm font-medium text-left">Editar perfil</h3>
              <p className="text-xs text-gray-500 text-left">Alterar suas informações pessoais</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="border-t border-gray-100"></div>
          
          <button 
            className="w-full flex items-center justify-between py-2"
            onClick={fazerLogout}
          >
            <div>
              <h3 className="text-sm font-medium text-left text-blue-600">Sair da conta</h3>
              <p className="text-xs text-gray-500 text-left">Encerrar a sessão atual</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </motion.div>
      
      {/* Opções avançadas */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-4 mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="font-semibold text-gray-700 mb-4">Opções avançadas</h2>
        
        <div className="space-y-4">
          <button 
            className="w-full flex items-center justify-between py-2"
            onClick={limparDados}
          >
            <div className="flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 text-red-500 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-left text-red-600">Limpar todos os dados</h3>
                <p className="text-xs text-gray-500 text-left">Esta ação não pode ser desfeita</p>
              </div>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </motion.div>
      
      {/* Modal para seleção de idioma */}
      {modalAberto && modalTipo === 'idioma' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Selecionar idioma</h2>
              <button onClick={fecharModal} className="text-gray-500">
                <Cross2Icon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-2">
              {['Português', 'English', 'Español', 'Français', 'Deutsch'].map((idioma) => (
                <button
                  key={idioma}
                  className="w-full py-3 px-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg"
                  onClick={() => alterarIdioma(idioma)}
                >
                  <span>{idioma}</span>
                  {idiomaAtual === idioma && <CheckIcon className="w-4 h-4 text-green-500" />}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Modal para seleção de unidade de medida */}
      {modalAberto && modalTipo === 'unidade' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Unidade de medida</h2>
              <button onClick={fecharModal} className="text-gray-500">
                <Cross2Icon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-2">
              <button
                className="w-full py-3 px-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg"
                onClick={() => alterarUnidade('Métrico')}
              >
                <div>
                  <h3 className="font-medium">Métrico</h3>
                  <p className="text-xs text-gray-500">Quilogramas (kg), centímetros (cm)</p>
                </div>
                {unidadeMedida === 'Métrico' && <CheckIcon className="w-4 h-4 text-green-500" />}
              </button>
              
              <button
                className="w-full py-3 px-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg"
                onClick={() => alterarUnidade('Imperial')}
              >
                <div>
                  <h3 className="font-medium">Imperial</h3>
                  <p className="text-xs text-gray-500">Libras (lb), polegadas (in)</p>
                </div>
                {unidadeMedida === 'Imperial' && <CheckIcon className="w-4 h-4 text-green-500" />}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 