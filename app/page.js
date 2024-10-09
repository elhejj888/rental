'use client';
import Image from 'next/image';
import { SessionProvider } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // Redirect to /Home
  router.push('/Home');

  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
