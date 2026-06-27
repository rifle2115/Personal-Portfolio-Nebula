"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "Elvis Bibu";

// SVG canvas dimensions used for the name reveal
const VB_W = 640;
const VB_H = 180;

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Let the name finish "drawing", then reveal the site.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3400);

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

    // Shared timing so the reveal mask and the traveling light stay in sync
    const drawDuration = 2.6;
    const drawDelay = 0.4;
    const sweep = {
        duration: drawDuration,
        delay: drawDelay,
        ease: "easeInOut" as const,
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
                >
                    <div className="relative w-[88%] max-w-[640px]">
                        <svg
                            viewBox={`0 0 ${VB_W} ${VB_H}`}
                            className="w-full h-auto overflow-visible"
                            role="img"
                            aria-label={`${NAME} — loading`}
                        >
                            <defs>
                                {/* Brand gradient — same as the hero "Elvis Bibu" */}
                                <linearGradient id="nameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#e8b4fe" />
                                    <stop offset="50%" stopColor="#c084fc" />
                                    <stop offset="100%" stopColor="#60a5fa" />
                                </linearGradient>

                                {/* Soft purple halo for the neon glow */}
                                <filter id="halo" x="-30%" y="-60%" width="160%" height="220%">
                                    <feGaussianBlur stdDeviation="6" />
                                </filter>

                                {/* White-hot glow for the traveling light head */}
                                <radialGradient id="lightGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                                    <stop offset="35%" stopColor="#d8b4fe" stopOpacity="0.7" />
                                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                                </radialGradient>

                                {/* Left-to-right reveal mask that "draws" the letters in order */}
                                <clipPath id="reveal">
                                    <motion.rect
                                        x={0}
                                        y={0}
                                        height={VB_H}
                                        initial={{ width: 0 }}
                                        animate={{ width: VB_W }}
                                        transition={sweep}
                                    />
                                </clipPath>
                            </defs>

                            {/* The name, revealed through the sweeping mask */}
                            <g clipPath="url(#reveal)">
                                {/* Purple halo layer */}
                                <text
                                    x={VB_W / 2}
                                    y={VB_H / 2}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fill="none"
                                    stroke="#a855f7"
                                    strokeWidth={5}
                                    filter="url(#halo)"
                                    opacity={0.85}
                                    style={{ fontFamily: "inherit", fontWeight: 800, fontSize: 82, letterSpacing: 2 }}
                                >
                                    {NAME}
                                </text>

                                {/* Bright gradient core */}
                                <text
                                    x={VB_W / 2}
                                    y={VB_H / 2}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fill="none"
                                    stroke="url(#nameGrad)"
                                    strokeWidth={2}
                                    strokeLinejoin="round"
                                    style={{ fontFamily: "inherit", fontWeight: 800, fontSize: 82, letterSpacing: 2 }}
                                >
                                    {NAME}
                                </text>
                            </g>

                            {/* Traveling light head — like the glow tracing the path in the reference */}
                            <motion.g
                                initial={{ x: 0, opacity: 0 }}
                                animate={{ x: VB_W, opacity: [0, 1, 1, 0] }}
                                transition={{
                                    x: sweep,
                                    opacity: { duration: drawDuration + 0.4, delay: drawDelay, times: [0, 0.06, 0.88, 1] },
                                }}
                            >
                                <ellipse cx={0} cy={VB_H / 2} rx={20} ry={60} fill="url(#lightGlow)" />
                                <rect
                                    x={-2}
                                    y={VB_H / 2 - 46}
                                    width={4}
                                    height={92}
                                    rx={2}
                                    fill="#ffffff"
                                    filter="url(#halo)"
                                />
                            </motion.g>
                        </svg>

                        {/* Subtle "Loading" cue beneath the name */}
                        <div className="flex items-center justify-center gap-1.5 mt-2">
                            <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-purple-300/60">
                                Loading
                            </span>
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={i}
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-1 h-1 rounded-full bg-purple-400/70"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
