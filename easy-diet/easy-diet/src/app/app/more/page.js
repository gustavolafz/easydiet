'use client'

import { useState, useEffect } from 'react';
import ProfileMenu from '@/components/ui/ProfileMenu';
import SkeletonLoader from '@/components/ui/SkeletonLoader'; // Importe o SkeletonLoader

export default function Profile() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simula o tempo de carregamento (ajuste conforme a necessidade)
        setTimeout(() => {
            setLoading(false); // Após 2 segundos, define como carregado
        }, 2000); 
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            {/* Usando o SkeletonLoader enquanto o conteúdo está carregando */}
            <SkeletonLoader loading={loading} variant="rectangular" width="100%" height="100%">
                <ProfileMenu /> {/* Seu componente real */}
            </SkeletonLoader>
        </div>
    );
}
