// src/components/Footer.tsx (正しいコード)

import styles from '../styles/Footer.module.css';
import Link from 'next/link';
// ★ forwardRef と ForwardedRef をインポート
import React, { forwardRef, ForwardedRef } from 'react';

// ★ forwardRef でコンポーネントをラップし、props と ref を引数で受け取る
const Footer = forwardRef<HTMLElement>((props, ref: ForwardedRef<HTMLElement>) => {
  return (
    // ★ 受け取った ref を footer 要素に渡す
    <footer className={styles.footer} ref={ref}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} 学内図書シェアプロジェクト. All rights reserved.</p>
        <nav className={styles.footerLinks}>
          <Link href="/">ホームへ戻る</Link> |
          <Link href="/contact">お問い合わせ</Link> |
          <Link href="/terms">利用規約</Link> |
          <Link href="/privacy">プライバシーポリシー</Link> |
          <Link href="/service">サービス案内はこちら</Link>
          {/*
           <Link href="/for-universities">学校関係者はこちら</Link>
           <Link href="/advertise">企業の方はこちら</Link>
           <Link href="/about">会社案内はこちら</Link>
          */}
        </nav>
      </div>
    </footer>
  );
});

// ★ displayName を設定 (デバッグ用)
Footer.displayName = 'Footer';

export default Footer;
