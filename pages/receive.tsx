// src/pages/receive.tsx (エラー修正後)

import { useState } from "react";
import axios from "axios";
import BarcodeScanner from "../components/BarcodeScanner";
import { useRouter } from "next/router";
import styles from '../styles/Form.module.css';
import { FaCamera, FaSearch } from "react-icons/fa";
import { useRef } from 'react';

type Book = {
  id: number;
  isbn: string;
  title: string;
  author: string;
  stock: number;
  thumbnail: string;
};

export default function ReceivePage() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [message, setMessage] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const router = useRouter();

  const searchBooks = async () => {
    setMessage("");
    setResults([]);
    if (!search) {
      setMessage("検索キーワードを入力してください。");
      return;
    }
    try {
      const res = await axios.get<Book[]>("/api/books", {
        params: { search },
      });

      // APIからの応答が配列であるかをチェック
      if (Array.isArray(res.data)) {
        if (res.data.length > 0) {
          setResults(res.data);
        } else {
          setMessage("📭 該当する本が見つかりませんでした。");
        }
      } else {
        // 配列でない場合は、エラーオブジェクトとして扱う
        console.error("API returned a non-array response:", res.data);
        setMessage("検索結果の取得に失敗しました。");
      }

    } catch (err) {
      console.error("検索エラー:", err);
      setMessage("エラーが発生しました");
    }
  };

  const handleBarcodeDetected = (code: string) => {
    setSearch(code);
    setShowScanner(false);
  };

  const handleConfirm = (book: Book) => {
    const dataToConfirm = {
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      thumbnail: book.thumbnail,
      from: "receive"
    };
    const encoded = encodeURIComponent(JSON.stringify(dataToConfirm));
    router.push(`/confirm?data=${encoded}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>📥 本をもらう</h2>
      <div className={styles.formGroup}>
        <label htmlFor="search-input" className={styles.label}>
          キーワード（ISBN・題名・著者など）
        </label>
        <div className={styles.searchInputGroup}>
          <input
            id="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
            placeholder="ISBN・題名・著者名で検索"
          />
          <button type="button" onClick={() => setShowScanner(true)} className={`${styles.button} ${styles.buttonDefault} ${styles.barcodeButton}`} title="バーコードをスキャン">
            <FaCamera />
          </button>
          <button type="button" onClick={searchBooks} className={`${styles.button} ${styles.buttonPrimary}`}>
            <FaSearch /> 検索
          </button>
        </div>
      </div>

      {showScanner && (
        <div className={styles.formGroup}>
          <BarcodeScanner onDetected={handleBarcodeDetected} />
          <button type="button" onClick={() => setShowScanner(false)} className={`${styles.button} ${styles.buttonSecondary}`} style={{ marginTop: '0.5rem', width: '100%' }}>
            スキャナーを閉じる
          </button>
        </div>
      )}

      {message && (
        <p className={message.includes("見つかりませんでした") ? styles.infoMessage : styles.error}>
          {message}
        </p>
      )}

      {results.length > 0 && (
        <div className={styles.resultsContainer}>
          <h3 className={styles.resultsTitle}>検索結果</h3>
          {results.map((book) => (
            <div key={book.id || book.isbn} className={styles.searchResultItem}>
              {book.thumbnail && (
                <img
                  src={book.thumbnail.replace('http://', 'https://')}
                  alt={`${book.title} の表紙`}
                  className={styles.resultThumbnail}
                />
              )}
              <div className={styles.resultDetails}>
                <p className={styles.bookisbn}>ISBN: {book.isbn}</p>
                <p className={styles.bookTitle}><strong>{book.title}</strong></p>
                <p className={styles.bookAuthor}>著者: {book.author}</p>
                <p className={styles.bookMeta}>在庫: {book.stock > 0 ? `${book.stock} 冊` : <span className={styles.stockUnavailable}>在庫なし</span>}</p>
              </div>
              {book.stock > 0 && (
                <button
                  type="button"
                  onClick={() => handleConfirm(book)}
                  className={`${styles.button} ${styles.buttonPrimary} ${styles.receiveItemButton}`}
                >
                  受け取る
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
