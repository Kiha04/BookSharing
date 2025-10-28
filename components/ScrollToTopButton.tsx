// src/components/ScrollToTopButton.tsx (修正後)

import React, { useEffect, useState, RefObject } from "react";
import styles from '../styles/ScrollToTopButton.module.css';
import { FaArrowUp } from "react-icons/fa";

// ★ 1. コンポーネントが受け取るPropsの型を定義する
type Props = {
  // footerRef という名前で、HTMLElement または null を指す RefObject を受け取る
  footerRef: RefObject<HTMLElement | null>;
};

// ★ 2. コンポーネント定義で Props 型を使用し、引数から footerRef を受け取る
const ScrollToTopButton: React.FC<Props> = ({ footerRef }) => {
  const [visible, setVisible] = useState(false);
  const [bottomPosition, setBottomPosition] = useState("2rem");

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);

      // ★ 3. 受け取った footerRef を使用する (ここは元々正しいはず)
      if (footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const initialBottomRem = 2;
        const initialBottomPx = initialBottomRem * 16;

        if (footerTop < windowHeight) {
          const newBottom = windowHeight - footerTop + initialBottomPx;
          setBottomPosition(`${newBottom}px`);
        } else {
          setBottomPosition(`${initialBottomRem}rem`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [footerRef]); // 依存配列に footerRef を追加

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={styles.scrollToTop}
      style={{ bottom: bottomPosition }}
      title="トップに戻る"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
