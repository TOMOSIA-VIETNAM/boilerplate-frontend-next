import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { i18nConfig } from '../i18nConfig'

// Add paths that don't require authentication
const publicPaths = ['/login']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow all API routes to pass through (including /api/auth)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Handle locale routing manually
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    // Redirect to default locale
    const locale = i18nConfig.defaultLocale
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }

  const token = await getToken({ req: request })

  // If user is authenticated and tries to access login page, redirect to home
  if (token && pathname.includes('/login')) {
    const locale = pathname.split('/')[1] || 'en'
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // Allow public paths (login page)
  if (publicPaths.some((path) => pathname.includes(path))) {
    return NextResponse.next()
  }

  // Check if user is authenticated for protected routes
  if (!token) {
    const locale = pathname.split('/')[1] || 'en'
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|images|icons|logo|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp).*)'
  ]
}
