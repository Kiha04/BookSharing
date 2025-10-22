//components/AdBanner.tsx

import React, { useState, useEffect } from 'react'; // useRef は不要に
import Link from 'next/link';
import styles from '../styles/AdBanner.module.css';
// FaVolumeMute, FaVolumeUp は不要に

// --- 型定義 (画像広告のみ) ---
type AdConfig = {
  id: string;
  imageUrl: string;
  altText: string;
  linkUrl: string;
  isExternal: boolean;
  weight: number;
};

// --- 広告設定 (画像のみ) ---
const ADS_CONFIG: AdConfig[] = [
  {
    id: 'ad001',
    imageUrl: '/images/ads/questionnaire.png', // public/images/ads/ に配置
    altText: 'アンケート',
    linkUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdaipBlZGv6E86lNmFGAtmsCmZg42aUy7cebj751LJwFYY_cw/viewform?usp=header',
    isExternal: true,
    weight: 3,
  },
  {
    id: 'ad002',
    imageUrl: '/images/ads/meiowelnavi-logo.png',
    altText: '名桜ウェルナビ',
    linkUrl: 'https://www.meio-u.ac.jp/welnavi/',
    isExternal: true,
    weight: 1,
  },
  // 必要に応じて他の画像広告を追加
];
// --- ここまで広告設定 ---

// 重み付け選択関数
const selectWeightedRandomAd = (ads: AdConfig[]): AdConfig | null => {
  const validAds = ads.filter(ad => ad.weight > 0);
  if (validAds.length === 0) return null;
  const totalWeight = validAds.reduce((sum, ad) => sum + ad.weight, 0);
  if (totalWeight <= 0) return validAds[Math.floor(Math.random() * validAds.length)];
  let randomNum = Math.random() * totalWeight;
  for (const ad of validAds) {
    if (randomNum < ad.weight) return ad;
    randomNum -= ad.weight;
  }
  return validAds[validAds.length - 1];
};

const AdBanner: React.FC = () => {
  const [selectedAd, setSelectedAd] = useState<AdConfig | null>(null);

  useEffect(() => {
    setSelectedAd(selectWeightedRandomAd(ADS_CONFIG));
  }, []);

  // 表示すべき広告がない場合は null を返す
  if (!selectedAd) {
    return null;
  }

  // --- 画像広告コンテンツを生成 ---
  const adContentElement = (
    <img
      src={selectedAd.imageUrl}
      alt={selectedAd.altText}
      className={styles.adBannerImage}
    />
  );

  // --- ラッパー、タイトル、広告本体を返す ---
  return (
    <div className={styles.adAreaWrapper}>
      <h3 className={styles.adAreaTitle}>協賛・サポーター</h3>
      <div className={styles.adBannerContainer}>
        {selectedAd.isExternal ? (
          <a href={selectedAd.linkUrl} target="_blank" rel="noopener noreferrer sponsored" className={styles.adBannerLink}>
            {adContentElement}
          </a>
        ) : (
          <Link href={selectedAd.linkUrl} className={styles.adBannerLink}>
            {adContentElement}
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdBanner;
