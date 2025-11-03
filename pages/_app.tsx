//pages/_app.tsx (お知らせバー追加)

import type { AppProps } from "next/app";
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react'; // useEffect をインポート
import Link from 'next/link'; // ★ Link をインポート
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Script from 'next/script';
import announcementStyles from '../styles/Announcement.module.css'; // ★ お知らせバーのCSSをインポート

// GA_MEASUREMENT_ID や gtag の型定義
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath = router.pathname;
  const footerRef = useRef<HTMLElement>(null);

  
  // --- 表示制御ロジック ---
  const adExclusionPaths = ['/', '/terms', '/privacy', '/contact', '/advertise', '/for-universities', '/about','/service'];
  const shouldShowAd = !adExclusionPaths.includes(currentPath) && !currentPath.startsWith('/admin');
  
  const headerExclusionPaths = ['/login', '/_error'];
  const shouldShowHeader = !headerExclusionPaths.includes(currentPath);

  // ★ お知らせバーを表示しないページを定義
  // (ホームページ、方針ページ自体、管理ページなど)
  const bannerExclusionPaths = ['/', '/policy', '/terms', '/privacy', '/contact', '/for-universities', '/advertise', '/about', '/service'];
  const shouldShowPolicyBanner = !bannerExclusionPaths.includes(currentPath) && !currentPath.startsWith('/admin');

 

      {shouldShowHeader && <Header />}

      {/* ★ ヘッダーの直下にお知らせバーを配置 ★ */}
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
      
      <ScrollToTopButton footerRef={footerRef}/>
    </>
  );
}
