"use client";
import React from "react";
import BlurText from "@/components/blurtext";
import Link from "next/link";
import { blogPosts } from "@/lib/seo";

const BlogListing = () => {
    return (
        <div className="bg-[#010101] min-h-screen text-white">
            <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
                <header className="mb-16 text-center">
                    <BlurText
                        text="Syenxa Tech Blog"
                        delay={100}
                        animateBy="words"
                        direction="top"
                        className="text-4xl md:text-7xl font-bold text-white mb-4"
                    />
                    <p className="text-xl text-(--primary-color) mt-2 font-medium">
                        Insights on AI, Automation & Digital Growth
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogPosts.map((post, index) => (
                        <Link
                            key={index}
                            href={`/blog/${post.slug}`}
                            className="glass-card p-8 rounded-2xl border border-white/10 hover:border-(--primary-color)/50 transition-all duration-300 group"
                        >
                            <h2 className="text-2xl font-bold mb-4 group-hover:text-(--primary-color) transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-white/60 mb-6 line-clamp-3">
                                {post.description}
                            </p>
                            <span className="text-(--primary-color) font-semibold flex items-center gap-2">
                                Read More
                                <span className="group-hover:translate-x-1 transition-transform">
                                    →
                                </span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogListing;
