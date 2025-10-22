// src/components/AdBanner.tsx (Corrected)

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/AdBanner.module.css';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

// --- Type definition ---
type AdConfig = {
  id: string;
  type: 'image' | 'video';
  imageUrl?: string;
  videoUrl?: string;
  altText: string;
  linkUrl: string;
  isExternal: boolean;
  weight: number;
};

const ADS_CONFIG: AdConfig[] = [
  {
    id: 'ad001',
    type: 'image',
    imageUrl: '/images/ads/questionnaire.png', // public/images/ads/ に配置
    altText: 'アンケート',
    linkUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdaipBlZGv6E86lNmFGAtmsCmZg42aUy7cebj751LJwFYY_cw/viewform?usp=header',
    isExternal: false,
    weight: 3,
  },
  {
    id: 'ad002',
    type: 'image',
    imageUrl: '/images/ads/meiowelnavi-logo.png',
    altText: '名桜ウェルナビ',
    linkUrl: 'https://www.meio-u.ac.jp/welnavi/',
    isExternal: false,
    weight: 1,
  },
];
// --- End of ad settings ---


// Weighted selection function (no changes needed here)
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
  // ★★★ Ensure this useState line is INSIDE the AdBanner function ★★★
  const [selectedAd, setSelectedAd] = useState<AdConfig | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setSelectedAd(selectWeightedRandomAd(ADS_CONFIG));
  }, []); // Empty dependency array means this runs only once when the component mounts

  const toggleMute = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (videoRef.current) {
      const currentMuted = !videoRef.current.muted;
      videoRef.current.muted = currentMuted;
      setIsMuted(currentMuted);
    }
  };

  // ★ If no ad is selected, render nothing
  if (!selectedAd) {
    return null;
  }

  // --- Generate ad content (image or video) ---
  let adContentElement: JSX.Element | null = null;

  if (selectedAd.type === 'image' && selectedAd.imageUrl) {
    adContentElement = (
       <img
         src={selectedAd.imageUrl}
         alt={selectedAd.altText}
         className={styles.adBannerImage}
       />
    );
  } else if (selectedAd.type === 'video' && selectedAd.videoUrl) {
    adContentElement = (
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          src={selectedAd.videoUrl}
          className={styles.adVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          {selectedAd.altText || '動画広告'}
        </video>
        <button
          type="button"
          onClick={toggleMute}
          className={styles.muteButton}
          aria-label={isMuted ? "ミュート解除" : "ミュート"}
          title={isMuted ? "ミュート解除" : "ミュート"}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    );
  }

  // If content couldn't be generated, render nothing
  if (!adContentElement) {
     return null;
  }

  // ★ Render the wrapper, title, and the ad itself
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
