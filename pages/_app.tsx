// src/pages/_app.tsx (修正後)

import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { useRef } from 'react';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath = router.pathname;
  const footerRef = useRef<HTMLElement>(null);

  // --- 広告とヘッダーの表示ロジック (既存) ---
  const adExclusionPaths = ['/', '/terms', '/privacy', '/contact', '/advertise', '/for-universities', '/about','/service'];
  const shouldShowAd = !adExclusionPaths.includes(currentPath) && !currentPath.startsWith('/admin');
  const headerExclusionPaths = ['/login', '/_error'];
  const shouldShowHeader = !headerExclusionPaths.includes(currentPath);

  // ★ 1. ホームページかどうかを判定
  const isHomePage = currentPath === '/';

  return (
    <>
      {shouldShowHeader && <Header />}
      <main>
        <Component {...pageProps} />
      </main>
      {shouldShowAd && <AdBanner />}

      {/* ★ 2. ホームページではない時だけ、共通フッターと共通ボタンを表示 */}
      {!isHomePage && (
        <>
          <Footer ref={footerRef} />
          <ScrollToTopButton footerRef={footerRef} />
        </>
      )}
    </>
  );
}
