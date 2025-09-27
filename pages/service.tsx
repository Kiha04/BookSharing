// src/pages/service.tsx (新規作成)

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
// 既存のスタイルを流用・組み合わせる
import containerStyles from '../styles/Form.module.css';
import policyStyles from '../styles/Policy.module.css'; // 見出し等に流用
import featureStyles from '../styles/LandingPage.module.css'; // 特徴カードスタイルを流用
import serviceStyles from '../styles/Service.module.css'; // サービスページ専用スタイル
import { FaMobileAlt, FaSearch, FaExchangeAlt, FaRecycle, FaGraduationCap, FaUniversity, FaLeaf, FaUsers } from 'react-icons/fa';

const ServicePage: React.FC = () => {
  const serviceName = "学内図書シェア";

  return (
    <>
      <Head>
        <title>サービス紹介 - {serviceName}</title>
        <meta name="description" content={`${serviceName}は、大学キャンパス内で教科書を簡単にシェアできるプラットフォームです。学生の負担を減らし、エコな活動を支援します。`} />
      </Head>

      <div className={containerStyles.container}>
        <h2 className={policyStyles.policyTitle}>サービス紹介</h2>

        <p className={serviceStyles.introText}>
          「{serviceName}」は、学内で不要になった教科書を必要としている学生へとつなぐ、シンプルで使いやすいウェブアプリケーションです。<br/>
          高価な教科書購入の負担を軽減し、資源の有効活用を促進することで、学生と大学、そして環境にとってもメリットのある仕組みを提供します。
        </p>

        {/* --- 主な機能 --- */}
        <section className={serviceStyles.section}>
          <h3 className={serviceStyles.sectionTitle}>主な機能</h3>
          <div className={featureStyles.featuresGrid}> {/* LandingPageのスタイルを流用 */}
            <div className={featureStyles.featureCard}>
              <FaMobileAlt className={featureStyles.featureIcon} />
              <h3>簡単登録</h3>
              <p>ISBNをカメラで読み取るか、タイトル等で検索して、不要な教科書をわずかなステップで登録・寄付できます。</p>
            </div>
            <div className={featureStyles.featureCard}>
              <FaSearch className={featureStyles.featureIcon} />
              <h3>書籍検索</h3>
              <p>キーワード（ISBN・タイトル・著者）で、現在シェアされている教科書を簡単に検索し、在庫を確認できます。</p>
            </div>
            <div className={featureStyles.featureCard}>
              <FaExchangeAlt className={featureStyles.featureIcon} />
              <h3>スムーズな受け渡し</h3>
              <p>学内に設置された専用本棚を介して、24時間いつでも非対面で教科書の受け渡しが可能です。</p>
            </div>
             <div className={featureStyles.featureCard}>
               <FaRecycle className={featureStyles.featureIcon} />
               <h3>匿名利用・無料</h3>
               <p>ユーザー登録は不要で、誰でも匿名かつ無料で利用できます。気軽にシェアリングに参加できます。</p>
             </div>
          </div>
        </section>

         {/* --- 利用イメージ --- */}
        <section className={serviceStyles.section}>
             <h3 className={serviceStyles.sectionTitle}>利用イメージ</h3>
              <div className={serviceStyles.screenshotArea}>
                 {/* ここにアプリのスクリーンショットや利用フロー図などを挿入 */}
                 <img src="/images/app-screenshot-placeholder.png" alt={`${serviceName} アプリ画面イメージ`} />
                 <p style={{marginTop: '1rem', fontSize:'0.9em', color:'var(--muted-text-color)'}}>（アプリ画面イメージ）</p>
              </div>
        </section>


        {/* --- 導入メリット --- */}
        <section className={serviceStyles.section}>
          <h3 className={serviceStyles.sectionTitle}>導入のメリット</h3>
          <div className={serviceStyles.benefitsList}> {/* グリッドでなくリスト形式も可 */}
             <div className={serviceStyles.benefitItem}>
                <FaGraduationCap className={serviceStyles.benefitIcon} />
                <div>
                    <h4>学生のために</h4>
                    <p>教科書費用の大幅な節約、必要な書籍へのアクセシビリティ向上に繋がります。</p>
                </div>
             </div>
              <div className={serviceStyles.benefitItem}>
                <FaUniversity className={serviceStyles.benefitIcon} />
                <div>
                    <h4>大学のために</h4>
                    <p>学生満足度の向上、SDGsへの貢献アピール、学内コミュニティ活性化を低コストで実現します。</p>
                </div>
             </div>
             <div className={serviceStyles.benefitItem}>
                <FaLeaf className={serviceStyles.benefitIcon} />
                <div>
                    <h4>環境のために</h4>
                    <p>教科書の廃棄を減らし、資源の再利用を促進することで、環境負荷の低減に貢献します。</p>
                </div>
             </div>
          </div>
        </section>

         {/* --- 次のステップ / 関連リンク --- */}
         <section className={`${serviceStyles.section} ${serviceStyles.ctaSection}`}>
             <h3 className={serviceStyles.sectionTitle}>さらに詳しく</h3>
             <p>
                {serviceName} の導入や広告掲載にご興味をお持ちいただけましたら、<br/>
                以下のページをご覧いただくか、お気軽にお問い合わせください。
             </p>
             <div className={serviceStyles.ctaGrid}>
                 {/* Form.module.css のボタンスタイルを流用 */}
                <Link href="/for-universities" passHref>
                    <button type="button" className={`${containerStyles.button} ${containerStyles.buttonPrimary}`}>大学・学校法人様へ</button>
                </Link>
                <Link href="/advertise" passHref>
                     <button type="button" className={`${containerStyles.button} ${containerStyles.buttonPrimary}`}>広告掲載をお考えの企業様へ</button>
                </Link>
                <Link href="/contact" passHref>
                    <button type="button" className={`${containerStyles.button} ${containerStyles.buttonSecondary}`}>お問い合わせ</button>
                </Link>
             </div>
         </section>

      </div>
    </>
  );
};

export default ServicePage;