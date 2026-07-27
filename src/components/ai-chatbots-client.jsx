"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  Instagram,
  Video,
  ArrowRight,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

import { aiChatbotFaqs } from "@/lib/faqs";

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
  const isInView = useInView(containerRef, { amount: 0.3, margin: "0px" });
  const isEven = index % 2 === 0;

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full relative flex items-center justify-center bg-[#020202] border-b border-white/5 last:border-0 py-24 lg:py-0"
    >
      <div
        className={`absolute top-1/2 ${
          isEven ? "left-0" : "right-0"
        } -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[128px] pointer-events-none opacity-20`}
        style={{ backgroundColor: color }}
      />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full relative z-10 overflow-hidden lg:overflow-visible">
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
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              playsInline
              autoPlay
              loop
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

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

export default function AIChatbotsClient() {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <main className="min-h-screen w-full overflow-y-auto overflow-x-hidden bg-[#020202] text-white scroll-smooth">
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-white z-50 h-screen w-screen"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Hero Section */}
            <section className="min-h-screen w-full relative flex items-center justify-center bg-[#020202] border-b border-white/5 py-24 lg:py-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff541f]/10 rounded-full blur-[128px] pointer-events-none" />

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
                            Custom AI Chatbot Development
                        </span>
                        <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.9] tracking-tight text-white mb-8">
                            AI Chatbots <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                                For Omnichannel Sales & Support.
                            </span>
                        </h1>
                        <p className="font-body text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
                            Automate 24/7 customer service and lead capture across WhatsApp, Instagram DMs, Facebook Messenger, and custom web applications.
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
                platform="WhatsApp AI Automation"
                title="Automate 90% of Customer Support."
                description="Instant replies, order tracking, and seamless handoffs. Turn WhatsApp into your best support and sales channel."
                videoSrc="/videos/whatsapp.webm"
                icon={MessageCircle}
                color="#25D366"
            />

            <ChatbotSection
                index={1}
                platform="Instagram DM AI Chatbot"
                title="Turn DMs into Automated Revenue."
                description="Auto-reply to stories, comments, and DMs. Qualify leads instantly while you sleep."
                videoSrc="/videos/instagram.webm"
                icon={Instagram}
                color="#E1306C"
            />

            <ChatbotSection
                index={2}
                platform="TikTok DM Engagement"
                title="Viral Social Engagement on Autopilot."
                description="Manage thousands of comments and DMs instantly. Convert social viewers into paying customers."
                videoSrc="/videos/tiktok.webm"
                icon={Video}
                color="#00f2ea"
            />

            <ChatbotSection
                index={3}
                platform="Messenger Marketing AI"
                title="Retarget & Re-engage Buyers."
                description="Recover abandoned carts and broadcast targeted updates directly to your customers' phones."
                videoSrc="/videos/messanger.webm"
                icon={Send}
                color="#0084FF"
            />

            {/* Chatbot FAQ Section */}
            <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10 border-t border-white/10 bg-[#020202]">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full border border-white/10 bg-white/5 text-[#ff541f] text-xs font-mono tracking-widest uppercase mb-4">
                        <HelpCircle size={14} /> AI Chatbot FAQs
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                        Frequently Asked Questions About AI Chatbots
                    </h2>
                    <p className="text-white/50 text-base md:text-lg">
                        Learn how AI chatbot solutions automate customer support and boost lead conversion.
                    </p>
                </div>

                <div className="space-y-4">
                    {aiChatbotFaqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-colors hover:border-white/20"
                        >
                            <button
                                onClick={() => toggleFaq(idx)}
                                className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                            >
                                <span className="font-display font-semibold text-lg text-white">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    size={20}
                                    className={`text-[#ff541f] shrink-0 transition-transform duration-300 ${
                                        openFaq === idx ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openFaq === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-6 text-white/70 leading-relaxed font-body"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
