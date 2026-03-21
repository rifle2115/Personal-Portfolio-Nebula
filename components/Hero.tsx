"use client";

import { motion } from "framer-motion";
import { Cloud, Sparkles } from "lucide-react";
import { SiPython } from "react-icons/si";
import { TbSql } from "react-icons/tb";
import Image from "next/image";
import { slideInRef, staggerContainer } from "../lib/motion";

export default function Hero() {
    const outerOrbitRadius = 180;


    return (
        <section className="relative w-full h-full flex items-center justify-center pt-24 px-6 border-b-0 border-transparent">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    variants={staggerContainer()}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-start text-left gap-4 z-10"
                >
                    {/* Badge - Removed as requested */}

                    {/* Headline */}
                    <motion.h1
                        variants={slideInRef(0.2)}
                        className="text-6xl md:text-[5.5rem] font-bold text-white tracking-tight leading-tight drop-shadow-lg"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8b4fe] via-[#c084fc] to-[#60a5fa]">Elvis Bibu</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={slideInRef(0.3)}
                        className="text-white/80 text-lg md:text-xl max-w-md leading-relaxed drop-shadow-md"
                    >
                        Machine Learning Engineer focused on building intelligent systems and scalable AI solutions.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={slideInRef(0.4)}>
                        <a
                            href="/Elvis_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 inline-block text-center"
                        >
                            Resume
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Content - Orbital Tech System */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative w-full aspect-square flex items-center justify-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-75 sm:scale-90 md:scale-100 mt-10 md:mt-0"
                >

                    {/* Central Profile Photo */}
                    <div className="absolute w-48 h-48 rounded-full z-20 shadow-[0_0_60px_rgba(168,85,247,0.6),0_0_120px_rgba(168,85,247,0.3)]">
                        <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <Image
                                    src="/profile.jpg"
                                    alt="Elvis Bibu"
                                    width={192}
                                    height={192}
                                    className="w-full h-full object-cover object-top"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Orbit Ring */}
                    <div className="absolute w-[360px] h-[360px] rounded-full border border-white/20 blur-[1px]" />

                    {/* Radial Lines representing Grid */}
                    <div className="absolute w-full h-[1px] bg-white/5 rotate-45" />
                    <div className="absolute w-full h-[1px] bg-white/5 -rotate-45" />

                    {/* Floating Icons Outer Orbit */}
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute w-[360px] h-[360px] z-10 opacity-60">
                        {[
                            { icon: <SiPython className="w-6 h-6" />, rot: 0 },
                            { icon: <TbSql className="w-6 h-6" />, rot: 72 },
                            { icon: <Cloud className="text-gray-300 w-6 h-6" />, rot: 144 },
                            { icon: <span className="text-gray-300 font-bold text-xs">ML</span>, rot: 216 },
                            { icon: <span className="text-gray-300 font-bold text-xs">AI</span>, rot: 288 },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="absolute flex items-center justify-center w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_15px_rgba(255,255,255,0.1)]"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    transform: `translate(-50%, -50%) rotate(${item.rot}deg) translateY(-${outerOrbitRadius}px) rotate(-${item.rot}deg)`,
                                }}
                            >
                                {/* Counter-rotate icon to keep upright */}
                                <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="text-gray-300">
                                    {item.icon}
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
