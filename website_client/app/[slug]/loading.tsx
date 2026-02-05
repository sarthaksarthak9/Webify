// app/[slug]/loading.tsx
// Loading state while fetching data

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#1B243F] flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#4ADE80] mb-4"></div>
                <p className="text-white text-lg">Loading website...</p>
            </div>
        </div>
    );
}
