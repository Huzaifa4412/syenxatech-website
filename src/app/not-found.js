import Link from "next/link";

export const metadata = {
    title: "Page Not Found | Syenxa Tech",
    description: "The page you are looking for does not exist.",
};

export default function NotFound() {
    return (
        <div className="site-page min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-display text-8xl font-bold text-[#ff541f] mb-4">404</h1>
            <h2 className="font-display text-3xl font-bold mb-6">We couldn't find that page.</h2>
            <p className="text-zinc-600 max-w-md mb-8">
                The page you are looking for might have been moved, renamed, or does not exist.
            </p>
            <Link
                href="/"
                className="px-8 py-4 bg-[#ff541f] text-white font-bold rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-300"
            >
                Return to Homepage
            </Link>
        </div>
    );
}
