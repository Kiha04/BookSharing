// src/pages/findbook.tsx (修正後)

import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Form.module.css';
import { FaSearch, FaBook } from 'react-icons/fa';

// --- 型定義 (変更なし) ---
interface VolumeInfo {
  title?: string;
  authors?: string[];
  imageLinks?: { thumbnail?: string };
  industryIdentifiers?: { type: string; identifier: string }[];
}
interface BookItem {
  id: string; // Google Books APIのユニークID (key propで使用)
  volumeInfo: VolumeInfo;
}
interface GoogleBooksApiResponse {
  items?: BookItem[];
  totalItems?: number;
}

export default function FindBookPage() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchResults, setSearchResults] = useState<BookItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const router = useRouter();

  // searchBooks 関数 (変更なし)
  const searchBooks = async () => {
    if (!searchTitle && !searchAuthor) {
      setSearchError("タイトルまたは著者を入力してください。");
      return;
    }
    setIsLoading(true);
    setSearchError('');
    setSearchResults([]);

    let query = '';
    if (searchTitle) query += `intitle:${searchTitle}`;
    if (searchAuthor) query += `${query ? '+' : ''}inauthor:${searchAuthor}`;

    try {
      const res = await axios.get<GoogleBooksApiResponse>(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
      );
      if (res.data.items && res.data.items.length > 0) {
        setSearchResults(res.data.items);
      } else {
        setSearchError("書籍が見つかりませんでした。");
      }
    } catch (err) {
      console.error("📚 タイトル/著者検索エラー:", err);
      setSearchError("検索中にエラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  // ★★★ selectBookForDonation 関数を修正 ★★★
  const selectBookForDonation = (bookItem: BookItem) => {
    const bookInfo = bookItem.volumeInfo;
    if (!bookInfo) return;

    // ISBNを抽出
    const isbn13 = bookInfo.industryIdentifiers?.find(id => id.type === "ISBN_13")?.identifier;
    const isbn10 = bookInfo.industryIdentifiers?.find(id => id.type === "ISBN_10")?.identifier;
    // const isbnOther = bookInfo.industryIdentifiers?.find(id => id.type === "ISBN")?.identifier; // 必要なら
    const foundIsbn = isbn13 || isbn10 || ""; // 13桁を優先、なければ10桁

    // クエリパラメータを作成
    const queryParams = new URLSearchParams({
      title: bookInfo.title || "",
      author: bookInfo.authors?.[0] || "",
      isbn: foundIsbn, // ★★★ isbn をqueryParamsに含める ★★★
      thumbnail: bookInfo.imageLinks?.thumbnail || "",
    });

    // Donateページへリダイレクト
    router.push(`/donate?${queryParams.toString()}`);
  };

  return (
    <>
      <Head><title>キーワードで本を探す</title></Head>
      <div className={styles.container}>
        <h2 className={styles.formTitle}>キーワードで本を探す</h2>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--muted-text-color)' }}>
           ISBNが不明な場合、タイトルや著者名で検索して寄付したい本を見つけましょう。
        </p>
         {/* Google Booksへのリンクは不要な可能性があるのでコメントアウト（必要なら戻してください） */}
         {/* <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--muted-text-color)' }}>
             <br/><a href="https://books.google.co.jp/">ISBNがN/Aと表示される場合、この文章をタップしてISBNを取得してください。</a>
         </p> */}

        {/* --- 検索フォーム (変更なし) --- */}
        <div className={styles.formGroup}>
          <label htmlFor="search-title" className={styles.label}>タイトル</label>
          <input id="search-title" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} className={styles.input} placeholder="書籍のタイトルを入力" disabled={isLoading} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="search-author" className={styles.label}>著者</label>
          <input id="search-author" value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)} className={styles.input} placeholder="著者名を入力 (任意)" disabled={isLoading} />
        </div>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={searchBooks}
            className={`${styles.button} ${styles.buttonPrimary}`}
            disabled={isLoading || (!searchTitle && !searchAuthor)}
          >
            {isLoading ? '検索中...' : <><FaSearch /> タイトル/著者で検索</>}
          </button>
        </div>

        {/* --- エラー・ローディング表示 (変更なし) --- */}
        {searchError && <p className={styles.error} style={{ textAlign: 'center' }}>{searchError}</p>}
        {isLoading && <p className={styles.infoMessage}>検索中...</p>}

        {/* --- 検索結果表示 (keyの値を修正) --- */}
        {searchResults.length > 0 && (
          <div className={styles.resultsContainer}>
            <h3 className={styles.resultsTitle}>検索結果</h3>
            {searchResults.map((item) => {
              const isbn13 = item.volumeInfo.industryIdentifiers?.find(id => id.type === "ISBN_13")?.identifier;
              const isbn10 = item.volumeInfo.industryIdentifiers?.find(id => id.type === "ISBN_10")?.identifier;
              const displayIsbn = isbn13 || isbn10 || 'N/A';

              // ★★★ key には item.id (Google Books APIのID) を使用 ★★★
              // アプリ内で一意であればISBNでも可: key={displayIsbn !== 'N/A' ? displayIsbn : item.id}
              return (
                <div key={item.id} className={styles.searchResultItem}>
                  {item.volumeInfo.imageLinks?.thumbnail && (
                    <img src={item.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')} alt={item.volumeInfo.title} className={styles.resultThumbnail} />
                  )}
                  <div className={styles.resultDetails}>
                    <strong className={styles.bookTitle}>{item.volumeInfo.title}</strong>
                    <span className={styles.bookAuthor}>著者: {item.volumeInfo.authors?.join(', ') || 'N/A'}</span>
                    <span className={styles.bookMeta}>ISBN: {displayIsbn}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectBookForDonation(item)}
                    className={`${styles.button} ${styles.buttonDefault} ${styles.receiveItemButton}`}
                    title="この本の情報を寄付フォームに入力します"
                  >
                    <FaBook /> この本を選ぶ
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}