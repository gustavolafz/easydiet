'use server'

import React from 'react';
import RecipeCreateForm from '@/components/forms/RecipeCreateForm';
import { cookies } from 'next/headers';

async function getUserInfo() {
    const cookieStore = await cookies();
    const raw = cookieStore.get('user_info'); // Acessa o cookie
    
    if (!raw?.value) return null; // Verifica se há um cookie
    
    try {
        return JSON.parse(decodeURIComponent(raw.value)); // Retorna o cookie decodificado
    } catch (err) {
        console.error('Erro ao parsear user_info:', err);
        return null; // Caso haja erro na conversão
    }
}

const userInfo = await getUserInfo();

const RecipeCreatePage = () => {
    return (
        <div className="recipe-create-page h-full bg-gray-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Criar Nova Receita</h1>
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg">
                <RecipeCreateForm userId={userInfo?._id} />
            </div>
        </div>
    );
};

export default RecipeCreatePage;