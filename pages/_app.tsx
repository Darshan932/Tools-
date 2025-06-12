import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';

import '../styles/globals.css';
import MainLayout from '@/layouts/MainLayout';

// Load Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="400+ AI tools for productivity, writing, design, and more" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className={`${inter.variable} font-sans`}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </div>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}