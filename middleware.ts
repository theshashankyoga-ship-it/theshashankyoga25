import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // Protected routes
  const isAdminRoute = pathname.startsWith('/admin');
  const isStudioRoute = pathname.startsWith('/studio');
  const isStudentRoute = pathname.startsWith('/student');

  if (isAdminRoute || isStudioRoute || isStudentRoute) {
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile) {
      const role = profile.role;

      // Admin route protection
      if (isAdminRoute && role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Studio route protection
      if (isStudioRoute && role !== 'studio') {
        const redirectTo = role === 'admin' ? '/admin' : '/student';
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }

      // Student route protection
      if (isStudentRoute && role !== 'student') {
        const redirectTo = role === 'admin' ? '/admin' : '/studio';
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: ['/studio/:path*', '/student/:path*', '/admin/:path*'],
};
