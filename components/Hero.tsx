"use client";

import { motion } from "framer-motion";
import { Cloud, Sparkles } from "lucide-react";
import { SiPython } from "react-icons/si";
import { TbSql } from "react-icons/tb";
import Image from "next/image";
import { slideInRef, staggerContainer } from "../lib/motion";

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-16 px-6 border-b-0 border-transparent overflow-hidden">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    variants={staggerContainer()}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center text-center md:items-start md:text-left gap-4 md:gap-6 z-10 mt-8 md:mt-0"
                >
                    {/* Badge - Removed as requested */}

                    {/* Headline */}
                    <motion.h1
                        variants={slideInRef(0.2)}
                        className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold text-white tracking-tight leading-[1.1] drop-shadow-lg"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8b4fe] via-[#c084fc] to-[#60a5fa] block md:inline">Elvis Bibu</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={slideInRef(0.3)}
                        className="text-white/80 text-base sm:text-lg md:text-xl max-w-md leading-relaxed drop-shadow-md px-4 md:px-0"
                    >
                        Machine Learning Engineer focused on building intelligent systems and scalable AI solutions.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={slideInRef(0.4)}>
                        <a
                            href="/Elvis_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 md:mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 inline-block text-center"
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
                    className="relative w-full max-w-[300px] md:max-w-full aspect-square flex items-center justify-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] mx-auto mt-16 md:mt-0"
                >

                    {/* Central Profile Photo */}
                    <div className="absolute w-36 h-36 md:w-48 md:h-48 rounded-full z-20 shadow-[0_0_60px_rgba(168,85,247,0.6),0_0_120px_rgba(168,85,247,0.3)]">
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
                    <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-white/20 blur-[1px]" />

                    {/* Radial Lines representing Grid */}
                    <div className="absolute w-[280px] md:w-full h-[1px] bg-white/5 rotate-45" />
                    <div className="absolute w-[280px] md:w-full h-[1px] bg-white/5 -rotate-45" />

                    {/* Floating Icons Outer Orbit */}
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute w-full h-full md:w-[360px] md:h-[360px] z-10 opacity-60">
                        {[
                            { icon: <SiPython className="w-5 h-5 md:w-6 md:h-6" />, rot: 0 },
                            { icon: <TbSql className="w-5 h-5 md:w-6 md:h-6" />, rot: 72 },
                            { icon: <Cloud className="text-gray-300 w-5 h-5 md:w-6 md:h-6" />, rot: 144 },
                            { icon: <span className="text-gray-300 font-bold text-[10px] md:text-xs">ML</span>, rot: 216 },
                            { icon: <span className="text-gray-300 font-bold text-[10px] md:text-xs">AI</span>, rot: 288 },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="absolute flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_15px_rgba(255,255,255,0.1)]"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    transform: `translate(-50%, -50%) rotate(${item.rot}deg) translateY(calc(-1 * min(38vw, 180px))) rotate(-${item.rot}deg)`,
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
