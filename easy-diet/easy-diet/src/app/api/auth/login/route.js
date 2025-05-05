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

    const { access_token, expires_at } = data.token;
    const { ...safeUserInfo } = data.user;

    const expiresDate = new Date(expires_at);
    if (isNaN(expiresDate)) {
      throw new Error(`Data de expiração inválida: ${expires_at}`);
    }

    const headers = new Headers();

    // Token seguro (HttpOnly)
    headers.append(
      'Set-Cookie',
      serialize('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expiresDate,
      })
    );

    
    // Info do usuário (legível no server)
    headers.append(
      'Set-Cookie',
      serialize('user_info', JSON.stringify(safeUserInfo), {
        httpOnly: false,
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
