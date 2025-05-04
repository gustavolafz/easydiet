import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { email, password } = await request.json();

    const response = await fetch(`${process.env.SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao autenticar:", errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();

    console.log("Dados recebidos:", data); // Verifique se o expires_at está chegando corretamente

    // Verificação se a data de expiração é válida
    const expiresAt = data.expires_at;
    const expiresDate = new Date(expiresAt); // Garantir que o formato esteja correto
    if (isNaN(expiresDate)) {
      throw new Error(`Data de expiração inválida: ${expiresAt}`);
    }

    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      serialize('access_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expiresDate,
      })
    );

    return new NextResponse(JSON.stringify(data), { status: 200, headers });
  } catch (err) {
    console.error('[Login API Error]', err);
    return NextResponse.json(
      { error: 'Erro ao conectar com o servidor de autenticação.' },
      { status: 500 }
    );
  }
}
