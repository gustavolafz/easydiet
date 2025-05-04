'use client'

import { useState, useEffect } from 'react';
import { PersonIcon, BellIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

export default function TopBar({ userName }) {
    const [scrollingDown, setScrollingDown] = useState(false); // Estado para controlar a rolagem
    const [lastScrollY, setLastScrollY] = useState(0); // Armazena a última posição do scroll

    useEffect(() => {
        const handleScroll = () => {
            // Detecta a direção do scroll
            if (window.scrollY > lastScrollY) {
                setScrollingDown(true); // Rolando para baixo
            } else {
                setScrollingDown(false); // Rolando para cima
            }
            setLastScrollY(window.scrollY); // Atualiza a última posição do scroll
        };

        // Adiciona o listener de scroll
        window.addEventListener('scroll', handleScroll);

        // Remove o listener ao desmontar o componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-16 px-4 flex items-center justify-between bg-white shadow-md z-50"
            initial={{ y: 0 }} // A TopBar começa visível
            animate={{ y: scrollingDown ? -80 : 0 }} // Desaparece quando rola para baixo e aparece quando rola para cima
            transition={{ type: 'spring', stiffness: 300, damping: 25 }} // Transição suave
        >
            {/* Ícone de perfil + nome */}
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <PersonIcon className="w-6 h-6 text-white" strokeWidth={2} /> {/* Aumento da espessura */}
                </div>
                <span className="text-base font-medium text-gray-800">
                    Olá, {userName}
                </span>
            </div>

            {/* Notificação */}
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                <BellIcon className="w-6 h-6 text-gray-700" strokeWidth={2} /> {/* Aumento da espessura */}
            </button>
        </motion.div>
    );
}
