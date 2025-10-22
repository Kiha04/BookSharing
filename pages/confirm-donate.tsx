// src/pages/confirm-donate.tsx (新規作成)

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from '../styles/Form.module.css';
import { FaCheckCircle, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

// DonatePageから渡されるデータの型
type BookDonateData = {
  isbn?: string;
  title: string;
  author?: string;
  thumbnail?: string;
  // 'from' は不要になる
};

export default function ConfirmDonatePage() {
  const router = useRouter();
  const [book, setBook] = useState<BookDonateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [consentChecked, setConsentChecked] = useState(false); // 同意チェック用

  useEffect(() => {
    setError('');
    setConsentChecked(false);
    if (router.isReady && router.query.data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(router.query.data as string));
        // 'from' プロパティは不要なので、それ以外のデータでセット
        const { from, ...bookData } = decoded;
        setBook(bookData as BookDonateData);
        console.log("ConfirmDonatePage でデコードされたデータ:", bookData);
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
    // 同意チェックを確認
    if (!book || !consentChecked) {
      setError("所有権の放棄に同意してください。");
      return;
    }
    setIsLoading(true);
    setError('');
    console.log("Submitting donation data:", book);

    try {
      // バリデーション (ISBNとタイトルは必須)
      if (!book.isbn || !book.title) {
        throw new Error("登録にはISBNとタイトルが必要です。");
      }
      // /api/donate を呼び出す (bookオブジェクト全体を渡す)
      await axios.post("/api/donate", book);
      console.log("/api/donate successful");
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
      <h2 className={styles.formTitle}>📋 寄付内容の確認</h2>
      {book && (
        <div className={styles.confirmDetails}>
          {book.thumbnail && ( <img src={book.thumbnail.replace('http://', 'https://')} alt={book.title} className={styles.thumbnailPreview} style={{ marginBottom: '1rem' }} /> )}
          <p><strong>タイトル:</strong> {book.title}</p>
          {book.author && <p><strong>著者:</strong> {book.author}</p>}
          {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
          <p><strong>操作:</strong> 寄付する</p>
        </div>
      )}

      {/* 同意チェックボックス (常に表示) */}
      <div className={styles.consentCheckboxWrapper}>
        <input type="checkbox" id="ownershipConsent" checked={consentChecked} onChange={(e) => setConsentChecked(e.target.checked)} className={styles.consentCheckbox} />
        <label htmlFor="ownershipConsent" className={styles.consentLabel}>
          <FaExclamationTriangle style={{ marginRight: '0.3em', color: 'orange' }} />
          下記の文章を読み、同意する場合は同意ボタンを押し、寄付に進んでください。
          <br>同意しない場合はこのまま画面を閉じてください。
          <br>
          <br>
          ・私はこの教科書の所有権を放棄し、「学内図書シェア」プロジェクトを通じて他の学生に無償で提供されることに同意します。
          <br>
          ・また、一度寄付した本は返却されない事にも同意いたします。
        </label>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.buttonGroup}>
        <button type="button" onClick={() => router.back()} className={`${styles.button} ${styles.buttonSecondary}`} disabled={isLoading}> <FaArrowLeft /> 戻る </button>
        {/* 同意チェックが入っていないとボタンを押せない */}
        <button type="button" onClick={handleSubmit} className={`${styles.button} ${styles.buttonPrimary}`} disabled={isLoading || !book || !consentChecked}>
          {isLoading ? '処理中...' : <><FaCheckCircle /> 寄付を確定する</>}
        </button>
      </div>
    </div>
  );
}
