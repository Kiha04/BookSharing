// pages/_app.tsx

import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { useRef } from 'react'; // ★ useEffect はGA専用だったので削除
import Link from 'next/link';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';
import ScrollToTopButton from '../components/ScrollToTopButton';
// import Script from 'next/script'; // ★ GA関連のため削除
import announcementStyles from '../styles/Announcement.module.css';

// ★ GA関連の定数と型定義を削除
// const GA_MEASUREMENT_ID = ...
// declare global { ... }

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath = router.pathname;
  const footerRef = useRef<HTMLElement>(null);

  // ★ GAのページビュー追跡(useEffect)を削除

  // --- 表示制御ロジック ---
  const adExclusionPaths = ['/', '/terms', '/privacy', '/contact', '/advertise', '/for-universities', '/about','/service'];
  const shouldShowAd = !adExclusionPaths.includes(currentPath) && !currentPath.startsWith('/admin');
  
  const headerExclusionPaths = ['/login', '/_error'];
  const shouldShowHeader = !headerExclusionPaths.includes(currentPath);

  const bannerExclusionPaths = ['/', '/policy', '/terms', '/privacy', '/contact', '/for-universities', '/advertise', '/about', '/service'];
  const shouldShowPolicyBanner = !bannerExclusionPaths.includes(currentPath) && !currentPath.startsWith('/admin');

  // ★ return 文を正しい位置に修正
  return (
    <>
      {/* ★ GAのScriptタグを削除 */}
    
      {shouldShowHeader && <Header />}

      {shouldShowPolicyBanner && (
        <div className={announcementStyles.announcementBar}>
          本サービスをご利用の際は、必ず
          <Link href="/policy" target="_blank" rel="noopener noreferrer">
            教科書取り扱い方針
          </Link>
          をご確認ください。
        </div>
      )}

      <main>
        <Component {...pageProps} />
      </main>
      
      {shouldShowAd && <AdBanner />}
      
      {/* ★ FooterとScrollToTopButtonの呼び出しを修正 */}
      <Footer ref={footerRef} />
      <ScrollToTopButton footerRef={footerRef}/>
    </>
  );
}
