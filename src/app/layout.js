import { Poppins, Urbanist, DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";
import "@n8n/chat/style.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BookCal from "@/components/book-calcom";
import PageTransitionProvider from "@/components/page-transition";
import Script from "next/script";
import FacebookPixel from "@/components/FacebookPixel";
import JsonLd from "@/components/JsonLd";
import {
    createMetadata,
    generateOrganizationSchema,
    generateWebSiteSchema,
    siteConfig,
} from "@/lib/seo";

/*
 * Only the weights actually used in the codebase are loaded
 * (light 300, regular 400, medium 500, semibold 600, bold 700).
 * Loading all nine weights plus italics shipped 54 font files per page.
 */
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
});

const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-urbanist",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["500", "600"],
    style: ["normal", "italic"],
    variable: "--font-playfair",
    display: "swap",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-dmsans",
    display: "swap",
    adjustFontFallback: true,
});

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const metadata = {
    metadataBase: new URL(siteConfig.url),
    ...createMetadata({
        title: siteConfig.title,
        description: siteConfig.description,
        path: "/",
    }),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    formatDetection: {
        telephone: true,
        email: true,
        address: false,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
};

export const viewport = {
    themeColor: "#faf9f7",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                suppressHydrationWarning
                className={`${poppins.variable} ${urbanist.variable} ${dmSans.variable} ${playfair.variable}`}
            >
                <JsonLd data={generateOrganizationSchema()} />
                <JsonLd data={generateWebSiteSchema()} />

                {FB_PIXEL_ID && (
                    <>
                        <Script id="facebook-pixel" strategy="afterInteractive">
                            {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');
`}
                        </Script>
                        <noscript>
                            {/* eslint-disable-next-line @next/next/no-img-element -- tracking pixel, not content */}
                            <img
                                height="1"
                                width="1"
                                style={{ display: "none" }}
                                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                                alt=""
                            />
                        </noscript>
                        <FacebookPixel />
                    </>
                )}

                <Navbar />
                <BookCal />
                <PageTransitionProvider
                    config={{
                        color: "var(--primary-color)",
                        direction: "right",
                        durationIn: 0.3,
                        holdDuration: 0.1,
                        durationOut: 0.3,
                        enabled: true,
                    }}
                >
                    {children}
                </PageTransitionProvider>
                <Footer />
                <Analytics />
            </body>
        </html>
    );
}
