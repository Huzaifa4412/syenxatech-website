"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  MessageCircle,
  Send,
  Instagram,
  Video,
  ArrowRight,
  Play,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/button";

const ChatbotSection = ({
  platform,
  videoSrc,
  icon: Icon,
  color,
  index,
  title,
  description,
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  // Trigger animation earlier (0.3 instead of 0.6) for better responsiveness
  const isInView = useInView(containerRef, { amount: 0.3, margin: "0px" });

  const isEven = index % 2 === 0;

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full relative flex items-center justify-center bg-[#020202] border-b border-white/5 last:border-0 py-24 lg:py-0"
    >
      {/* Background Gradient Spot */}
      <div
        className={`absolute top-1/2 ${
          isEven ? "left-0" : "right-0"
        } -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[128px] pointer-events-none opacity-20`}
        style={{ backgroundColor: color }}
      />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full relative z-10 overflow-hidden lg:overflow-visible">
        {/* Text Content */}
        <div
          className={`order-2 ${
            isEven ? "lg:order-1" : "lg:order-2"
          } flex flex-col justify-center`}
        >
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isEven ? -50 : 50 }
            }
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                style={{ color: color }}
              >
                <Icon size={32} />
              </div>
              <span className="font-mono text-sm uppercase tracking-widest text-white/60">
                {platform}
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h2>

            <p className="font-body text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-[#ff541f] hover:text-white transition-all duration-300">
                  Get Started
                </button>
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300"
              >
                Book Demo
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Video/Visual Content */}
        <div
          className={`order-1 ${
            isEven ? "lg:order-2" : "lg:order-1"
          } h-[50vh] lg:h-[80vh] flex items-center justify-center`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="relative h-full w-auto aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black"
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              playsInline
              autoPlay
              loop
              className="w-full h-full object-cover"
            />

            {/* Play Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={
          isInView
            ? { height: "100px", opacity: 1 }
            : { height: "0px", opacity: 0.3 }
        }
        className={`absolute ${
          isEven ? "right-6" : "left-6"
        } top-1/2 -translate-y-1/2 w-1 bg-white/10 rounded-full hidden lg:block overflow-hidden`}
      >
        <motion.div
          layoutId="scroll-indicator"
          className="w-full bg-[#ff541f]"
          style={{ height: isInView ? "100%" : "0%" }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </section>
  );
};

export default function AIChatbotsPage() {
  return (
    <main className="min-h-screen w-full overflow-y-auto overflow-x-hidden bg-[#020202] text-white scroll-smooth">
      {/* Global Grain Texture - Fixed */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-white z-50 h-screen w-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Scroll Snap Section */}
      <section className="min-h-screen w-full relative flex items-center justify-center bg-[#020202] border-b border-white/5 py-24 lg:py-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff541f]/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
              Omnichannel AI
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.9] tracking-tight text-white mb-8">
              Be Everywhere <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                At Once.
              </span>
            </h1>
            <p className="font-body text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
              Engage customers on the platforms they love. Our AI chatbots
              automate 24/7 support and sales across WhatsApp, Instagram,
              TikTok, and Messenger.
            </p>

            <div className="flex justify-center">
              <div className="animate-bounce text-white/20">
                <ArrowRight className="rotate-90" size={32} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ChatbotSection
        index={0}
        platform="WhatsApp Automation"
        title="Automate 90% of Customer Support."
        description="Instant replies, order tracking, and seamless handoffs. Turn WhatsApp into your best support agent."
        videoSrc="/videos/whatsapp.webm"
        icon={MessageCircle}
        color="#25D366" // WhatsApp Green
      />

      <ChatbotSection
        index={1}
        platform="Instagram DM AI"
        title="Turn DMs into Revenue."
        description="Auto-reply to stories, comments, and DMs. Qualify leads instantly while you sleep."
        videoSrc="/videos/instagram.webm"
        icon={Instagram}
        color="#E1306C" // Insta Pink
      />

      <ChatbotSection
        index={2}
        platform="TikTok Conversion"
        title="Viral Engagement on Autopilot."
        description="Manage thousands of comments and DMs instantly. Convert viewers into customers without lifting a finger."
        videoSrc="/videos/tiktok.webm"
        icon={Video}
        color="#00f2ea" // TikTok Teal
      />

      <ChatbotSection
        index={3}
        platform="Messenger Marketing"
        title="Retarget & Re-engage."
        description="Recover abandoned carts and broadcast updates directly to your customers' pockets."
        videoSrc="/videos/messanger.webm" // Note: Filename typo maintained as per existing file
        icon={Send}
        color="#0084FF" // Messenger Blue
      />
    </main>
  );
}
