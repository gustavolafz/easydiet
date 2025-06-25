import Profile from "@/components/pages/Profile";
import { cookies } from 'next/headers';
import React from 'react';

export default async function ProfilePage() {

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
      
    let user

    user = await getUserInfo();

    return (
        <div>
            <Profile user={user} />
        </div>
    );
}