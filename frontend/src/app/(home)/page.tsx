// import Dashboard from '@/app/dashboard/page'
// import LandingPage from '@/app/home/page'
'use client'
import { signIn, signOut  } from "next-auth/react"
import Button from "@/app/(components)/Button/Button"

export default function Home() {
  return (
    // <Dashboard />
    // <LandingPage />
    <>
    
    <div>hello we are at home</div>
    <Button text="login"  onClick={() => signIn("github", { redirectTo: "/" })} variant="primary" size="medium" />
    <Button text="logout" onClick={() => signOut()} variant="secondary" size="medium" />
    </>

  );
}
