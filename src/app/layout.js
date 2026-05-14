import { Poppins, Urbanist, DM_Sans } from "next/font/google";
import "@/app/globals.css";
import "@n8n/chat/style.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BookCal from "@/components/book-calcom";
import PageTransitionProvider from "@/components/page-transition";
import Script from "next/script";
import Image from "next/image";
import FacebookPixel from "@/components/FacebookPixel";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/seo";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-poppins",
    display: "swap",
});

const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-urbanist",
    display: "swap",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-dmsans",
    display: "swap",
    adjustFontFallback: true,
});

export const metadata = {
    metadataBase: new URL(siteConfig.url),
    ...createMetadata({
        title: siteConfig.title,
        description: siteConfig.description,
        path: "/",
    }),
    keywords: [
        "Syenxa Tech AI Calling Agents",
        "Syenxa Tech AI Chatbots",
        "Syenxa Tech AI Automation",
        "Syenxa Tech Digital Marketing",
        "Syenxa Tech Website Development",
        "Syenxa Tech App Development",
        "AI Calling Agents by Syenxa Tech",
        "AI Voice Agents for Sales",
        "AI Customer Support Agents",
        "AI Appointment Booking Agents",
        "AI Chatbots for Businesses",
        "AI Automation Solutions",
        "Intelligent AI Sales Agents",
        "Website Development Company",
        "Mobile App Development Company",
        "Responsive Website Design",
        "SEO-Friendly Website Development",
        "Custom Web & App Solutions",
        "SEO Services",
        "Digital Marketing Agency",
        "Online Marketing Solutions",
        "AI Marketing Automation Services",
    ],
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
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
    icons: {
        icon: "/logo.svg",
        apple: "/Logo.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/logo.svg" />
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
            fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
                </Script>

                <noscript>
                    <Image
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
                        alt="meta-pixels"
                    />
                </noscript>
            </head>
            <body
                suppressHydrationWarning
                className={`${poppins.variable} ${urbanist.variable} ${dmSans.variable}`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfessionalService",
                            "@id": absoluteUrl("/#organization"),
                            name: siteConfig.name,
                            url: siteConfig.url,
                            logo: absoluteUrl("/logo.svg"),
                            image: absoluteUrl(siteConfig.ogImage),
                            contactPoint: {
                                "@type": "ContactPoint",
                                telephone: siteConfig.phone,
                                contactType: "customer service",
                                email: siteConfig.email,
                                areaServed: "Worldwide",
                                availableLanguage: "en",
                            },
                            sameAs: [
                                "https://www.linkedin.com/company/syenxatech",
                                "https://www.instagram.com/syenxatech",
                                "https://www.facebook.com/people/SyenxaTech/61584113090992/#",
                            ],
                            description:
                                siteConfig.description,
                            knowsAbout: [
                                "AI calling agents",
                                "AI chatbots",
                                "AI automation",
                                "website development",
                                "digital marketing",
                            ],
                        }),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "@id": absoluteUrl("/#website"),
                            name: siteConfig.name,
                            url: siteConfig.url,
                            publisher: {
                                "@id": absoluteUrl("/#organization"),
                            },
                            inLanguage: "en",
                        }),
                    }}
                />
                <FacebookPixel />
                <Navbar />
                <BookCal />
                <PageTransitionProvider
                    config={{
                        // Fast, smooth transitions
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
            </body>
        </html>
    );
}
