import NextAuth from 'next-auth'
import { options } from './options'
// import { NextApiRequest, NextApiResponse } from 'next'
import type { NextRequest, NextResponse } from 'next/server'

const handler = (req: NextRequest, res: NextResponse) => {
    return NextAuth(req, res, options)
}

// export default handler
export { handler as GET, handler as POST }
// const handler = NextAuth(options)

// export { handler as GET, handler as POST }

// import NextAuth from 'next-auth'
// import { options } from './options'
// import { NextApiRequest, NextApiResponse } from 'next'

// const handler = (req: NextApiRequest,res: NextApiResponse) =>{
//     return NextAuth(req,res,options)
// }


// export { handler as GET, handler as POST }