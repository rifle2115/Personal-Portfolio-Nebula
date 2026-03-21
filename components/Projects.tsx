import React from "react";
import Image from "next/image";

const projects = [
    {
        title: "Adventure Liability Form Summarization",
        description: "An AI-driven document summarization tool designed to extract and condense key information from complex liability forms. It automatically processes input text and generates concise summaries, saving time and improving readability.",
        tech: ["Python", "NLP (Custom summ.)", "Flask", "Streamlit/CLI", "Regex/Text processing"],
        image: "/project-liability-form.png",
    },
    {
        title: "Administrative Delay in Hospital Prediction",
        description: "A machine learning-based system to predict administrative delays in hospital workflows. The model analyzes structured healthcare operational data to forecast delays, helping optimize resource allocation and patient scheduling.",
        tech: ["Python", "Scikit-learn", "Pandas", "Data Visualization"],
        image: "/project-hospital-delay.png",
    },
    {
        title: "Resume Relevance Score Predictor",
        description: "An intelligent predictor that evaluates how well a resume matches a given job description. It uses natural language processing and semantic similarity techniques to score relevance, enabling automated resume ranking for applicant screening.",
        tech: ["Python", "NLP (embeddings)", "Text preprocessing", "JSON/CSV", "Flask/Streamlit"],
        image: "/project-resume-scorer.png",
    },
    {
        title: "OMR Scoring with Deep Learning",
        description: "An automated Optical Mark Recognition (OMR) scoring system that uses deep learning to detect and grade filled-in bubbles on answer sheets. Useful for test scoring automation, this project combines computer vision with ML pipelines.",
        tech: ["Python", "Deep Learning", "OpenCV", "TensorFlow/PyTorch", "Image preprocessing"],
        image: "/project-omr-scoring.png",
    },
    {
        title: "DeepFake Detection & Social Network Analysis",
        description: "A combined project exploring deepfake detection and social network graph analysis. It implements algorithms to identify fake multimedia content and analyzes information spread patterns using graph structures.",
        tech: ["Python", "Computer Vision", "Social Network Graphs", "NetworkX/Pandas", "Machine Learning"],
        image: "/project-deepfake.png",
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-16 md:py-24 px-4 md:px-6 border-t border-white/10 flex flex-col items-center">
            <div className="w-full max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-white">Projects</h2>

                {/* Police Tape Banner */}
                <div className="relative w-full mb-10 overflow-hidden">
                    <div className="relative -mx-6 -rotate-1">
                        <div className="w-[110%] -ml-[5%] py-2.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                            <div
                                className="overflow-hidden"
                                style={{
                                    backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 20px)",
                                }}
                            >
                                <div className="animate-[marquee_15s_linear_infinite] whitespace-nowrap py-0.5">
                                    <span className="text-black font-extrabold text-sm tracking-[0.3em] uppercase">
                                        ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠ VIEW ONLY ⚠&nbsp;&nbsp;&nbsp;&nbsp;
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] group">
                            {/* Project Image Preview */}
                            <div className="h-32 md:h-48 overflow-hidden relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            {/* Purple Separator Border */}
                            <div className="h-[2px] w-full bg-purple-600/80 shadow-[0_0_10px_rgba(147,51,234,0.5)]"></div>

                            {/* Content Details */}
                            <div className="p-4 md:p-6">
                                <h3 className="text-lg md:text-2xl font-bold text-purple-400 mb-2 md:mb-3 drop-shadow-sm transition-colors duration-300 group-hover:text-purple-300">{project.title}</h3>
                                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 group-hover:text-gray-200 transition-colors line-clamp-3 md:line-clamp-none">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, techIndex) => (
                                        <div key={techIndex} className="bg-white/5 border border-white/10 rounded-full px-2.5 py-1 md:px-3 md:py-1 flex items-center gap-1.5 text-[10px] md:text-xs text-gray-300 whitespace-nowrap transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/20 hover:text-purple-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] cursor-default">
                                            <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-400 group-hover/icon:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
