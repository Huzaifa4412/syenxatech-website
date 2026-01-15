"use client";
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Contact from "./form";
import BlurText from "./blurtext";

const SEOContentPage = ({ title, subtitle, content, keywords }) => {
    return (
        <div className="bg-[#010101] min-h-screen text-white">
            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <BlurText
                        text={title}
                        delay={100}
                        animateBy="words"
                        direction="top"
                        className="text-4xl flex items-center justify-center md:text-6xl font-bold text-white mb-4"
                    />
                    <p className="text-xl text-center text-(--primary-color) mt-2 font-medium">
                        {subtitle}
                    </p>
                </header>

                <article className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed">
                    {content}
                </article>

                {keywords && (
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">
                            Related Services
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {keywords.map((kw, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 border border-white/10"
                                >
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Contact />
        </div>
    );
};

export default SEOContentPage;
