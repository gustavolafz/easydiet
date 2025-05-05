"use client";

import { useState, useEffect } from "react";
import { PersonIcon, BellIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

export default function TopBar({ userName }) {
  const [scrollingDown, setScrollingDown] = useState(false); // Estado para controlar a rolagem
  const [lastScrollY, setLastScrollY] = useState(0); // Armazena a última posição do scroll
  const [showModal, setShowModal] = useState(false); // Controle de visibilidade do modal
  const [notifications, setNotifications] = useState([]); // Lista de notificações

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleProfileClick = () => {
    window.location.href = "/app/profile";
  };

  const handleNotificationClick = () => {
    setShowModal(!showModal);

    // Exemplo de notificações
    if (notifications.length === 0) {
      setNotifications([
        { id: 1, message: "Você tem uma nova mensagem!" },
        { id: 2, message: "Seu pedido foi enviado." },
      ]);
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-16 px-4 flex items-center justify-between bg-white shadow-md z-50"
      initial={{ y: 0 }}
      animate={{ y: scrollingDown ? -80 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Ícone de perfil + nome */}
      <div className="flex items-center space-x-3" onClick={handleProfileClick}>
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center cursor-pointer">
          <PersonIcon className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <span className="text-base font-medium text-gray-800">
          Olá, {userName}
        </span>
      </div>

      {/* Ícone de notificações */}
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        onClick={handleNotificationClick}
      >
        <BellIcon className="w-6 h-6 text-gray-700" strokeWidth={2} />
      </button>

      {/* Modal de Notificações */}
      {showModal && (
        <motion.div
          className="fixed top-16 right-4 w-72 p-4 bg-white shadow-lg rounded-lg z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h2 className="text-lg font-semibold mb-4">Notificações</h2>

          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notif) => (
                <li key={notif.id} className="mb-2">
                  {notif.message}
                  {/* Barra horizontal fina */}
                  <div className="w-16 h-0.5 bg-gray-300 mb-4 mx-auto" />
                </li>
              ))}
            </ul>
          ) : (
            <p>Você não tem notificações.</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
