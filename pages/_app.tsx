// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath = router.pathname;

  const exclusionPaths = ['/terms', '/privacy', '/contact', '/advertise', '/for-universities', '/about','/service'];
  const shouldShowAd = !exclusionPaths.includes(currentPath) && !currentPath.startsWith('/admin');
  const shouldShowHeader = !exclusionPaths.includes(currentPath);

  return (
    <>
      {shouldShowHeader && <Header />}
      <main>
        <Component {...pageProps} />
      </main>
      {shouldShowAd && <AdBanner />}
      <Footer />
    </>
  );
}
