import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Gift } from 'lucide-react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 5000);
    };

    return (
        <section className="py-20 md:py-28 bg-dark relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

            <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center">
                        <Gift size={28} className="text-accent" />
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-4">
                        Get <span className="text-accent">10% Off</span> Your First Order
                    </h2>
                    <p className="text-white/50 mb-8 max-w-md mx-auto">
                        Subscribe to our newsletter for exclusive access to new collections, styling tips, and special offers.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-dark text-sm tracking-widest uppercase font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                        >
                            <Send size={14} />
                            Subscribe
                        </button>
                    </form>

                    {/* Success */}
                    {subscribed && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl"
                        >
                            <CheckCircle size={14} className="text-green-400" />
                            <span className="text-sm text-green-400 font-medium">You're subscribed! Check your inbox for 10% off.</span>
                        </motion.div>
                    )}

                    <p className="text-xs text-white/25 mt-4">No spam, unsubscribe anytime. By subscribing you agree to our Privacy Policy.</p>
                </motion.div>
            </div>
        </section>
    );
}
