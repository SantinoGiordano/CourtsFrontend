'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error caught by error.tsx:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h1>
      <p className="mb-4">{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={reset}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Try Again
      </button>
    </div>
  );
}
