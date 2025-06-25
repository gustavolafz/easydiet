// src/app/api/auth/register/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await request.json();

    const response = await fetch(`${process.env.SERVER_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Register API Error]', data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('[Register API Error]', err);
    return NextResponse.json(
      { error: 'Erro ao conectar com o servidor de autenticação.' },
      { status: 500 }
    );
  }
}
