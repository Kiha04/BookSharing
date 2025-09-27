//components/Footer.tsx

import React from 'react';
import styles from '../styles/Footer.module.css'; 
import Link from 'next/link';

const Footer: React.FC = () => {

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} 学内図書シェアプロジェクト. All rights reserved.</p>
        <nav className={styles.footerLinks}>
           <a href="/terms">利用規約</a>
           <a href="/privacy">プライバシーポリシー</a><br />
           <a href="/contact">お問い合わせ</a>
           <a href="/service">サービスはこちら</a>
           {/*<a href="/for-universities">学校関係者はこちら</a>
           <a href="/advertise">企業の方はこちら</a>
           <a href="/about">会社案内はこちら</a>*/}
        </nav>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
