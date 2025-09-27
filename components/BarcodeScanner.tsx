// src/components/BarcodeScanner.tsx
import { useEffect, useRef } from "react";
import Quagga from "quagga";

interface BarcodeScannerProps {
  onDetected: (isbn: string) => void;
}

export default function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["ean_reader"], // ISBN13はEAN13形式
        },
      },
      (err: unknown) => {
        if (err) {
          console.error("Quagga init failed:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data:any) => {
      const code = data.codeResult.code;
      if (code) {
        Quagga.stop();
        onDetected(code);
      }
      
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div ref={scannerRef} style={{ width: "100%", height: "auto" }} />;
}
