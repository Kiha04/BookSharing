// src/pages/for-universities.tsx (価格・寄付セクション修正)

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/ForUniversities.module.css';
import { FaGraduationCap, FaLeaf, FaUsers, FaHandsHelping, FaUniversity, FaMobileAlt, FaQrcode, FaWrench, FaHeadset, FaFileAlt, FaPaperPlane, FaHeart } from 'react-icons/fa'; // FaHeart 追加
import { motion } from 'framer-motion';

const ForUniversitiesPage: React.FC = () => {
  const serviceName = "学内図書シェア";

  // ★★★ 寄付ページのURLを設定してください ★★★
  const donationPlatformUrl = "https://example.com/your-donation-link"; // 例: Ko-fi, PayPal, Stripeなど

  return (
    <>
      <Head>
        <title>{serviceName} ご導入検討の大学・専門学校様へ</title>
        <meta name="description" content={`${serviceName}は、学生の教科書代負担を軽減し、キャンパスのサステナビリティを推進する図書共有プラットフォームです。簡単導入、基本無料で始められます。`} />
      </Head>

      <div className={styles.pageContainer}>
        {/* --- ヒーローセクション (変更なし) --- */}
        <section className={styles.hero}>
          {/* ... */}
           <Link href="/contact" passHref>
             <motion.a className={styles.heroCtaButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <FaPaperPlane /> 導入に関するお問い合わせ・資料請求
             </motion.a>
          </Link>
        </section>

        {/* --- 課題提起セクション (変更なし) --- */}
        <section className={styles.section}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.sectionTitle}>教科書、眠っていませんか？ 学生と大学が抱える課題</h2>
             {/* ... */}
          </div>
        </section>

         {/* --- ソリューション紹介 (変更なし) --- */}
        <section className={styles.sectionAlternate}>
          <div className={styles.contentWrapper}>
             <h2 className={styles.sectionTitle}>「{serviceName}」がその課題を解決します</h2>
              {/* ... */}
          </div>
        </section>

        {/* --- 大学にとってのメリット (変更なし) --- */}
        <section className={styles.section}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.sectionTitle}>貴学にもたらされるメリット</h2>
            {/* CSS側で2列 -> 1列になります */}
            <div className={styles.benefitsGrid}>
              <motion.div className={styles.benefitCard} whileHover={{ y: -5 }}> <FaGraduationCap className={styles.benefitIcon} /> <div className={styles.benefitContent}><h3>学生の経済的負担軽減</h3><p>高価な教科書を無料で入手できる機会を提供し、学生の経済的負担を直接的に軽減します。</p></div> </motion.div>
              <motion.div className={styles.benefitCard} whileHover={{ y: -5 }}> <FaLeaf className={styles.benefitIcon} /> <div className={styles.benefitContent}><h3>サステナビリティ推進 (SDGs貢献)</h3><p>教科書の再利用を促進し、廃棄物削減に貢献。SDGs目標達成に向けた具体的な取り組みとなります。</p></div> </motion.div>
              <motion.div className={styles.benefitCard} whileHover={{ y: -5 }}> <FaUsers className={styles.benefitIcon} /> <div className={styles.benefitContent}><h3>学内コミュニティ活性化</h3><p>学生同士の助け合いを生み出し、キャンパス内の交流と共助の精神を育みます。</p></div> </motion.div>
              <motion.div className={styles.benefitCard} whileHover={{ y: -5 }}> <FaHandsHelping className={styles.benefitIcon} /> <div className={styles.benefitContent}><h3>導入・運用の手軽さ</h3><p>必要なのは本棚スペースのみ。アプリの管理やサーバー運用は当組織が行います（基本プラン）。</p></div> </motion.div>
            </div>
          </div>
        </section>

        {/* --- 価格・導入プラン (オプション削除) --- */}
        <section className={styles.sectionAlternate}>
            <div className={styles.contentWrapper}>
                <h2 className={styles.sectionTitle}>導入プラン・価格</h2>
                <p className={styles.problemText}> {/* problemTextクラス流用 or 専用クラス */}
                    多くの大学で気軽にご導入いただけるよう、基本機能を無料で提供しています。<br/>
                    サービスの維持・向上のため、皆様からのご支援をお願いしております。
                </p>
                <div className={styles.pricingTable}>
                    {/* 基本プランのみ表示 */}
                    <div className={styles.priceCard}>
                        <h3>基本プラン</h3>
                        <p className={styles.price}>¥0<span style={{fontSize: '1rem', fontWeight: 'normal'}}>/月</span></p>
                        <p>基本的な図書シェア機能</p>
                        <ul>
                            <li>書籍登録（ISBN/キーワード）</li>
                            <li>書籍検索</li>
                            <li>寄付・受け取り機能</li>
                            <li>基本サーバー運用・保守</li>
                        </ul>
                         <Link href="/contact" passHref>
                            <motion.a className={styles.heroCtaButton} style={{backgroundColor: 'var(--primary-color)', color: 'white'}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                無料導入について相談
                            </motion.a>
                         </Link>
                    </div>
                    {/* オプションプランのカードを削除 */}
                    {/* <div className={styles.priceCard}> ... </div> */}
                </div>
            </div>
        </section>

        {/* ================================= */}
        {/* ★★★ 新規追加: 寄付セクション ★★★ */}
        {/* ================================= */}
        <section className={styles.section}>
             <div className={styles.contentWrapper}>
                 <div className={styles.donationSection}>
                     <h3><FaHeart /> サービスへのご支援をお願いします</h3>
                     <p>
                         {serviceName} は、学生と大学の皆様により良いサービスを提供し続けるために、皆様からの温かいご支援を必要としています。いただいたご寄付は、サーバー維持費、機能改善、サポート体制の強化に活用させていただきます。
                     </p>
                     {/* 外部の寄付プラットフォームへのリンク */}
                     <a href={donationPlatformUrl} target="_blank" rel="noopener noreferrer" className={styles.donationButton}>
                         寄付で応援する
                     </a>
                 </div>
            </div>
        </section>
        {/* ================================= */}
        {/* ★★★ 追加ここまで ★★★ */}
        {/* ================================= */}


        {/* --- 導入ステップ & CTA (変更なし) --- */}
        <section className={styles.ctaSection}>
            {/* ... */}
             <Link href="/contact" passHref>
                <motion.a className={styles.heroCtaButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <FaPaperPlane /> 導入に関するお問い合わせ・資料請求
                </motion.a>
              </Link>
        </section>

      </div>
    </>
  );
};

export default ForUniversitiesPage;