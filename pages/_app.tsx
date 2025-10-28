// pages/_app.tsx
import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRef } from 'react';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';
import ScrollToTopButton from '../components/ScrollToTopButton'; // ScrollToTopButton も必要
import Script from 'next/script'; // next/script をインポート

// ★★★ あなたのGA4測定IDに置き換えてください ★★★
const GA_MEASUREMENT_ID = "G-H4XBZPNYFW ";

// gtag関数を安全に呼び出すための型定義 (任意)
declare global {
    interface Window {
        gtag: (...args: any[]) => void; // より寛容な型定義
    }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath = router.pathname;
  const footerRef = useRef<HTMLElement>(null); // ScrollToTopButton用にrefを追加

  // ★ ルート変更時にページビューを送信
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // 本番環境、測定IDがあり、gtag関数が存在する場合のみ実行
      if (process.env.NODE_ENV === 'production' && GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);


  // 広告とヘッダーの表示ロジック
  const adExclusionPaths = ['/', '/terms', '/privacy', '/contact', '/advertise', '/for-universities', '/about','/service'];
  const shouldShowAd = !adExclusionPaths.includes(currentPath) && !currentPath.startsWith('/admin');
  const headerExclusionPaths = ['/login', '/_error']; // 必要に応じて '/terms', '/privacy' なども追加
  const shouldShowHeader = !headerExclusionPaths.includes(currentPath);

  return (
    <>
      {/* ★ Google Analytics gtag.js スクリプト (本番環境のみ) */}
      {process.env.NODE_ENV === 'production' && GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {shouldShowHeader && <Header />}
      <main>
        <Component {...pageProps} />
      </main>
      {shouldShowAd && <AdBanner />}
      <Footer ref={footerRef} /> {/* footerRef を渡す */}
      <ScrollToTopButton footerRef={footerRef} />
    </>
  );
}
