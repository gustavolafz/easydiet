import FoodCard from '@/components/ui/FoodCard';
import React from 'react';

const foodData = [
    {
        id: 1,
        name: 'Arroz Integral',
        image: 'https://via.placeholder.com/200x150', // Imagem de exemplo
        quantity: '1 porção',
        calories: 150,
        macronutrients: {
            protein: 4,
            carbs: 30,
            fat: 1,
        },
    },
    {
        id: 2,
        name: 'Frango Grelhado',
        image: 'https://via.placeholder.com/200x150', // Imagem de exemplo
        quantity: '1 peito',
        calories: 200,
        macronutrients: {
            protein: 30,
            carbs: 0,
            fat: 8,
        },
    },
    // Adicione mais itens conforme necessário
];

const FoodList = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {foodData.map((food) => (
                <FoodCard key={food.id} food={food} />
            ))}
        </div>
    );
};

export default FoodList;
