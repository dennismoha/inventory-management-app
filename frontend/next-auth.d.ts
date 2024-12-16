// // ts module augtmentation

import { DefaultSession, DefaultUser } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT, DefaultJWT } from "next-auth/jwt";


declare module 'next-auth' {
    interface Session {
        user: {
            // email: string;
            // username: string;
            role: string,
            session:string          
        } & DefaultSession       
    }

    interface User extends DefaultUser {
    
        role: string       
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        role: string,     
    }
}


// ts module augmentation for NextAuth

// import { DefaultSession, DefaultUser } from "next-auth";
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { JWT, DefaultJWT } from "next-auth/jwt";

// declare module 'next-auth' {
//     interface Session {
//         session:{
//             jwt: string,
//             expressSessionId: string
//         }& DefaultSession["user"]; // Ensuring we still inherit properties from DefaultSession
       
//     }

//     interface User extends DefaultUser {
//        data:{
//         token: string;
//         role: string;
        
//        },
//        sessionId: string;
//     }
// }

// declare module 'next-auth/jwt' {
//     interface JWT extends DefaultJWT {
//         role: string;
//         token: string;
//         sessionId: string;
//     }
// }

