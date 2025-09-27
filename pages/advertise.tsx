// src/pages/advertise.tsx (新規作成)

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Advertise.module.css'; // 専用CSSモジュール
import { FaBullhorn, FaUsers, FaUniversity, FaChartLine, FaHandPointer, FaRegThumbsUp, FaWrench, FaPaperPlane } from 'react-icons/fa'; // アイコン変更
import { motion } from 'framer-motion';

const AdvertisePage: React.FC = () => {
    const serviceName = "学内図書シェア"; // サービス名

  return (
    <>
      <Head>
        <title>{serviceName} 広告掲載のご案内 | 大学生へのダイレクトリーチ</title>
        <meta name="description" content={`「${serviceName}」で、特定の大学の学生に効果的にアプローチしませんか？学生支援とエコ活動に貢献するプラットフォームへの広告掲載をご検討ください。`} />
      </Head>

      <div className={styles.pageContainer}>
        {/* --- ヒーローセクション --- */}
        <section className={styles.hero}>
          <h1>貴社のメッセージを、未来を担う大学生へ。<br/>{serviceName} で効果的なアプローチを。</h1>
          <p>
            学内の教科書シェアを通じて、アクティブで知的好奇心の高い学生が利用するプラットフォーム。<br/>
            貴社のブランド認知度向上、商品・サービスのPR、採用活動に最適な広告掲載をご提案します。
          </p>
          <Link href="/contact?subject=広告掲載について" passHref> {/* お問い合わせ種別を渡す */}
             <motion.div className={styles.heroCtaButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <FaPaperPlane /> 広告掲載に関するお問い合わせ・資料請求
             </motion.div>
          </Link>
        </section>

        {/* --- なぜ大学生か？セクション --- */}
        <section className={styles.section}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.sectionTitle}>なぜ「大学生」にアプローチするのか？</h2>
             <p className={styles.sectionSubtitle}>
                大学生は、将来の主要な消費者であり、優秀な人材の宝庫です。<br/>
                早期にブランドやサービスに触れることで、長期的なファンや将来の従業員となる可能性があります。
             </p>
             {/* 必要なら具体的なデータを追加 */}
          </div>
        </section>

        {/* --- なぜ「学内図書シェア」か？ (メリット) --- */}
        <section className={styles.sectionAlternate}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.sectionTitle}>「{serviceName}」広告のメリット</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <FaUniversity className={styles.benefitIcon} />
                <div className={styles.benefitContent}>
                  <h3>特定大学への集中リーチ</h3>
                  <p>広告を掲載する大学を選択可能（※将来的な展望）。学生生活に密着したアプリ内で、効率的にターゲット層にアプローチできます。</p>
                </div>
              </div>
              <div className={styles.benefitCard}>
                <FaHandPointer className={styles.benefitIcon} />
                 <div className={styles.benefitContent}>
                    <h3>高いエンゲージメント</h3>
                    <p>教科書を探す・登録するという目的を持った学生が利用するため、広告への注目度も期待できます。</p>
                 </div>
              </div>
              <div className={styles.benefitCard}>
                <FaRegThumbsUp className={styles.benefitIcon} />
                 <div className={styles.benefitContent}>
                    <h3>ポジティブなブランド連想</h3>
                    <p>学生支援やエコ活動に貢献するサービスへの広告は、貴社のブランドイメージ向上に繋がります。</p>
                 </div>
              </div>
              <div className={styles.benefitCard}>
                <FaChartLine className={styles.benefitIcon} />
                 <div className={styles.benefitContent}>
                    <h3>費用対効果の高いプラン</h3>
                    <p>月額1万円から掲載可能。表示頻度はプランに応じて調整でき、無駄のない広告展開を実現します。</p>
                 </div>
              </div>
            </div>
             {/* 広告表示イメージ */}
             <div className={styles.adExample}>
                 <p>アプリ内（ホーム画面以外）フッター上部などに、このように広告が表示されます。</p>
                 {/* AdBannerコンポーネントの見た目を模倣 */}
                 <img src="/images/ads/ad-placeholder.png" alt="広告表示例" />
             </div>
          </div>
        </section>

        {/* --- 広告掲載プロセス --- */}
        <section className={styles.section}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.sectionTitle}>広告掲載までの簡単3ステップ</h2>
             <div className={styles.processSteps}>
                 <div className={styles.stepCard}>
                    <div className={styles.stepNumber}>1</div>
                    <h4>お問い合わせ・お申し込み</h4>
                    <p>専用フォームまたはメールにて、掲載希望の大学やご予算などをお知らせください。</p>
                 </div>
                  <div className={styles.stepCard}>
                    <div className={styles.stepNumber}>2</div>
                    <h4>広告素材の入稿</h4>
                    <p>指定された形式・サイズの広告画像（＋リンク先URL、代替テキスト）をご提出いただきます。</p>
                 </div>
                  <div className={styles.stepCard}>
                    <div className={styles.stepNumber}>3</div>
                    <h4>掲載開始</h4>
                    <p>素材確認後、設定したプランに応じてアプリ内での広告掲載を開始します。</p>
                 </div>
             </div>
          </div>
        </section>

        {/* --- 価格・プラン --- */}
        <section className={styles.sectionAlternate}>
            <div className={styles.contentWrapper}>
                <h2 className={styles.sectionTitle}>料金プラン</h2>
                <div className={styles.pricingDescription}>
                    <p>特定の大学の学生にターゲットを絞った、費用対効果の高いプランをご用意しています。</p>
                    <p className={styles.pricingHighlight}>1大学あたり 月額 10,000円〜</p>
                    <p>
                        基本料金をベースに、広告の表示頻度や掲載期間に応じて柔軟に対応いたします。<br/>
                        複数大学への掲載、長期契約による割引なども可能です。まずはお気軽にご相談ください。
                    </p>
                     <p className={styles.pricingNote}>
                        ※表示頻度は、同期間・同大学内での他の広告との兼ね合い（入札やプラン等）によって変動する可能性があります。<br/>
                        ※公序良俗に反するもの、学生に不利益を与える可能性のある広告等、内容によってはお断りする場合がございます。
                    </p>
                </div>
                 {/* 詳細な価格表は別途資料請求などで対応 */}
            </div>
        </section>

        {/* --- CTAセクション --- */}
        <section className={styles.ctaSection}>
             <h2>未来を担う学生層へ、今すぐアプローチ</h2>
             <p>
                {serviceName} への広告掲載は、貴社のブランド価値を高め、未来の顧客や人材との繋がりを築くための効果的な投資です。<br/>
                ご興味をお持ちいただけましたら、まずはお気軽にお問い合わせ・資料請求ください。
             </p>
              <Link href="/contact?subject=広告掲載について" passHref>
                <motion.div className={styles.heroCtaButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <FaPaperPlane /> 広告掲載に関するお問い合わせ・資料請求
                </motion.div>
              </Link>
        </section>

      </div>
    </>
  );
};

export default AdvertisePage;