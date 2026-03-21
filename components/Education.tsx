"use client";

import { motion } from "framer-motion";
import { slideInRef } from "@/lib/motion";
import { GraduationCap } from "lucide-react";

const education = [
    {
        degree: "Primary and Secondary Education – ICSE",
        institution: "Sri Kumarans Children's Home • Bengaluru, India",
        year: "July 2021",
        grade: "10th Grade Percentage: 90%",
        description:
            "Established a strong academic foundation with a focus on analytical thinking, problem-solving, and an early inclination toward science and technology.",
    },
    {
        degree: "Higher Secondary Education – PU",
        institution: "Deeksha Center For Learning • Bengaluru, India",
        year: "March 2023",
        grade: "12th Grade Percentage: 94%",
        description:
            "Developed rigorous analytical and quantitative reasoning skills through advanced coursework in Physics, Chemistry, and Mathematics, laying the groundwork for a career in engineering.",
    },
    {
        degree: "B.E. in Artificial Intelligence and Data Science",
        institution: "B.M.S College of Engineering • Bengaluru, India",
        year: "Aug 2023 – Present",
        grade: "CGPA: 8.8 (Till 5th Semester)",
        description:
            "Pursuing a Bachelor's degree specializing in Artificial Intelligence and Data Science, with a curriculum centered on machine learning, deep learning, data analytics, and intelligent system design.",
    },
];

export default function Education() {
    return (
        <section
            id="education"
            className="py-24 px-6 border-t border-white/10 flex flex-col items-center"
        >
            <div className="w-full max-w-4xl">
                <motion.h2
                    className="text-4xl font-bold mb-14 text-center text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Educational Journey
                </motion.h2>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-purple-500/30 to-transparent hidden md:block" />

                    <div className="flex flex-col gap-16">
                        {education.map((edu, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    variants={slideInRef(index * 0.15)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    className={`relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                        } flex-col md:gap-10 gap-4`}
                                >
                                    {/* Card */}
                                    <div
                                        className={`w-full md:w-[45%] group bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]`}
                                    >
                                        {/* Year badge */}
                                        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-3">
                                            {edu.year}
                                        </span>

                                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 leading-tight">
                                            {edu.degree}
                                        </h3>

                                        <p className="text-sm text-purple-400/80 mt-1 font-medium">
                                            {edu.institution}
                                        </p>

                                        <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10 mt-2">
                                            {edu.grade}
                                        </span>

                                        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                            {edu.description}
                                        </p>
                                    </div>

                                    {/* Center node */}
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0a0a0a] border-2 border-purple-500/50 items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)] z-10">
                                        <GraduationCap className="w-4 h-4 text-purple-400" />
                                    </div>

                                    {/* Spacer for opposite side */}
                                    <div className="hidden md:block w-[45%]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section >
    );
}
