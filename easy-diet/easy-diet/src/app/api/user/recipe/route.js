import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  if (!userId) {
    return NextResponse.json({ error: 'Parâmetro "user_id" é obrigatório' }, { status: 400 });
  }

  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Token de acesso não encontrado' }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL}/recipe?user_id=${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao buscar receitas:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('[Recipe Fetch Error]', err);
    return NextResponse.json({ error: 'Erro ao conectar com o servidor de receitas.' }, { status: 500 });
  }
}
