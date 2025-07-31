import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/'];

// Define protected routes and their required roles
const protectedRoutes = {
  '/admin': 'ADMIN',
  '/user': 'USER'
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the current path is a public route
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if the current path starts with a protected route
  const protectedRoute = Object.keys(protectedRoutes).find(route => 
    pathname.startsWith(route)
  );

  if (protectedRoute) {
    // For protected routes, let the client-side routing handle authentication
    // This middleware mainly serves as a backup and for server-side rendering
    return NextResponse.next();
  }

  // For all other routes, allow them to pass through
  return NextResponse.next();
}

// Configure which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
