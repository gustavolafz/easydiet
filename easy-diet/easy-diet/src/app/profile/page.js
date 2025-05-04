'use client'

import ProfileMenu from '@/components/ProfileMenu';

export default function Profile() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Conteúdo da página, com margem superior para compensar a altura da TopBar */}
                <ProfileMenu />
        </div>
    );
}
