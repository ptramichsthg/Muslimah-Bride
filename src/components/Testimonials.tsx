import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah Al-Rashid',
        location: 'New York, NY',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&q=80',
        rating: 5,
        title: 'Exceeded all my expectations',
        text: 'The Ivory Grace veil was absolutely stunning. The craftsmanship is unmatched — every pearl was perfectly placed. I felt like royalty on my wedding day. The team was incredibly attentive from consultation to delivery.',
        product: 'The Ivory Grace',
        date: 'January 2026',
    },
    {
        name: 'Amina Hassan',
        location: 'Los Angeles, CA',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80',
        rating: 5,
        title: 'A dream come true',
        text: 'I was nervous about ordering online, but the virtual consultation put me at ease. The Golden Hour hijab arrived beautifully packaged and was even more gorgeous than the photos. I received so many compliments!',
        product: 'The Golden Hour',
        date: 'December 2025',
    },
    {
        name: 'Fatima Abboud',
        location: 'Chicago, IL',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80',
        rating: 5,
        title: 'Worth every penny',
        text: 'The Pearl Mist nikah set was the most beautiful bridal ensemble I\'ve ever seen. The attention to detail is remarkable. The entire set was perfectly coordinated and made my nikah ceremony absolutely magical.',
        product: 'The Pearl Mist',
        date: 'November 2025',
    },
    {
        name: 'Layla Mahmoud',
        location: 'Houston, TX',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80',
        rating: 5,
        title: 'Impeccable service and quality',
        text: 'From the first consultation to the final fitting, everything was perfect. The Silk Whisper veil is lightweight yet luxurious. MuslimahBride truly understands what modest brides are looking for.',
        product: 'The Silk Whisper',
        date: 'October 2025',
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((c) => (c + 1) % testimonials.length);

    return (
        <section className="py-24 md:py-32 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-semibold">Testimonials</p>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground font-bold">
                        Loved by <span className="text-accent">Brides</span>
                    </h2>
                </motion.div>

                {/* Testimonial card */}
                <div className="max-w-4xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.4 }}
                            className="bg-card rounded-2xl border border-border p-8 sm:p-12"
                        >
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                                {/* Left: quote */}
                                <div className="flex-1">
                                    <Quote size={36} className="text-accent/20 mb-4" />
                                    <h3 className="font-heading text-xl sm:text-2xl text-foreground font-bold mb-4">
                                        "{testimonials[current].title}"
                                    </h3>
                                    <p className="text-muted leading-relaxed mb-6">
                                        {testimonials[current].text}
                                    </p>
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonials[current].rating)].map((_, i) => (
                                            <Star key={i} size={16} className="text-accent fill-accent" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-accent font-semibold tracking-wider uppercase bg-accent/10 px-3 py-1.5 rounded-lg">
                                        Purchased: {testimonials[current].product}
                                    </span>
                                </div>

                                {/* Right: author */}
                                <div className="flex flex-row lg:flex-col items-center lg:items-center gap-4 lg:gap-3 lg:min-w-[160px] lg:justify-center">
                                    <img
                                        src={testimonials[current].avatar}
                                        alt={testimonials[current].name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-accent/20"
                                    />
                                    <div className="lg:text-center">
                                        <p className="font-heading text-lg text-foreground font-semibold">{testimonials[current].name}</p>
                                        <p className="text-sm text-muted">{testimonials[current].location}</p>
                                        <p className="text-xs text-muted/60 mt-1">{testimonials[current].date}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="w-12 h-12 flex items-center justify-center border border-border rounded-xl hover:border-accent/30 hover:text-accent text-muted transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-accent/40'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-12 h-12 flex items-center justify-center border border-border rounded-xl hover:border-accent/30 hover:text-accent text-muted transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
