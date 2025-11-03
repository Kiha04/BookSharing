// pages/index.tsx (修正後)

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from '../styles/LandingPage.module.css';
// ★ FaUsers は使われていなかったため、インポートから削除
import { FaBookOpen, FaCamera, FaSearch, FaMapMarkerAlt, FaInfoCircle, FaRecycle, FaExchangeAlt } from 'react-icons/fa';
import ScrollToTopButton from "../components/ScrollToTopButton";

// ★ 1. 変数定義をコンポーネントの外（import文の後）に配置
// ★ 2. 各画像パスを文字列として引用符 ("") で囲む
const sampleBookImages = [
  "/images/book1.jpg",
  "/images/book2.jpg",
  "/images/book3.jpg",
  "/images/book4.jpg",
  "/images/book5.jpg",
  "/images/book6.jpg",
  "/images/book7.jpg",
  "/images/book8.jpg",
  "/images/book9.jpg",
  "/images/book10.jpg",
];

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState<'donate' | 'receive'>('donate');
  const footerRef = useRef<HTMLElement>(null);

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.landingPage}
    >
      <header className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            学内図書シェア <FaBookOpen className={styles.heroIcon}/>
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.tagline}
          >
            その教科書を、次の誰かへ。
          </motion.p>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={styles.description}
           >
             使わなくなった教科書を、必要としている他の学生へ。簡単・無料でシェアできる学内プラットフォームです。
          </motion.p>
          <div className={styles.ctaButtons}>
            <motion.a
              href="/donate"
              className={`${styles.ctaButton} ${styles.donateButton}`}
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <FaCamera /> 教科書を寄付する
            </motion.a>
            <motion.a
              href="/books"
              className={`${styles.ctaButton} ${styles.receiveButton}`}
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <FaSearch /> 教科書を探す
            </motion.a>
            <motion.a
              href="/receive"
              className={`${styles.ctaButton} ${styles.donateButton}`}
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <FaBookOpen /> 教科書をもらう
            </motion.a>
          </div>
        </div>
      </header>

      {/* ★ 3. スクロールセクションを return の中に移動 */}
      <section className={styles.scrollingImagesSection}>
        <div className={styles.scrollingImagesContainer}>
          <div className={styles.scrollingImagesTrack}>
            {[...sampleBookImages, ...sampleBookImages].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`教科書サンプル ${index % sampleBookImages.length + 1}`}
                className={styles.scrollingImage}
              />
            ))}
          </div>
        </div>
        <p className={styles.imageCaption}>
          ※画像はイメージです。実際に登録されている情報とは関係がありません。
        </p>
      </section>
      
      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>サービスの特徴</h2>
        <div className={styles.featuresGrid}>
          <motion.div className={styles.featureCard} whileHover={{ y: -5 }}>
            <FaCamera className={styles.featureIcon} />
            <h3><span className={styles.highlight}>カメラ</span>で簡単登録</h3>
            <p>カメラでISBNを読み取るだけ。書籍情報が自動で入力され、10秒で登録完了！</p>
          </motion.div>
          <motion.div className={styles.featureCard} whileHover={{ y: -5 }}>
            <FaSearch className={styles.featureIcon} />
            <h3><span className={styles.highlight}>すぐ見つかる</span>検索</h3>
            <p>タイトル・著者名・ISBNで簡単検索。リアルタイムで在庫状況も確認可能。</p>
          </motion.div>
          <motion.div className={styles.featureCard} whileHover={{ y: -5 }}>
            <FaExchangeAlt className={styles.featureIcon} />
            <h3><span className={styles.highlight}>手間なし</span>受け渡し</h3>
            <p>学内の専用本棚で自由に受け渡し。面倒な連絡や待ち合わせは不要。</p>
          </motion.div>
            <motion.div className={styles.featureCard} whileHover={{ y: -5 }}>
            <FaRecycle className={styles.featureIcon} />
            <h3><span className={styles.highlight}>無料 & エコ</span></h3>
            <p>教科書代を節約し、資源の再利用にも貢献。サステナブルな学生生活を。</p>
          </motion.div>
        </div>
      </section>

      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>使い方ガイド</h2>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'donate' ? styles.active : ''}`}
            onClick={() => setActiveTab('donate')}
          >
            <FaCamera /> 寄付したい人
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'receive' ? styles.active : ''}`}
            onClick={() => setActiveTab('receive')}
          >
            <FaBookOpen /> もらいたい人
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'donate' && (
            <motion.div key="donate" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{duration: 0.4}}>
              <h4>教科書を寄付する流れ</h4>
              <ol className={styles.stepList}>
                <li><span>Step 1:</span> 不要な教科書を指定の本棚に置く。</li>
                <li><span>Step 2:</span> このアプリで「教科書を寄付する」を選択。</li>
                <li><span>Step 3:</span> <FaCamera /> ISBN（バーコード）をカメラでスキャン（または手入力）。</li>
                <li><span>Step 4:</span> 自動入力された情報を確認し、「登録」ボタンを押す。</li>
                <li><span>Step 5:</span> 完了！あなたの教科書がリストに追加されます。</li>
              </ol>
               <p className={styles.note}><FaInfoCircle/> 登録後の修正・削除はできません。登録前に情報をよくご確認ください。</p>
            </motion.div>
          )}
          {activeTab === 'receive' && (
            <motion.div key="receive" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{duration: 0.4}}>
              <h4>教科書をもらう流れ</h4>
              <ol className={styles.stepList}>
              <p className={styles.subNote}>
                先に<a href="/books">オンライン検索</a>で在庫を確認するか、直接本棚へ行って欲しい本を探してもOK！
              </p>
                <li><span>Step 1:</span> このアプリで<a href="/books">「教科書を探す」</a>を選択し、欲しい本があるか検索。（任意）</li>
                <li><span>Step 2:</span> 欲しい本を見つけたら（または直接探しに行って）指定の本棚へ行く。</li>
                <li><span>Step 3:</span> 本棚から<strong className={styles.highlight}>実際に本を手に取る</strong>。</li>
                <li><span>Step 4:</span> このアプリの「<a href="/receive">本をもらう</a>」ページを開き、<strong className={styles.highlight}>手元の本のISBN</strong>（バーコード）で本を検索する。</li>
                <li><span>Step 5:</span> 該当の本が表示されたら「もらう」ボタンを押し、確認画面で「はい」を選択。</li>
                <li><span>Step 6:</span> 完了！システム上で受け取りが記録されます。（本をお持ち帰りしていただけます！）</li>
              </ol>
              <div className={styles.receivePageLink}>
                   <motion.a
                      href="/receive"
                      className={`${styles.ctaButton} ${styles.receiveAction}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBookOpen /> 本棚で本を見つけたら (もらうページへ)
                   </motion.a>
              </div>
              <p className={styles.note}><FaInfoCircle/> 必ず本を実際に手にとって確保してから「もらう」処理を行ってください。</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className={`${styles.sectionContainer} ${styles.locationSection}`}>
         <div className={styles.locationContent}>
            <h2 className={styles.sectionTitle}><FaMapMarkerAlt /> 本棚はここにあります</h2>
            <div className={styles.locationDetails}>
              <h3>学生会館SAKURAUM 2階エレベーターホール</h3>
              <p>エレベーターに向かってすぐ右側のスペースに設置しています。</p>
              <p>開館時間: 平日 8:00〜20:00 / 土曜日 8:00〜12:00　/　日曜祝日 休館</p>
              <p className={styles.note}>※SAKURAUMの開館時間に準じます。
              <br /><Link href="https://www.instagram.com/meio_sakuraum_/">最新の会館情報はこちら</Link></p>
            </div>
         </div>
      </section>
      

    </motion.div>
  );
};

export default LandingPage;
