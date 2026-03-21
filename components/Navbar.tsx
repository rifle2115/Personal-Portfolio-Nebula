"use client";

import { useState } from "react";
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

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={slideInRef(0.2)}
            className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-2xl md:rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
            <div className="flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
                    <div className="p-1.5 rounded-full bg-primary/20 text-primary">
                        <Atom size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                    </div>
                    <span className="font-semibold text-white tracking-wide">Elvis Bibu</span>
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
                <div className="flex items-center gap-4">
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
                        className="md:hidden text-gray-300 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                        className="md:hidden overflow-hidden border-t border-white/10"
                    >
                        <ul className="flex flex-col px-6 py-4 gap-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            {/* Socials in mobile menu */}
                            <div className="flex items-center gap-4 pt-4 mt-2 border-t border-white/10">
                                <Link href="https://github.com/rifle2115" target="_blank" className="text-gray-400 hover:text-white">
                                    <Github size={18} />
                                </Link>
                                <Link href="https://www.linkedin.com/in/elvis-punnachalil-38ba1432a/" target="_blank" className="text-gray-400 hover:text-white">
                                    <Linkedin size={18} />
                                </Link>
                                <Link href="https://leetcode.com/u/belvis2115/" target="_blank" className="text-gray-400 hover:text-white">
                                    <SiLeetcode size={18} />
                                </Link>
                            </div>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
