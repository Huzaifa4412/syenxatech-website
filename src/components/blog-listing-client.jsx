"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import { formatPostDate } from "@/lib/reading-time";
import { getBlogCategory, getBlogCover } from "@/lib/blog-presentation";
import "./blog-listing.css";

function PostMeta({ post }) {
    const date = formatPostDate(post.publishedAt);
    return (
        <p className="journal-meta">
            {date && <time dateTime={post.publishedAt}>{date}</time>}
            {date && post.readingTime && <span aria-hidden="true">·</span>}
            {post.readingTime && <span>{post.readingTime} min read</span>}
        </p>
    );
}

function PostImage({ post, featured = false }) {
    const cover = getBlogCover(post);
    const [failed, setFailed] = useState(false);
    const fallback = getBlogCover({ ...post, coverImage: null });
    return (
        <Image
            src={failed ? fallback.src : cover.src}
            alt={failed ? fallback.alt : cover.alt || post.title}
            fill
            priority={featured}
            sizes={featured
                ? "(max-width: 760px) 100vw, (max-width: 1200px) 60vw, 740px"
                : "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 400px"}
            onError={() => setFailed(true)}
        />
    );
}

function FeaturedPost({ post }) {
    return (
        <article className="journal-feature">
            <Link href={`/blog/${post.slug}`} className="journal-feature-link">
                <div className="journal-feature-image">
                    <PostImage post={post} featured />
                    <span className="journal-feature-badge">The featured read</span>
                    <span className="journal-image-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
                </div>
                <div className="journal-feature-copy">
                    <p className="journal-category">{getBlogCategory(post)}</p>
                    <h2>{post.title}</h2>
                    <p className="journal-description">{post.description}</p>
                    <PostMeta post={post} />
                    <span className="journal-read">Read the story <ArrowRight size={17} aria-hidden="true" /></span>
                </div>
            </Link>
        </article>
    );
}

function PostCard({ post }) {
    return (
        <li>
            <article className="journal-card">
                <Link href={`/blog/${post.slug}`} className="journal-card-link">
                    <div className="journal-card-image">
                        <PostImage post={post} />
                        <span className="journal-card-category">{getBlogCategory(post)}</span>
                        <span className="journal-card-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
                    </div>
                    <div className="journal-card-copy">
                        <PostMeta post={post} />
                        <h3>{post.title}</h3>
                        <p className="journal-description">{post.description}</p>
                        <span className="journal-read">Read article <ArrowRight size={16} aria-hidden="true" /></span>
                    </div>
                </Link>
            </article>
        </li>
    );
}

export default function BlogListingClient({ posts = [] }) {
    const [selectedCategory, setSelectedCategory] = useState("All articles");
    const [query, setQuery] = useState("");
    const categories = ["All articles", ...new Set(posts.map(getBlogCategory))];
    const searchTerm = query.trim().toLowerCase();
    const visiblePosts = posts.filter((post) => {
        const matchesCategory = selectedCategory === "All articles" || getBlogCategory(post) === selectedCategory;
        const content = [post.title, post.description, getBlogCategory(post), ...(post.keywords || [])].join(" ").toLowerCase();
        return matchesCategory && (!searchTerm || content.includes(searchTerm));
    });
    const filtering = selectedCategory !== "All articles" || Boolean(searchTerm);
    const featured = posts[0];
    const archive = filtering ? visiblePosts : posts.slice(1);

    function resetFilters() {
        setSelectedCategory("All articles");
        setQuery("");
    }

    return (
        <div className="site-page journal-page">
            <div className="journal-container">
                <header className="journal-header">
                    <div>
                        <p className="journal-eyebrow"><span aria-hidden="true" /> The Syenxa journal</p>
                        <h1>Ideas worth<br /><em>putting to work.</em></h1>
                    </div>
                    <div className="journal-intro">
                        <p>A little clarity for your next big move. Explore AI, better websites, and smarter ways to run your business.</p>
                        <a href="#articles" className="journal-explore">Explore the journal <ArrowRight size={17} aria-hidden="true" /></a>
                    </div>
                </header>

                {featured && <FeaturedPost post={featured} />}

                <section id="articles" className="journal-archive" aria-labelledby="journal-archive-title">
                    <div className="journal-archive-heading">
                        <div>
                            <p className="journal-eyebrow">Fresh perspectives. Practical advice.</p>
                            <h2 id="journal-archive-title">The reading room<span aria-hidden="true">.</span></h2>
                        </div>
                        <label className="journal-search">
                            <Search size={18} aria-hidden="true" />
                            <span className="sr-only">Search articles</span>
                            <input type="search" placeholder="Find something worth reading" value={query} onChange={(event) => setQuery(event.target.value)} />
                        </label>
                    </div>
                    <div className="journal-toolbar">
                        <div className="journal-filters" role="group" aria-label="Filter articles by topic">
                            {categories.map((category) => (
                                <button key={category} type="button" aria-pressed={selectedCategory === category} onClick={() => setSelectedCategory(category)}>{category}</button>
                            ))}
                        </div>
                        <p className="journal-count" role="status" aria-live="polite">{archive.length} {archive.length === 1 ? "article" : "articles"}{!filtering && featured ? " to explore" : " found"}</p>
                    </div>
                    {archive.length > 0 ? (
                        <ul className="journal-grid">{archive.map((post) => <PostCard key={post.slug} post={post} />)}</ul>
                    ) : (
                        <div className="journal-empty">
                            <h3>{posts.length ? "No articles found" : "Our first stories are on their way"}</h3>
                            <p>{posts.length ? "Try another topic or a different search." : "Explore the services behind the stories while we put the finishing touches on our journal."}</p>
                            {posts.length ? <button type="button" onClick={resetFilters}>Clear filters <X size={16} aria-hidden="true" /></button> : <Link href="/services">Explore services <ArrowRight size={16} aria-hidden="true" /></Link>}
                        </div>
                    )}
                </section>

                <aside className="journal-closing" aria-labelledby="journal-closing-title">
                    <div>
                        <p className="journal-eyebrow">From idea to everyday impact</p>
                        <h2 id="journal-closing-title">Your next chapter<br />starts with a conversation.</h2>
                    </div>
                    <div>
                        <p>Have something in mind? Let’s talk about what AI and a better digital experience could do for your business.</p>
                        <Link href="/contact" className="journal-contact">Talk to our team <ArrowUpRight size={18} aria-hidden="true" /></Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}
