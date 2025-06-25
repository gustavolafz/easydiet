import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Usuário não autenticado.' }, { status: 401 });
    }

    const body = await req.json();

    console.log(body)

    const backendRes = await fetch(`${process.env.SERVER_URL}/recipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const backendData = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: backendData.message || 'Erro ao criar receita.' },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(backendData);
  } catch (error) {
    console.error('Erro ao criar receita:', error);
    return NextResponse.json({ message: 'Erro interno.' }, { status: 500 });
  }
}
