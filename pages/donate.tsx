// pages/Donate.tsx
import React, { useState, useEffect } from "react";
import axios, { AxiosError, isAxiosError } from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import BarcodeScanner from "../components/BarcodeScanner";
import styles from "../styles/Form.module.css";
import { FaCamera, FaSearch } from "react-icons/fa";

interface VolumeInfo {
  title?: string;
  authors?: string[];
  imageLinks?: { thumbnail?: string };
  industryIdentifiers?: { type: string; identifier: string }[];
}

interface BookItem {
  id: string;
  volumeInfo: VolumeInfo;
}

interface GoogleBooksApiResponse {
  items?: BookItem[];
}

export default function DonatePage() {
  const router = useRouter();
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const { query } = router;
      let dataFound = false;

      if (query.title && typeof query.title === "string") {
        setTitle(query.title);
        dataFound = true;
      }
      if (query.author && typeof query.author === "string") {
        setAuthor(query.author);
        dataFound = true;
      }
      if (query.isbn && typeof query.isbn === "string") {
        setIsbn(query.isbn);
        dataFound = true;
      }
      if (query.thumbnail && typeof query.thumbnail === "string") {
        setThumbnail(query.thumbnail);
        dataFound = true;
      }

      if (dataFound) {
        router.replace("/donate", undefined, { shallow: true });
      }
    }
  }, [router.isReady, router.query]);

  const fetchBookInfoByIsbn = async () => {
    if (!isbn) return;
    setIsLoading(true);
    setSearchError("");
    try {
      const res = await axios.get<GoogleBooksApiResponse>(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );
      const bookInfo = res.data.items?.[0]?.volumeInfo;
      if (bookInfo) {
        populateFormFields(bookInfo);
      } else {
        setSearchError("ISBNで書籍情報が見つかりませんでした。");
        clearFormFields();
      }
    } catch (err: unknown) {
      console.error("📕 ISBN検索エラー:", err);
      let displayError = "ISBN検索中にエラーが発生しました。";

      if (isAxiosError(err)) { // ← ここで型が正しく判定される
        const axiosErr = err as AxiosError;
        if (axiosErr.response?.status === 429) {
          displayError = "リクエストが多すぎます。少し時間をおいてから再度お試しください。";
        } else {
          const apiErrorMessage = (axiosErr.response?.data as any)?.error || axiosErr.message;
          displayError = `検索エラー: ${apiErrorMessage}`;
        }
      } else if (err instanceof Error) {
        displayError = err.message;
      }

      setSearchError(displayError);
      clearFormFields();
    } finally {
      setIsLoading(false);
    }
  };

  const populateFormFields = (bookInfo: VolumeInfo) => {
    setTitle(bookInfo.title || "");
    setAuthor(bookInfo.authors?.[0] || "");
    setThumbnail(bookInfo.imageLinks?.thumbnail || "");
  };

  const clearFormFields = () => {
    setTitle("");
    setAuthor("");
    setThumbnail("");
  };

  const handleBarcodeDetected = (code: string) => {
    setIsbn(code);
    setShowScanner(false);
    (async () => {
      await fetchBookInfoByIsbn();
    })();
  };

  const handleSubmit = () => {
    if (!title) {
      alert("タイトルを入力してください。");
      return;
    }
    const data = { isbn, title, author, thumbnail, from: "donate" };
    const encoded = encodeURIComponent(JSON.stringify(data));
    router.push(`/confirm?data=${encoded}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>📤 本を寄付する</h2>

      <div className={styles.formGroup}>
        <label htmlFor="isbn-input" className={styles.label}>
          ISBN
        </label>
        <div className={styles.isbnInputGroup}>
          <input
            id="isbn-input"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="978から始まる数字を入力"
            className={styles.input}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowScanner(true)}
            className={`${styles.button} ${styles.buttonDefault} ${styles.barcodeButton}`}
            title="バーコードスキャナーを開く"
            disabled={isLoading}
          >
            <FaCamera />
          </button>
          <button
            type="button"
            onClick={fetchBookInfoByIsbn}
            className={`${styles.button} ${styles.buttonSecondary}`}
            disabled={isLoading || !isbn}
          >
            {isLoading ? "検索中..." : <><FaSearch /> ISBNで検索</>}
          </button>
        </div>
        <p className={styles.linkToFindBook}>
          ISBNが不明な場合は、
          <Link href="/findbook">こちらからタイトルや著者名で検索</Link>できます。
        </p>
        {searchError && <p className={styles.error}>{searchError}</p>}
      </div>

      {showScanner && (
        <div className={styles.formGroup}>
          <BarcodeScanner onDetected={handleBarcodeDetected} />
          <button
            type="button"
            onClick={() => setShowScanner(false)}
            className={`${styles.button} ${styles.buttonSecondary}`}
            style={{ marginTop: "0.5rem", width: "100%" }}
          >
            スキャナーを閉じる
          </button>
        </div>
      )}

      <hr className={styles.formSeparator} />

      <h3 className={styles.formSectionTitle}>登録する書籍情報</h3>
      {thumbnail && (
        <div className={`${styles.formGroup} ${styles.centeredContent}`}>
          <img
            src={thumbnail.replace("http://", "https://")}
            alt={title}
            className={styles.thumbnailPreview}
          />
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="title-input" className={styles.label}>
          題名 *
        </label>
        <input
          id="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="author-input" className={styles.label}>
          著者
        </label>
        <input
          id="author-input"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={handleSubmit}
          className={`${styles.button} ${styles.buttonPrimary}`}
          disabled={!title}
        >
          確認画面へ
        </button>
      </div>
    </div>
  );
}
