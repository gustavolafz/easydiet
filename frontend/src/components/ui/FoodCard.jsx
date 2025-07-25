'use client'

import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamic import do Dialog para reduzir bundle inicial
const Dialog = dynamic(() => 
  import('@radix-ui/react-dialog').then(mod => ({
    default: mod.Root,
    Trigger: mod.Trigger,
    Portal: mod.Portal,
    Overlay: mod.Overlay,
    Content: mod.Content,
    Title: mod.Title,
    Description: mod.Description,
    Close: mod.Close,
  })),
  { ssr: false }
);

const FoodCard = memo(({ food }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <motion.div
            className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center max-w-sm mx-auto hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative w-full h-40 mb-4">
                <Image
                    src={food.image || '/placeholder-food.jpg'}
                    alt={food.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">{food.name}</h3>
            <p className="text-gray-600 mb-1">Quantidade: {food.quantity}</p>
            <p className="text-gray-600 mb-4">Total Calórico: {food.calories} kcal</p>

            {Dialog && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                </Dialog>
            )}
        </motion.div>
    );
}, (prevProps, nextProps) => {
    // Comparação customizada para evitar re-renders desnecessários
    return prevProps.food.id === nextProps.food.id &&
           prevProps.food.name === nextProps.food.name &&
           prevProps.food.calories === nextProps.food.calories;
});

FoodCard.displayName = 'FoodCard';

export default FoodCard;
