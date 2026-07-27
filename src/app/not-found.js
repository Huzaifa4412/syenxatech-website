import Link from "next/link";

export const metadata = {
    title: "Page Not Found | Syenxa Tech",
    description: "The page you are looking for does not exist.",
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-display text-8xl font-bold text-[#ff541f] mb-4">404</h1>
            <h2 className="font-display text-3xl font-bold mb-6">Page Not Found</h2>
            <p className="text-white/50 max-w-md mb-8">
                The page you are looking for might have been moved, renamed, or does not exist.
            </p>
            <Link
                href="/"
                className="px-8 py-4 bg-[#ff541f] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
                Return to Homepage
            </Link>
        </div>
    );
}
