import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
    try {
        const headers = new Headers();

        // Remove o cookie do token de acesso
        headers.append(
            'Set-Cookie',
            serialize('access_token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                expires: new Date(0), // Define a expiração para o passado
            })
        );

        // Remove o cookie de informações do usuário
        headers.append(
            'Set-Cookie',
            serialize('user_info', '', {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                expires: new Date(0), // Define a expiração para o passado
            })
        );

        return new NextResponse(JSON.stringify({ message: 'Logout realizado com sucesso.' }), {
            status: 200,
            headers,
        });
    } catch (err) {
        console.error('[Logout API Error]', err);
        return NextResponse.json(
            { error: 'Erro ao realizar logout.' },
            { status: 500 }
        );
    }
}
