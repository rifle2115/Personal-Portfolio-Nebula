"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, Github, Linkedin, Menu, X } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import Link from "next/link";
import { slideInRef } from "../lib/motion";

const navLinks = [
    { name: "Projects", href: "/projects" },
    { name: "Education", href: "/education" },
    { name: "Certifications", href: "/certifications" },
    { name: "Contact Me", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={slideInRef(0.2)}
            className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[94%] sm:w-[90%] max-w-5xl z-50 rounded-2xl md:rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
                    <div className="p-1.5 rounded-full bg-primary/20 text-primary">
                        <Atom size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                    </div>
                    <span className="font-semibold text-white tracking-wide text-sm sm:text-base">Elvis Bibu</span>
                </Link>

                {/* Center Links (Desktop) */}
                <ul className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-sm text-gray-300 hover:text-white hover:text-shadow-glow transition-all duration-300"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Social Icons & Mobile Toggle */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="https://github.com/rifle2115" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300">
                            <Github size={18} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/elvis-punnachalil-38ba1432a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300">
                            <Linkedin size={18} />
                        </Link>
                        <Link href="https://leetcode.com/u/belvis2115/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300">
                            <SiLeetcode size={18} />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-gray-300 hover:text-white p-1.5 -mr-1.5 rounded-lg active:bg-white/10 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden border-t border-white/10"
                    >
                        <ul className="flex flex-col px-4 sm:px-6 py-3 sm:py-4 gap-1">
                            {navLinks.map((link, index) => (
                                <motion.li 
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-sm text-gray-300 hover:text-white active:text-purple-300 transition-colors py-3 px-3 rounded-lg active:bg-white/5"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                            {/* Socials in mobile menu */}
                            <div className="flex items-center gap-5 pt-3 mt-1 px-3 border-t border-white/10">
                                <Link href="https://github.com/rifle2115" target="_blank" className="text-gray-400 hover:text-white active:text-purple-300 p-2 -ml-2">
                                    <Github size={20} />
                                </Link>
                                <Link href="https://www.linkedin.com/in/elvis-punnachalil-38ba1432a/" target="_blank" className="text-gray-400 hover:text-white active:text-purple-300 p-2">
                                    <Linkedin size={20} />
                                </Link>
                                <Link href="https://leetcode.com/u/belvis2115/" target="_blank" className="text-gray-400 hover:text-white active:text-purple-300 p-2">
                                    <SiLeetcode size={20} />
                                </Link>
                            </div>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
