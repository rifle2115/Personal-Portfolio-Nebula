"use client";

import { motion } from "framer-motion";
import { Atom, Github, Linkedin } from "lucide-react";
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
    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={slideInRef(0.2)}
            className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 flex items-center justify-between px-6 py-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
                <div className="p-1.5 rounded-full bg-primary/20 text-primary">
                    <Atom size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                </div>
                <span className="font-semibold text-white tracking-wide">Elvis Bibu</span>
            </Link>

            {/* Center Links */}
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

            {/* Social Icons */}
            <div className="flex items-center gap-4">
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
        </motion.nav>
    );
}
