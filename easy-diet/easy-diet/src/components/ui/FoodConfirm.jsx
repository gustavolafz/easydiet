"use client";

import React, { useState } from "react";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons"; // Corrigindo os ícones
import { motion } from "framer-motion"; // Importando Framer Motion

const FoodConfirm = ({ onConfirm, onReject }) => {
  const [rotation, setRotation] = useState(0); // Controle da rotação durante o movimento
  const [feedback, setFeedback] = useState(""); // Feedback para o usuário
  const [finalRotation, setFinalRotation] = useState(0); // Posição final da rotação
  const [isLocked, setIsLocked] = useState(false); // Impede mais interações após confirmação ou rejeição
  const [showCircle, setShowCircle] = useState(true); // Controle para mostrar ou esconder o círculo
  const [enlarged, setEnlarged] = useState(false); // Controle para aumentar o tamanho do ícone
  const [circleColor, setCircleColor] = useState("rgb(156, 163, 175)"); // Cor inicial (cinza)

  const handleStart = (e) => {
    if (isLocked) return; // Impede a interação se o estado estiver travado

    // Previne o comportamento padrão do evento de toque (impede o deslocamento da tela)
    e.preventDefault();
    const startX = e.touches ? e.touches[0].clientX : e.clientX; // Verifica se o evento é de toque

    const handleMove = (moveEvent) => {
      moveEvent.preventDefault(); // Impede o deslocamento da tela durante o movimento

      const deltaX = moveEvent.touches
        ? moveEvent.touches[0].clientX - startX
        : moveEvent.clientX - startX;
      const cappedDeltaX = Math.max(-180, Math.min(180, deltaX)); // Limita a rotação entre -180 e 180
      setRotation(cappedDeltaX); // Atualiza a rotação com o movimento

      // Definindo feedback e cor com base no valor da rotação
      if (cappedDeltaX >= 180) {
        setFeedback("Você confirmou que ingeriu o alimento!");
        setFinalRotation(180); // A rotação final é 180 ao atingir esse limite
        setCircleColor("rgb(34, 197, 94)"); // Mudando para verde (rgb(34, 197, 94) é o verde do Tailwind)
      } else if (cappedDeltaX <= -180) {
        setFeedback("Você confirmou que NÃO ingeriu o alimento!");
        setFinalRotation(-180); // A rotação final é -180 ao atingir esse limite
        setCircleColor("rgb(239, 68, 68)"); // Mudando para vermelho (rgb(239, 68, 68) é o vermelho do Tailwind)
      } else {
        setFeedback(""); // Caso contrário, limpa o feedback
        setCircleColor("rgb(156, 163, 175)"); // Cor intermediária enquanto o círculo está sendo girado (cinza)
      }
    };

    const handleEnd = () => {
      if (finalRotation === 180) {
        onConfirm(); // Executa a ação de confirmação
      } else if (finalRotation === -180) {
        onReject(); // Executa a ação de rejeição
      }

      setIsLocked(true); // Impede mais interações
      setRotation(finalRotation); // Fixando a rotação no valor final
      setShowCircle(false); // Esconde o círculo
      setEnlarged(true); // Aumenta o ícone
      setFeedback(""); // Limpa o feedback
      document.removeEventListener("touchmove", handleMove, { passive: false }); // Garantindo que touchmove não seja passivo
      document.removeEventListener("touchend", handleEnd);
    };

    document.addEventListener("touchmove", handleMove, { passive: false }); // Aqui, despassivamos o evento
    document.addEventListener("touchend", handleEnd);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Animação para o ícone de confirmação maior */}
      {!showCircle && (
        <motion.div
          className="flex items-center justify-center"
          style={{ fontSize: "12rem" }} // Tamanho 3x maior
          initial={{ scale: 0 }}
          animate={{ scale: enlarged ? 3 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {finalRotation === 180 ? (
            <CheckIcon style={{ fontSize: "inherit" }} />
          ) : finalRotation === -180 ? (
            <Cross2Icon style={{ fontSize: "inherit" }} />
          ) : null}
        </motion.div>
      )}

      {/* O círculo com rotação animada e transição de cor */}
      {showCircle && (
        <motion.div
          className="relative w-40 h-40 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer"
          style={{
            transform: `rotateY(${rotation}deg)`,
            backgroundColor: circleColor, // Usando a cor diretamente no estilo
          }}
          onTouchStart={handleStart} // Usando o evento de toque para dispositivos móveis
          initial={{ rotateY: 0 }}
          animate={{ rotateY: rotation }}
          transition={{ duration: 0.3 }}
          // Agora a cor de fundo será animada pelo Framer Motion
          animate={{ backgroundColor: circleColor }} // Anima a cor do fundo
          transition={{ duration: 0.5 }} // Tempo da transição de cor
        >
          <span className="text-lg font-bold">
            {rotation >= 90 ? (
              <CheckIcon style={{ fontSize: "2rem" }} />
            ) : rotation <= -90 ? (
              <Cross2Icon style={{ fontSize: "2rem" }} />
            ) : (
              "Gire"
            )}
          </span>
        </motion.div>
      )}

      {/* Feedback com animação de fade-in */}
      {feedback && (
        <motion.p
          className="mt-4 text-center text-gray-700 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {feedback}
        </motion.p>
      )}
    </div>
  );
};

export default FoodConfirm;
