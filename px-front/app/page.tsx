"use client";
import GoogleLoginButton from "@/Components/Login/GoogleButton";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";



export default function Home() {
  const { login, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen flex flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-200">
          LearnerX
        </h1>
        <p className="p-08">Welcome to LearnerX - Your Gateway to Knowledge!</p>

        <div className="mt-4 p-8  text-white">
          {!user && <GoogleLoginButton  />}
        </div>
      </main>
    </div>
  );
}
