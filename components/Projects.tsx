import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

type Project = {
    title: string;
    description: string;
    tech: string[];
    image: string;
    link: string;
    linkType: "live" | "code";
};

const projects: Project[] = [
    // ── Top row ──────────────────────────────────────────────
    {
        title: "RepoCompass",
        description:
            "Codebase Understanding Platform — a full-stack web app that analyzes public GitHub repositories, ranks important files, explains the codebase using LLMs, and visualizes project structure through an interactive 3D code city and built-in code browser.",
        tech: ["TypeScript", "React", "Vite", "three.js / 3d-force-graph", "Google Gemini", "GitHub REST API", "Vercel Serverless", "highlight.js", "PageRank/centrality"],
        image: "/project-repocompass.png",
        link: "https://repocompass.vercel.app/",
        linkType: "live",
    },
    {
        title: "TokenOptimizer",
        description:
            "A Claude Code plugin that uses Groq to analyze prompt complexity and automatically route tasks to the most cost-effective Claude model (Haiku, Sonnet, or Opus), reducing costs while maintaining performance. Includes interactive, CLI, and advisory modes.",
        tech: ["Python (stdlib only)", "Groq API", "Llama-3.3-70B", "Anthropic Claude CLI", "Claude Code plugin hooks", "ANSI/truecolor TUI", "Regex/text processing"],
        image: "/project-tokenoptimizer.png",
        link: "https://github.com/rifle2115/TokenOptimization",
        linkType: "code",
    },
    // ── Bottom row ───────────────────────────────────────────
    {
        title: "CrashLens",
        description:
            "AI Crash & Log Intelligence Platform — a full-stack web app that ingests raw application logs and stack traces, parses and classifies errors, and uses an LLM to explain root causes, surface recurring failure patterns, and visualize error metrics on a live dashboard.",
        tech: ["Python", "FastAPI", "Next.js / React", "TypeScript", "PostgreSQL", "SQLAlchemy", "Alembic", "Groq LLM API", "Docker", "Docker Compose"],
        image: "/project-crashlens.png",
        link: "https://crashlens-frontend.onrender.com/",
        linkType: "live",
    },
    {
        title: "Aegis AI",
        description:
            "Unified AI Decision Platform — a single Streamlit app that brings five AI/ML modules under one interface: document summarization, resume–JD relevance scoring, OMR auto-grading, hospital delay prediction, and deepfake spread analysis.",
        tech: ["Python", "Streamlit", "Flask", "NLP (embeddings)", "Scikit-learn", "TensorFlow/PyTorch", "OpenCV", "NetworkX", "Pandas"],
        image: "/project-aegis.png",
        link: "https://aegis-ai.streamlit.app/",
        linkType: "live",
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-12 sm:py-16 md:py-24 px-4 md:px-6 border-t border-white/10 flex flex-col items-center">
            <div className="w-full max-w-6xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-white">Projects</h2>

                {/* Mobile: vertical stack | Desktop: 2x2 grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-8">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] active:border-purple-500/50 group flex flex-col"
                        >
                            {/* Project Image Preview */}
                            <div className="h-44 sm:h-48 md:h-48 overflow-hidden relative flex-shrink-0">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                {/* Live / Code badge */}
                                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-gray-200">
                                    {project.linkType === "code" ? (
                                        <Github className="w-3.5 h-3.5" />
                                    ) : (
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    )}
                                    {project.linkType === "code" ? "Code" : "Live"}
                                </div>
                            </div>

                            {/* Purple Separator Border */}
                            <div className="h-[2px] w-full bg-purple-600/80 shadow-[0_0_10px_rgba(147,51,234,0.5)]"></div>

                            {/* Content Details */}
                            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-400 mb-2 md:mb-3 drop-shadow-sm transition-colors duration-300 group-hover:text-purple-300 leading-tight">
                                    {project.title}
                                </h3>
                                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 md:mb-5 group-hover:text-gray-200 transition-colors flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                                    {project.tech.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-[10px] sm:text-xs text-gray-300 whitespace-nowrap transition-all duration-300 group-hover:border-purple-500/30"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors mt-auto">
                                    {project.linkType === "code" ? "View Code" : "Live Demo"}
                                    <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
