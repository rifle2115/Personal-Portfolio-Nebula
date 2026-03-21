"use client";

import { motion } from "framer-motion";
import { staggerContainer, slideInRef } from "@/lib/motion";
import { ExternalLink } from "lucide-react";

const certifications = [
    {
        title: "Introduction to Generative AI Learning Path",
        issuer: "Google Cloud",
        verifyLink: "https://drive.google.com/file/d/1ydXDUvFKIo1GS7aVKc62rApbf-1-6XuB/view?usp=drive_link",
        year: "2025",
        description:
            "Completed a comprehensive specialization covering Generative AI, Large Language Models (LLMs), and Responsible AI principles, with practical insights into ethical AI deployment.",
        logo: (
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4285F4" />
                <path d="M2 17l10 5 10-5" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: "from-blue-500/20 to-green-500/20",
        borderColor: "hover:border-blue-400/50",
        glowColor: "hover:shadow-[0_0_30px_rgba(66,133,244,0.2)]",
    },
    {
        title: "Introduction to Cloud Computing",
        issuer: "IBM",
        verifyLink: "https://drive.google.com/file/d/1a3hHLJCw5ZCTnQsFhKz3Jc0ri4WbKOzx/view?usp=drive_link",
        year: "2025",
        description:
            "Gained foundational knowledge of cloud computing concepts, service models (IaaS, PaaS, SaaS), and modern cloud infrastructure through IBM's industry-recognized course.",
        logo: (
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                <rect x="3" y="4" width="18" height="3" rx="1" fill="#0F62FE" />
                <rect x="5" y="9" width="14" height="3" rx="1" fill="#0F62FE" />
                <rect x="3" y="14" width="18" height="3" rx="1" fill="#0F62FE" />
                <rect x="5" y="19" width="14" height="2" rx="1" fill="#0F62FE" />
            </svg>
        ),
        color: "from-blue-600/20 to-cyan-500/20",
        borderColor: "hover:border-cyan-400/50",
        glowColor: "hover:shadow-[0_0_30px_rgba(15,98,254,0.2)]",
    },
    {
        title: "Applied Machine Learning in Python",
        issuer: "University of Michigan",
        verifyLink: "https://drive.google.com/file/d/15XsR02SEbJcPCyQPQI9SFrQLvIT54PIc/view?usp=drive_link",
        year: "2025",
        description:
            "Developed practical machine learning skills including model evaluation, supervised learning techniques, and data-driven problem solving using Python.",
        logo: (
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#00274C" />
                <path d="M12 6l1.5 3.5L17 11l-3.5 1.5L12 16l-1.5-3.5L7 11l3.5-1.5L12 6z" fill="#FFCB05" />
            </svg>
        ),
        color: "from-yellow-500/20 to-blue-900/20",
        borderColor: "hover:border-yellow-400/50",
        glowColor: "hover:shadow-[0_0_30px_rgba(255,203,5,0.2)]",
    },
    {
        title: "Nutanix Hybrid Cloud Fundamentals (NHCF)",
        issuer: "Nutanix",
        verifyLink: "https://drive.google.com/file/d/1ibAcLpUOC4Y9Nptx0ep_1jmHOy0WXnVl/view?usp=drive_link",
        year: "2026",
        description:
            "Acquired core knowledge of hybrid cloud architecture, Nutanix HCI infrastructure, and multi-cloud management strategies for building scalable, resilient enterprise environments.",
        logo: (
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="#024DA1" />
                <polygon points="12,5 19,9 19,15 12,19 5,15 5,9" fill="#1A9FD9" />
                <path d="M8 14V10l4-2 4 2v4l-4 2-4-2z" fill="white" />
            </svg>
        ),
        color: "from-blue-600/20 to-sky-400/20",
        borderColor: "hover:border-sky-400/50",
        glowColor: "hover:shadow-[0_0_30px_rgba(26,159,217,0.2)]",
    },
];

export default function Certifications() {
    return (
        <section
            id="certifications"
            className="py-16 md:py-24 px-4 md:px-6 border-t border-white/10 flex flex-col items-center"
        >
            <div className="w-full max-w-4xl">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-8 md:mb-14 text-center text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Certifications
                </motion.h2>

                <motion.div
                    className="flex flex-col gap-5"
                    variants={staggerContainer(0.15, 0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            variants={slideInRef(index * 0.1)}
                            className={`group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 md:gap-5 transition-all duration-300 hover:-translate-y-0.5 ${cert.borderColor} ${cert.glowColor}`}
                        >
                            {/* Logo */}
                            <div
                                className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center border border-white/10`}
                            >
                                {cert.logo}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 text-center sm:text-left">
                                <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 leading-tight">
                                    {cert.title}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-0.5">
                                    {cert.issuer}{" "}
                                    <span className="text-white/20 mx-1 hidden sm:inline">•</span>{" "}
                                    <span className="block sm:inline">{cert.year}</span>
                                </p>
                                <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-1.5 leading-relaxed line-clamp-3 md:line-clamp-2">
                                    {cert.description}
                                </p>
                            </div>

                            {/* Verify Button */}
                            <a
                                href={cert.verifyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 mt-2 sm:mt-0 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400 transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-500/40 hover:text-purple-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                            >
                                Verify
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
