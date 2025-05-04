'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';

const FoodCard = ({ food }) => {
    return (
        <motion.div
            className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center max-w-sm mx-auto hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <img
                src={food.image}
                alt={food.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{food.name}</h3>
            <p className="text-gray-600 mb-1">Quantidade: {food.quantity}</p>
            <p className="text-gray-600 mb-4">Total Calórico: {food.calories} kcal</p>

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                        <InfoCircledIcon className="w-5 h-5" />
                        Ver Detalhes
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                    <Dialog.Content
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <Dialog.Title className="text-xl font-semibold mb-4">
                                Detalhes de {food.name}
                            </Dialog.Title>
                            <Dialog.Description className="text-gray-700 mb-4">
                                <div>Proteínas: {food.macronutrients.protein}g</div>
                                <div>Carboidratos: {food.macronutrients.carbs}g</div>
                                <div>Gorduras: {food.macronutrients.fat}g</div>
                            </Dialog.Description>
                            <div className="flex justify-end">
                                <Dialog.Close asChild>
                                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                                        Fechar
                                    </button>
                                </Dialog.Close>
                            </div>
                        </motion.div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </motion.div>
    );
};

export default FoodCard;
