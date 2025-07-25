import { cookies } from 'next/headers';
import React from 'react';
import dynamic from 'next/dynamic';

const EasyDiet = dynamic(() => import('@/components/pages/Easydiet'), {
  loading: () => <div className="flex justify-center items-center h-screen">Carregando...</div>,
});

export default async function EasyDietPage() {
    const cookieStore = cookies(); 
    const raw = cookieStore.get('user_info');

    let user = null;

    if (raw?.value) {
        try {
            user = JSON.parse(decodeURIComponent(raw.value));
        } catch (err) {
            console.error('Erro ao parsear user_info:', err);
        }
    }

    return (
        <div>
            <EasyDiet />
        </div>
    );
}
