// app/[slug]/error.tsx
// Error handling for dynamic pages
'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen bg-[#1B243F] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <h1 className="text-6xl font-bold text-[#4ADE80] mb-4">404</h1>
                <h2 className="text-2xl font-bold text-white mb-4">Website Not Found</h2>
                <p className="text-gray-400 mb-8">
                    {error.message || "The website you're looking for doesn't exist."}
                </p>
                <button
                    onClick={reset}
                    className="px-6 py-3 bg-[#4ADE80] text-[#1B243F] rounded-full font-bold hover:brightness-110 transition-all"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
