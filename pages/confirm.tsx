//pages/confirm.tsx (受け取り専用)

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from '../styles/Form.module.css';
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";

// 受け取りに必要なデータ型
type BookReceiveData = {
  isbn?: string;
  title: string;
  author?: string;
  thumbnail?: string;
  // 'from' は不要
};

export default function ConfirmReceivePage() { // コンポーネント名を変更 (推奨)
  const router = useRouter();
  const [book, setBook] = useState<BookReceiveData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    if (router.isReady && router.query.data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(router.query.data as string));
        // 'from' を除外してセット
        const { from, ...bookData } = decoded;
        setBook(bookData as BookReceiveData);
        console.log("ConfirmReceivePage でデコードされたデータ:", bookData);
      } catch (e) {
        console.error("❌ Failed to parse query data:", e);
        setError("確認データの読み込みに失敗しました。");
        setBook(null);
      }
    } else if (router.isReady && !router.query.data) {
      setError("確認するデータが見つかりません。");
    }
  }, [router.isReady, router.query.data]);

  const handleSubmit = async () => {
    if (!book) {
      setError("確認データがありません。");
      return;
    }
    setIsLoading(true);
    setError('');
    console.log("Submitting receive data:", book);

    try {
      // ISBNのチェック
      if (!book.isbn || String(book.isbn).trim() === "") {
        throw new Error("受け取り処理に必要な本のISBNがありません。");
      }
      // /api/receive を呼び出す
      await axios.post("/api/receive", { isbn: book.isbn });
      console.log("/api/receive successful");
      router.push("/done"); // 完了ページへ

    } catch (err: any) {
      console.error("❌ Submit Error:", err);
      let displayError = "エラーが発生しました。";
      if (axios.isAxiosError(err)) {
        const apiErrorMessage = (err.response?.data as any)?.error || `サーバーエラー (ステータス: ${err.response?.status})`;
        displayError = apiErrorMessage;
      } else if (err instanceof Error) {
        displayError = err.message;
      }
      setError(`処理に失敗しました: ${displayError}`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX ---
  if (!router.isReady || (!book && !error)) { return <p className={styles.infoMessage}>読み込み中...</p>; }
  if (error && !book) { /* ... エラー表示 ... */ }

  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>📋 受け取り内容の確認</h2>
      {book && (
        <div className={styles.confirmDetails}>
          {book.thumbnail && ( <img src={book.thumbnail.replace('http://', 'https://')} alt={book.title} className={styles.thumbnailPreview} style={{ marginBottom: '1rem' }} /> )}
          <p><strong>タイトル:</strong> {book.title}</p>
          {book.author && <p><strong>著者:</strong> {book.author}</p>}
          {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
          <p><strong>操作:</strong> 受け取る</p>
        </div>
      )}

      {/* 同意チェックボックスは不要なので削除 */}

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.buttonGroup}>
        <button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonSecondary}`} disabled={isLoading}> <FaArrowLeft /> 戻る </button>
        {/* disabled条件から同意チェックを削除 */}
        <button type="button" onClick={handleSubmit} className={`${styles.button} ${styles.buttonPrimary}`} disabled={isLoading || !book}>
          {isLoading ? '処理中...' : <><FaCheckCircle /> 受け取りを確定する</>}
        </button>
      </div>
    </div>
  );
}
