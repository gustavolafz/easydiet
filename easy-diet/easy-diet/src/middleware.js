// middleware.js
import { NextResponse } from 'next/server'

const publicRoutes = ['/auth/login', '/forgot-password']

export function middleware(req) {
  const { pathname } = req.nextUrl

  // Permite rotas públicas
  const isPublic = publicRoutes.some((path) => pathname.startsWith(path))

  // Permite arquivos estáticos e manifest.json, etc
  const isStatic = pathname.startsWith('/_next') ||
                   pathname.startsWith('/favicon.ico') ||
                   pathname.startsWith('/manifest.json') ||
                   pathname.startsWith('/images') || 
                   pathname.startsWith('/icons') ||
                   pathname.startsWith('/img')

  if (isPublic || isStatic) return NextResponse.next()

  const token = req.cookies.get('access_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json).*)'],
}
