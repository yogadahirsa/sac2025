'use client';

import { useEffect } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

export default function ScanPage() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA], // camera only
    });

    scanner.render(
      (decodedText) => {
        alert(`Scanned: ${decodedText}`);
        fetch('/api/checkin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: decodedText }),
        })
          .then(async (r) => {
            if (!r.ok) {
              const text = await r.text();
              throw new Error(`HTTP ${r.status}: ${text}`);
            }
            return r.json();
          })
          .then((res) => alert(res.message))
          .catch(console.error);

        scanner.clear();
      },
      (error) => console.warn('QR error:', error)
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">QR Code Scanner</h1>
      <div id="reader" className="w-80 h-80" />
    </div>
  );
}
