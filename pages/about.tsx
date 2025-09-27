// src/pages/about.tsx (新規作成)

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/About.module.css'; // Aboutページ専用スタイル
import containerStyles from '../styles/Form.module.css'; // コンテナスタイル流用
import { FaBuilding, FaUsers, FaHandshake, FaSeedling } from 'react-icons/fa'; // アイコン例

const AboutPage: React.FC = () => {
  // ★★★ 会社名や内容は適宜変更してください ★★★
  const companyName = "学内図書シェアプロジェクト";
  const foundedYear = 2025; // 例

  return (
    <>
      <Head>
        <title>会社概要 - {companyName}</title>
        <meta name="description" content={`${companyName}のミッション、ビジョン、事業内容についてご紹介します。`} />
      </Head>

      {/* Form.module.css の container を流用 */}
      <div className={containerStyles.container}>
         {/* Policy.module.css のタイトルスタイルを流用 or 専用スタイル */}
        <h2 className={styles.pageTitle}><FaBuilding /> 会社概要</h2>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>私たちのミッション</h3>
          <p className={styles.sectionText}>
            私たちは、教育リソースの共有を通じて、学生の経済的負担を軽減し、持続可能な社会の実現に貢献することを使命としています。「学内図書シェア」は、その第一歩となるサービスです。
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>ビジョン</h3>
          <p className={styles.sectionText}>
            学内の「もったいない」を価値に変え、学生・大学・社会全体にとって有益な循環を生み出すプラットフォームを構築し、教育分野におけるシェアリングエコノミーを推進します。将来的には、教科書だけでなく、様々な学用品やスキルの共有も視野に入れています。
          </p>
        </section>

         <section className={styles.section}>
            <h3 className={styles.sectionTitle}>大切にする価値観</h3>
            <div className={styles.valuesGrid}>
                <div className={styles.valueItem}>
                    <FaHandshake className={styles.valueIcon}/>
                    <h4>共助と信頼</h4>
                    <p>学生同士、大学、地域社会との信頼関係に基づいた助け合いの精神を大切にします。</p>
                </div>
                 <div className={styles.valueItem}>
                    <FaSeedling className={styles.valueIcon}/>
                    <h4>持続可能性</h4>
                    <p>資源の有効活用と環境負荷の低減を常に意識し、サステナブルな活動を推進します。</p>
                 </div>
                 <div className={styles.valueItem}>
                    <FaUsers className={styles.valueIcon}/>
                    <h4>利用者中心</h4>
                    <p>学生や大学関係者の皆様の声を真摯に受け止め、サービスの改善と向上に努めます。</p>
                 </div>
            </div>
         </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>会社情報</h3>
          <table className={styles.companyTable}>
            <tbody>
              <tr>
                <th>組織名</th>
                <td>{companyName}</td>
              </tr>
              <tr>
                <th>設立</th>
                <td>{foundedYear}年 (予定)</td>
              </tr>
              <tr>
                <th>所在地</th>
                <td>[ここに所在地を記入] (未定の場合は空欄または TBD)</td>
              </tr>
              <tr>
                <th>代表者</th>
                <td>[ここに代表者名を記入]</td>
              </tr>
              <tr>
                <th>事業内容</th>
                <td>教育関連プラットフォームの開発・運営、その他関連事業</td>
              </tr>
              <tr>
                 <th>お問い合わせ</th>
                 <td><Link href="/contact">お問い合わせフォーム</Link>よりご連絡ください</td>
              </tr>
            </tbody>
          </table>
        </section>

      </div>
    </>
  );
};

export default AboutPage;