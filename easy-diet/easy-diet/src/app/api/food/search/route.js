import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('nome');

  if (!searchTerm) {
    return NextResponse.json({ error: 'Parâmetro "nome" é obrigatório' }, { status: 400 });
  }

  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Token de acesso não encontrado' }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL}/food?nome=${encodeURIComponent(searchTerm)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro na busca de alimentos:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err) {
    console.error('[Food Search API Error]', err);
    return NextResponse.json({ error: 'Erro ao conectar com o servidor de alimentos.' }, { status: 500 });
  }
}
