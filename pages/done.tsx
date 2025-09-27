// src/pages/done.tsx

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Form.module.css';
import { FaCheckCircle, FaUndo } from 'react-icons/fa';

export default function DonePage() {
  return (
    <>
      <Head>
        <title>登録完了</title>
      </Head>

      <div className={styles.container} style={{ textAlign: 'center' }}>
        <FaCheckCircle className={styles.successIcon} />

        <h2 className={styles.successTitle}>登録が完了しました！</h2>
        <p className={styles.successText}>ありがとうございました。</p>

        <div className={styles.buttonGroup} style={{ marginTop: '2rem' }}>
          <Link href="/donate" passHref>
            <button type="button" className={`${styles.button} ${styles.buttonSecondary}`}>
              <FaUndo /> 寄付ページに戻る
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
