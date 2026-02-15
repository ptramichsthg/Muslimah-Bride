import { motion } from 'framer-motion';
import { Diamond } from 'lucide-react';

const brands = [
    'Silk Chiffon', 'Handcrafted', 'Premium Satin', 'Custom Designs',
    'Made in USA', 'Modest Luxury', 'Free Consultation', 'Worldwide Shipping',
];

export default function PromoBanner() {
    return (
        <section className="bg-dark border-y border-white/5 py-5 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                <div className="flex animate-marquee whitespace-nowrap items-center">
                    {[...brands, ...brands].map((item, i) => (
                        <span key={i} className="flex items-center gap-6 mx-6">
                            <span className="text-sm tracking-widest uppercase font-semibold text-white/40">
                                {item}
                            </span>
                            <Diamond size={8} className="text-accent fill-accent" />
                        </span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
