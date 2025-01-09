// Without a defined matcher, this one line applies next-auth 
// to the entire project
// export { default } from "next-auth/middleware"

import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    // withAuth Augments your request with the users token

    function middleware(req: NextRequestWithAuth) {
        console.log('req is ', req.nextauth)  

  

        if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== 'admin') {
            console.log('here')
            return NextResponse.rewrite(
                new URL('/denied', req.url)
            )
        }

        if (req.nextUrl.pathname.startsWith('/pos') && req.nextauth.token?.role !== 'user') {
            return NextResponse.rewrite(
                new URL('/denied', req.url)
            )
        }

    }, {
    callbacks: {
        // authorized: ({ token }) => token?.role ==='admin'
        authorized: ({ token }) => !!token
    }
}

)

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/products/:path*", "/dashboard", "/suppliers/:path*", "/orders/:path*", "/categories/:path*", "/inventory/:path*","/pos/:path*", "/admin/:path*"] }