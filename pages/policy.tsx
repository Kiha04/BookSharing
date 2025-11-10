import React from 'react';
import Head from 'next/head';
import containerStyles from '../styles/Form.module.css';
import policyStyles from '../styles/Policy.module.css'; // 利用規約ページと同じスタイル

const TextbookPolicyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>教科書取り扱い方針 - 学内図書シェア</title>
      </Head>

      <div className={containerStyles.container}>
        <h2 className={policyStyles.policyTitle}>教科書取り扱い方針</h2>

        <p className={policyStyles.policyText}>
          「学内図書シェア」は、学生同士の助け合いと信頼に基づいた、善意のシェアリング・プロジェクトです。次に使う人が気持ちよく利用できるよう、教科書を寄付・利用する際には、以下の取り扱い方針にご協力をお願いいたします。
        </p>

        <h3 className={policyStyles.policySectionTitle}>1. 寄付できる教科書について</h3>
        <ul className={policyStyles.policyList}>
          <li>大学の講義で使用した「教科書」および「参考書」</li>
          <li>シラバスで指定されている書籍</li>
          <li>資格試験の参考書や問題集など、学習に関連する書籍</li>
          <li><strong>（本の状態）</strong>次に使う人が問題なく学習できる状態であること（多少の書き込みやマーカーは問題ありません）</li>
        </ul>

        <h3 className={policyStyles.policySectionTitle}>2. 寄付できない教科書について</h3>
        <p className={policyStyles.policyText}>
          本棚の品質を維持するため、以下の書籍は寄付をご遠慮ください。
        </p>
        <ul className={policyStyles.policyList}>
          <li>ページの欠損や、破れて読めない箇所がある深刻な破損・汚れがある本</li>
          <li>雑誌、漫画、小説などの娯楽目的の書籍</li>
          <li>海賊版やコピーされた教科書など、著作権を侵害するもの</li>
          <li>解答が完全に書き込まれてしまっている問題集</li>
          <li>内容が古く、現在の学習には明らかに不適切と思われる版の教科書</li>
        </ul>

        <h3 className={policyStyles.policySectionTitle}>3. 寄付された教科書の所有権について</h3>
        <p className={policyStyles.policyText}>
          本棚に<span className={policyStyles.textRed}>寄付された教科書の[所有権は放棄]されたもの</span>とみなします。一度寄付した本を<span className={policyStyles.textRed}>後から取り戻すことはできません。</span>
        </p>

        <h3 className={policyStyles.policySectionTitle}>4. 本棚の管理と本の廃棄について</h3>
        <ul className={policyStyles.policyList}>
          <li>運営チームは、本棚の環境を維持するために、定期的に整理整頓を行います。</li>
          <li>「2. 寄付できない教科書」に該当すると判断された書籍は、予告なく本棚から**撤去**する場合があります。</li>
          <li>非常に長期間利用されなかった書籍については、運営チームの判断で**リサイクル等の処分**を行う場合があります。</li>
        </ul>
        
        <h3 className={policyStyles.policySectionTitle}>5. 利用者の皆様へのお願い</h3>
        <ul className={policyStyles.policyList}>
          <li>教科書を寄付・受け取りする際は、必ず本アプリで正しい処理を行ってください。</li>
          <li>本棚はみんなの共有スペースです。次に使う人のことを考え、丁寧に扱ってください。</li>
        </ul>

        <h3 className={policyStyles.policySectionTitle}>6. プロジェクト終了後、学内で一切引き継ぎができない場合として、以下の手順を行います。 </h3>
        <ul className={policyStyles.policyList}>
　<br />1. 全ての学生が自由に持ち帰れるような譲渡会を開催
　<br />2. 図書館に寄贈
　<br />記1・2を行った上で、余った場合 
　<br />3. 専門業者への売却・寄付(利益が発生した場合は、大学へ寄付) 
　<br />4.資源としてリサイクル


      </div>
    </>
  );
};

export default TextbookPolicyPage;
