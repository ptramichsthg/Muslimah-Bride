import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeUp = (delay: number) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' as const, delay },
    },
});

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center bg-dark overflow-hidden pt-28"
        >
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212,168,67,0.3) 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }} />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 relative z-10">
                {/* Left — Text */}
                <div>
                    <motion.p
                        variants={fadeUp(0.1)}
                        initial="hidden"
                        animate="visible"
                        className="text-xs tracking-[0.4em] uppercase text-accent mb-6 font-body"
                    >
                        Luxury Muslim Bridal Boutique
                    </motion.p>

                    <motion.h1
                        variants={fadeUp(0.3)}
                        initial="hidden"
                        animate="visible"
                        className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.15] mb-8 font-bold"
                    >
                        Luxury Wedding
                        <br />
                        Abayas{' '}
                        <span className="italic text-accent">for</span>
                        <br />
                        Muslim Brides
                    </motion.h1>

                    <motion.div
                        variants={fadeUp(0.5)}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-8 mb-10"
                    >
                        <div className="text-center">
                            <span className="block font-heading text-3xl text-white font-bold">27</span>
                            <span className="text-xs tracking-widest uppercase text-white/50">Years Experience</span>
                        </div>
                        <div className="w-px h-12 bg-accent/30" />
                        <div className="text-center">
                            <span className="block font-heading text-3xl text-white font-bold">5,000+</span>
                            <span className="text-xs tracking-widest uppercase text-white/50">Trusted Brides</span>
                        </div>
                    </motion.div>

                    <motion.a
                        href="#contact"
                        variants={fadeUp(0.7)}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark text-sm tracking-widest uppercase font-semibold hover:bg-accent/90 transition-all duration-500 group rounded-lg"
                    >
                        Book Private Consultation
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </motion.a>
                </div>

                {/* Right — Bride Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                    className="relative flex justify-center lg:justify-end"
                >
                    {/* Decorative frame */}
                    <div className="absolute -top-4 -right-4 w-full h-full border border-accent/20 rounded-2xl hidden lg:block" />

                    <div className="relative w-full max-w-md lg:max-w-lg overflow-hidden rounded-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=600&h=820&fit=crop&q=80"
                            alt="Elegant Muslim bride wearing a luxury wedding abaya"
                            className="w-full h-[500px] sm:h-[580px] lg:h-[640px] object-cover"
                            loading="eager"
                        />
                        {/* Gradient overlay bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-dark to-transparent" />
                    </div>

                    {/* Floating badge */}
                    {/* Floating badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: -10 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                        className="absolute bottom-8 left-6 lg:-left-10 z-20 bg-white/95 backdrop-blur-xl p-5 shadow-2xl border border-white/40 rounded-2xl max-w-[280px] group cursor-pointer hover:scale-105 transition-transform duration-300"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <span className="inline-block px-2.5 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">New Arrival</span>
                                <h3 className="font-heading text-xl text-dark leading-tight mb-1">The Ivory Grace</h3>
                                <p className="text-xs text-muted font-medium">Exclusive 2026 Collection</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-dark transition-colors duration-300">
                                <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
