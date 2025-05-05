import Navbar from "@/components/layouts/ui/Navbar";
import TopBar from "@/components/layouts/ui/Topbar";

import { cookies } from 'next/headers';

export function getUserInfo() {
  const cookieStore = cookies();
  const raw = cookieStore.get('user_info');

  if (!raw?.value) return null;

  try {
    return JSON.parse(decodeURIComponent(raw.value));
  } catch (err) {
    console.error('Erro ao parsear user_info:', err);
    return null;
  }
}

export default function PrivateLayout({ children }) {

  const user = getUserInfo();

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar userName={user.first_name}/>
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
