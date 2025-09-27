// src/components/Header.tsx (レイアウト調整のため構造変更)

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";
import { FaLanguage } from "react-icons/fa";

const Header: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [currentPageUrl, setCurrentPageUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPageUrl(window.location.href);
    }
  }, [router.asPath]);

  const targetLanguage = 'en';
  const sourceLanguage = 'ja';
  const googleTranslateUrl = `https://translate.google.com/translate?sl=${sourceLanguage}&tl=${targetLanguage}&u=${encodeURIComponent(currentPageUrl)}&op=websites`;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* メインナビゲーションリンクをグループ化 */}
        <div className={styles.navLinks}>
          <Link href="/" className={`${styles.link} ${currentPath === "/" ? styles.activeLink : ""}`}>
            ホーム
          </Link>
          <Link href="/books" className={`${styles.link} ${currentPath === "/books" ? styles.activeLink : ""}`}>
            探す
          </Link>
          <Link href="/donate" className={`${styles.link} ${currentPath === "/donate" ? styles.activeLink : ""}`}>
            寄付する
          </Link>
          <Link href="/receive" className={`${styles.link} ${currentPath === "/receive" ? styles.activeLink : ""}`}>
            もらう
          </Link>
        </div>

        {/* 翻訳ボタン */}
        {currentPageUrl && (
            <a
              href={googleTranslateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.translateButton}
              title={`Translate this page to ${targetLanguage.toUpperCase()}`}
            >
              <FaLanguage />
              <span className={styles.translateButtonText}>Translate</span>
            </a>
        )}
      </nav>
    </header>
  );
};

export default Header;