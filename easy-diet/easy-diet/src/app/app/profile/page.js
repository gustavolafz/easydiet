import ProfilePage from "@/components/ui/ProfilePage";
import { cookies } from 'next/headers';

export default async function Profile() {

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

    const userInfo = await getUserInfo()
    
    return (
        <div>
            <ProfilePage userInfo={userInfo}/>
        </div>
    )
}