import EasyDiet from '@/components/pages/Easydiet';
import { cookies } from 'next/headers';
import React from 'react';

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
