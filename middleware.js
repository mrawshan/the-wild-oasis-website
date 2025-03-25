// import { NextResponse } from 'next/server';

// // Convention is to call middleware
// export function middleware(request) {
// 	console.log(request);

// 	// Redirecting the user using middleware
// 	return NextResponse.redirect(new URL('/about', request.url));
// }

// lib
import { auth } from '@/app/_lib/auth';
export const middleware = auth;

// Protecting the account page (Guest area) from non login users
export const config = {
	matcher: ['/account'],
};
