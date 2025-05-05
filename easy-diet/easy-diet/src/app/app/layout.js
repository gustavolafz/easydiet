'use server'

// PrivateLayout.js
import Navbar from "@/components/layouts/ui/Navbar";
import TopBar from "@/components/layouts/ui/Topbar";
import { cookies } from 'next/headers';

export async function getUserInfo() {
  const cookieStore = cookies();
  const raw = await cookieStore.get('user_info'); // Acessa o cookie

  if (!raw?.value) return null; // Verifica se há um cookie

  try {
    return JSON.parse(decodeURIComponent(raw.value)); // Retorna o cookie decodificado
  } catch (err) {
    console.error('Erro ao parsear user_info:', err);
    return null; // Caso haja erro na conversão
  }
}

// Coloque isso no layout do seu App
export default async function PrivateLayout({ children }) {
  const user = await getUserInfo();  // Obtemos as informações do usuário no servidor

  if (!user) {
    return (
      <div>
        <h1>Você não está autenticado!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar userName={user.first_name} /> {/* Passa o nome do usuário para a TopBar */}
      <div className="flex flex-1">
        <Navbar /> {/* Barra lateral */}
        <main className="flex-1 bg-gray-50">
          {children} {/* Renderiza o conteúdo filho */}
        </main>
      </div>
    </div>
  );
}
