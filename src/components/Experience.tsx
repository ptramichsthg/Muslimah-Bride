import { motion } from 'framer-motion';
import { CalendarHeart, Palette, Scissors, Package, ChevronRight } from 'lucide-react';

const steps = [
    {
        icon: CalendarHeart,
        step: '01',
        title: 'Consultation',
        description: 'Book a private session with our bridal stylist to discuss your vision and preferences.',
    },
    {
        icon: Palette,
        step: '02',
        title: 'Design',
        description: 'We craft a personalized design that honours your style, faith, and celebration.',
    },
    {
        icon: Scissors,
        step: '03',
        title: 'Tailoring',
        description: 'Expert artisans bring your design to life with meticulous handcrafted precision.',
    },
    {
        icon: Package,
        step: '04',
        title: 'Delivery',
        description: 'Your bridal piece is beautifully packaged and delivered with care to your doorstep.',
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.2 },
    }),
};

export default function Experience() {
    return (
        <section id="experience" className="relative py-24 md:py-32 bg-dark overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212,168,67,0.5) 1px, transparent 0)',
                backgroundSize: '48px 48px'
            }} />

            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-6"
                >
                    <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-semibold">How It Works</p>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white font-bold">
                        Your Bridal <span className="text-accent">Journey</span>
                    </h2>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-center text-white/50 max-w-xl mx-auto mb-20 text-sm sm:text-base"
                >
                    From your first consultation to the final delivery, we ensure a seamless and unforgettable experience.
                </motion.p>

                {/* Steps — horizontal timeline */}
                <div className="relative">
                    {/* Connector line (hidden on mobile) */}
                    <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {steps.map((item, i) => (
                            <motion.div
                                key={item.step}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-60px' }}
                                variants={fadeUp}
                                className="relative group"
                            >
                                {/* Card */}
                                <div className="relative bg-white/4 backdrop-blur-sm border border-white/8 rounded-2xl p-8 hover:bg-white/8 hover:border-accent/20 transition-all duration-500">
                                    {/* Step number & icon row */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-14 h-14 flex items-center justify-center bg-accent/10 rounded-2xl group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-500">
                                            <item.icon size={24} className="text-accent group-hover:text-dark transition-colors duration-500" />
                                        </div>
                                        <span className="font-heading text-4xl font-bold text-accent/15 group-hover:text-accent/30 transition-colors duration-500 select-none">
                                            {item.step}
                                        </span>
                                    </div>

                                    <h3 className="font-heading text-xl mb-3 text-white font-semibold">{item.title}</h3>
                                    <p className="text-sm text-white/45 leading-relaxed mb-4">
                                        {item.description}
                                    </p>

                                    {/* Learn more link */}
                                    <div className="flex items-center gap-1 text-accent text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <span>Learn more</span>
                                        <ChevronRight size={12} />
                                    </div>
                                </div>

                                {/* Connector dot (desktop) */}
                                <div className="hidden lg:flex absolute -top-[11px] left-1/2 -translate-x-1/2 w-6 h-6 items-center justify-center">
                                    <div className="w-3 h-3 bg-accent rounded-full shadow-lg shadow-accent/30" />
                                    <div className="absolute w-6 h-6 bg-accent/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark text-sm tracking-widest uppercase font-bold hover:bg-accent/90 transition-all duration-300 rounded-xl group"
                    >
                        Start Your Journey
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
