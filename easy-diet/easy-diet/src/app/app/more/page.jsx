'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon, HeartIcon, BarChartIcon, QuestionMarkCircledIcon, InfoCircledIcon, Share2Icon, EnvelopeClosedIcon, PersonIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function More() {
  const menuItems = [
    {
      id: 'profile',
      icon: <PersonIcon className="w-5 h-5 text-blue-500" />,
      title: 'Meu Perfil',
      description: 'Visualize e edite suas informações pessoais',
      link: '/app/profile'
    },
    {
      id: 'settings',
      icon: <MixerHorizontalIcon className="w-5 h-5 text-gray-500" />,
      title: 'Configurações',
      description: 'Ajuste as configurações do aplicativo',
      link: '/app/settings'
    },
    {
      id: 'reports',
      icon: <BarChartIcon className="w-5 h-5 text-green-500" />,
      title: 'Relatórios',
      description: 'Acompanhe seu progresso com relatórios detalhados',
      action: () => alert('Funcionalidade de relatórios em desenvolvimento')
    },
    {
      id: 'recipes',
      icon: <HeartIcon className="w-5 h-5 text-red-500" />,
      title: 'Receitas Saudáveis',
      description: 'Explore receitas que se encaixam em sua dieta',
      action: () => alert('Biblioteca de receitas em desenvolvimento')
    },
    {
      id: 'help',
      icon: <QuestionMarkCircledIcon className="w-5 h-5 text-amber-500" />,
      title: 'Ajuda',
      description: 'Perguntas frequentes e suporte',
      action: () => alert('Centro de ajuda em desenvolvimento')
    },
    {
      id: 'share',
      icon: <Share2Icon className="w-5 h-5 text-indigo-500" />,
      title: 'Compartilhar App',
      description: 'Convide amigos para usar o EasyDiet',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'EasyDiet - Controle de dietas',
            text: 'Experimente o EasyDiet para controlar sua alimentação e alcançar seus objetivos!',
            url: window.location.origin,
          });
        } else {
          alert('Funcionalidade de compartilhamento não disponível em seu navegador');
        }
      }
    },
    {
      id: 'about',
      icon: <InfoCircledIcon className="w-5 h-5 text-purple-500" />,
      title: 'Sobre o App',
      description: 'Informações sobre o EasyDiet',
      action: () => alert('EasyDiet versão 1.0.0\nDesenvolvido por Equipe EasyDiet')
    },
    {
      id: 'contact',
      icon: <EnvelopeClosedIcon className="w-5 h-5 text-teal-500" />,
      title: 'Contato',
      description: 'Entre em contato com nosso suporte',
      action: () => window.location.href = 'mailto:suporte@easydiet.com'
    }
  ];

  const handleItemClick = (item) => {
    if (item.action) {
      item.action();
    }
  };

  return (
    <div className="pt-20 pb-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Mais</h1>
      
      <div className="space-y-3 mb-20">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {item.link ? (
              <Link href={item.link} className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-800">{item.title}</h2>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </Link>
            ) : (
              <button
                className="w-full flex items-center justify-between p-4"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h2 className="font-medium text-gray-800">{item.title}</h2>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="text-center text-gray-400 text-xs">
        <p>EasyDiet v1.0.0</p>
        <p className="mt-1">© 2023 EasyDiet - Todos os direitos reservados</p>
      </div>
    </div>
  );
} 