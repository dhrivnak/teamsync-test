import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')
  const { pathname } = request.nextUrl

  // Protect dashboard route
  if (pathname.startsWith('/dashboard')) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect to dashboard if already logged in and trying to access login
  if (pathname === '/login' && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
