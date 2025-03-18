import { NextRequest, NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

const PUBLIC_PATHS = ['/login', '/register']
const STATIC_PATHS = ['/_next/', '/favicon.ico', '/assets/']
const AUTH_PATHS = ['/api/auth/', '/api/register']

export async function middleware(req: NextRequest) {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const { pathname } = req.nextUrl

    // Excluir archivos estáticos y rutas de Next.js del middleware

    if (STATIC_PATHS.some(path => pathname.startsWith(path))) {

        return NextResponse.next()

    }

    // Excluir rutas de autenticación de NextAuth

    if (AUTH_PATHS.some(path => pathname.startsWith(path))) {

        return NextResponse.next()

    }

    // Si el usuario autenticado intenta ir a /login, lo redirige al inicio

    if (pathname === '/login' && token) {

        const url = req.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)

    }

    // Verifica si la ruta no está en las públicas y no hay token

    const isPublicRoute = PUBLIC_PATHS.includes(pathname)

    if (!isPublicRoute && !token) {

        const url = req.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('redirect', pathname) // Guarda la ruta para después del login
        return NextResponse.redirect(url)

    }

    return NextResponse.next()

}

export const config = {

    matcher: '/:path*', // Protege todas las rutas, excepto las estáticas

}

