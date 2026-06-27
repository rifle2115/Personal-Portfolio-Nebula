"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "Elvis Bibu";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Let the Netflix-style intro play out, then reveal the site.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3200);

        return () => clearTimeout(timer);
    }, []);

    // Disable body scroll while loading
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05050f] overflow-hidden"
                >
                    {/* Soft cinematic glow behind the name */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[120px]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[90px]" />
                    </div>

                    {/* Netflix-style name reveal */}
                    <motion.div
                        className="relative z-10 px-4"
                        initial={{ opacity: 0, scale: 0.92, letterSpacing: "0.55em" }}
                        animate={{
                            opacity: [0, 1, 1, 1],
                            scale: [0.92, 1, 1, 1.22],
                            letterSpacing: ["0.55em", "0.04em", "0.04em", "0.08em"],
                        }}
                        transition={{
                            duration: 3.2,
                            times: [0, 0.3, 0.78, 1],
                            ease: ["easeOut", "linear", "easeIn"],
                        }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        {/* Base gradient text — matches the hero "Elvis Bibu" color */}
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#e8b4fe] via-[#c084fc] to-[#60a5fa] drop-shadow-[0_0_45px_rgba(168,85,247,0.45)] whitespace-nowrap text-center">
                            {NAME}
                        </h1>

                        {/* Light shimmer sweeping across the letters */}
                        <motion.h1
                            aria-hidden="true"
                            className="absolute inset-0 text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none text-transparent bg-clip-text whitespace-nowrap text-center"
                            style={{
                                backgroundImage:
                                    "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.85) 50%, transparent 65%)",
                                backgroundSize: "250% 100%",
                            }}
                            initial={{ backgroundPosition: "180% 0" }}
                            animate={{ backgroundPosition: ["180% 0", "-80% 0"] }}
                            transition={{
                                duration: 1.6,
                                delay: 0.5,
                                repeat: Infinity,
                                repeatDelay: 0.6,
                                ease: "easeInOut",
                            }}
                        >
                            {NAME}
                        </motion.h1>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
