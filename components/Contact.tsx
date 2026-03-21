"use client";

import { motion } from "framer-motion";
import { slideInRef } from "@/lib/motion";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
    return (
        <section
            id="contact"
            className="min-h-[60vh] py-24 px-6 flex items-center justify-center border-t border-white/10 w-full"
        >
            <div className="w-full max-w-lg">
                <motion.h2
                    className="text-4xl font-bold mb-4 text-center text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Contact Me
                </motion.h2>

                <motion.div
                    variants={slideInRef(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center"
                >
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                        I&apos;m open to new opportunities. Feel free to contact me via email or phone.
                    </p>

                    <div className="flex flex-col gap-4 w-full">
                        <a
                            href="mailto:Belvis2115@gmail.com"
                            className="flex items-center justify-center gap-4 bg-white/5 py-4 px-5 rounded-xl border border-white/10 transition-all duration-300 hover:bg-purple-500/10 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] group/email"
                        >
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30 group-hover/email:bg-purple-500/30 transition-colors">
                                <Mail className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-gray-200 font-medium text-sm">
                                Belvis2115@gmail.com
                            </span>
                        </a>

                        <a
                            href="tel:+919481807810"
                            className="flex items-center justify-center gap-4 bg-white/5 py-4 px-5 rounded-xl border border-white/10 transition-all duration-300 hover:bg-purple-500/10 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] group/phone"
                        >
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30 group-hover/phone:bg-purple-500/30 transition-colors">
                                <Phone className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-gray-200 font-medium text-sm">
                                +91 9481807810
                            </span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}