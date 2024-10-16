// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token exists, redirect to the sign-in page
  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next(); // Proceed if the user is authenticated
}

// Apply middleware to secure admin pages
export const config = {
  matcher: [ '/Reservations/:path*', '/Cars/:path*', '/Users/:path*' , '/api/cars/:path*', '/api/reservations/:path*' ],
};
