import { motion } from 'framer-motion';
import { Heart, Sparkles, Shield, Award, Star } from 'lucide-react';

const values = [
    {
        icon: Heart,
        title: 'Crafted with Love',
        description: 'Every stitch reflects our dedication to providing brides with modest elegance and comfort on their special day.',
    },
    {
        icon: Sparkles,
        title: 'Premium Fabrics',
        description: 'We source only the finest materials — from soft silk chiffon to luxurious satin — ensuring lasting beauty.',
    },
    {
        icon: Shield,
        title: 'Modest by Design',
        description: 'Our collections honor the beauty of modesty, blending contemporary style with timeless Islamic elegance.',
    },
];

const stats = [
    { value: '27+', label: 'Years Experience' },
    { value: '5,000+', label: 'Happy Brides' },
    { value: '120+', label: 'Unique Designs' },
    { value: '4.9', label: 'Client Rating', icon: Star },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15 },
    }),
};

export default function About() {
    return (
        <section id="about" className="py-24 md:py-32 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Top — Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-24">
                    {/* Left — Image composition */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Main image */}
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://www.blog.shadiyana.pk/wp-content/uploads/2023/05/775bc35f74dcf3a0d5afb8e6d488c637-1.jpg.webp"
                                    alt="MuslimahBride craftsmanship"
                                    className="w-full h-[400px] sm:h-[480px] object-cover"
                                    loading="lazy"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-dark/40 via-transparent to-transparent" />
                            </div>

                            {/* Decorative accent border */}
                            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent/20 rounded-2xl hidden lg:block" />

                            {/* Floating stats badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="absolute -bottom-6 -right-6 lg:-right-8 bg-dark text-white px-6 py-5 rounded-2xl shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                                        <Award size={24} className="text-accent" />
                                    </div>
                                    <div>
                                        <p className="font-heading text-2xl font-bold leading-none">27+</p>
                                        <p className="text-xs text-white/60 mt-0.5">Years of Excellence</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right — Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-semibold">Our Story</p>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground font-bold leading-tight mb-6">
                            Where Modesty
                            <br />
                            Meets <span className="text-accent">Luxury</span>
                        </h2>
                        <div className="w-12 h-0.5 bg-accent rounded-full mb-8" />

                        <p className="text-muted text-base sm:text-lg leading-relaxed mb-6">
                            MuslimahBride was born from a passion for celebrating the beauty of Muslim brides.
                            We believe that modesty and luxury are not opposites — they are partners.
                        </p>
                        <p className="text-muted text-base sm:text-lg leading-relaxed mb-10">
                            Our handcrafted veils and bridal pieces are designed for women who
                            embrace grace, elegance, and faith. Each piece is a testament to meticulous
                            artistry and unwavering commitment to quality.
                        </p>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    className="text-center p-4 bg-card rounded-xl border border-border"
                                >
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="font-heading text-2xl font-bold text-foreground">{stat.value}</span>
                                        {stat.icon && <stat.icon size={14} className="text-accent fill-accent" />}
                                    </div>
                                    <span className="text-[11px] tracking-wide uppercase text-muted mt-1 block">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom — Value Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h3 className="font-heading text-2xl sm:text-3xl text-foreground font-bold">
                        Why Brides Choose <span className="text-accent">Us</span>
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((item, i) => (
                        <motion.div
                            key={item.title}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={fadeUp}
                            className="group relative p-8 bg-card rounded-2xl border border-border hover:border-accent/30 hover:shadow-xl transition-all duration-500 overflow-hidden"
                        >
                            {/* Subtle accent gradient on hover */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-accent/0 via-accent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="w-16 h-16 mb-6 flex items-center justify-center bg-accent/10 rounded-2xl group-hover:bg-accent group-hover:shadow-lg transition-all duration-500">
                                <item.icon size={26} className="text-accent group-hover:text-dark transition-colors duration-500" />
                            </div>
                            <h3 className="font-heading text-xl mb-3 text-foreground font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
