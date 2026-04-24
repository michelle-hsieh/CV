import React from 'react';

export default function DownloadButton() {
  const handlePrint = () => window.print();

  return (
    <button
      onClick={handlePrint}
      className="fixed top-6 right-6 z-50 px-5 py-2.5 bg-ink text-white rounded-full shadow-lg hover:bg-gray-800 transition-all text-sm font-medium print:hidden"
      aria-label="下載 PDF"
    >
      📥 下載 PDF
    </button>
  );
}
