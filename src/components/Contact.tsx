import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Clock, CheckCircle } from 'lucide-react';

const contactInfo = [
    {
        icon: MapPin,
        title: 'Visit Our Boutique',
        detail: '350 Fifth Avenue, Suite 4820',
        sub: 'New York, NY 10118',
    },
    {
        icon: Mail,
        title: 'Email Us',
        detail: 'hello@muslimahbride.com',
        sub: 'We reply within 24 hours',
    },
    {
        icon: Phone,
        title: 'Call Us',
        detail: '+1 (212) 555-0189',
        sub: 'Mon–Sat, 9 AM – 6 PM EST',
    },
    {
        icon: Clock,
        title: 'Business Hours',
        detail: 'Mon – Sat: 9 AM – 6 PM',
        sub: 'Sunday: By appointment only',
    },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setForm({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-semibold">Get in Touch</p>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground font-bold">
                        Book Your <span className="text-accent">Consultation</span>
                    </h2>
                    <p className="text-muted mt-4 max-w-lg mx-auto">
                        Ready to find your perfect bridal piece? Reach out to us and we'll guide you through every step of the process.
                    </p>
                </motion.div>

                {/* Contact info cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
                >
                    {contactInfo.map((item) => (
                        <div
                            key={item.title}
                            className="group p-6 bg-card rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-500"
                        >
                            <div className="w-12 h-12 mb-4 flex items-center justify-center bg-accent/10 rounded-xl group-hover:bg-accent group-hover:shadow-md transition-all duration-500">
                                <item.icon size={20} className="text-accent group-hover:text-dark transition-colors duration-500" />
                            </div>
                            <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                            <p className="text-sm text-foreground/80">{item.detail}</p>
                            <p className="text-xs text-muted mt-0.5">{item.sub}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Form Section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left — Map / Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-2 rounded-2xl overflow-hidden relative min-h-[350px]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=800&fit=crop&q=80"
                            alt="MuslimahBride New York Boutique"
                            className="w-full h-full object-cover absolute inset-0"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">Open Now</span>
                            </div>
                            <p className="font-heading text-xl text-white font-bold">New York Flagship</p>
                            <p className="text-sm text-white/60">350 Fifth Avenue, Suite 4820</p>
                        </div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="lg:col-span-3 bg-card p-8 sm:p-10 rounded-2xl border border-border shadow-sm space-y-5"
                    >
                        <div>
                            <h3 className="font-heading text-2xl text-foreground font-bold mb-1">Send Us a Message</h3>
                            <p className="text-sm text-muted">We'll get back to you within 24 hours.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="name" className="block text-xs tracking-widest uppercase text-muted mb-2 font-semibold">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm rounded-xl focus:border-accent focus:outline-none transition-colors duration-300 placeholder:text-muted/50"
                                    placeholder="Jane Smith"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-xs tracking-widest uppercase text-muted mb-2 font-semibold">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm rounded-xl focus:border-accent focus:outline-none transition-colors duration-300 placeholder:text-muted/50"
                                    placeholder="+1 (212) 555-0000"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs tracking-widest uppercase text-muted mb-2 font-semibold">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm rounded-xl focus:border-accent focus:outline-none transition-colors duration-300 placeholder:text-muted/50"
                                placeholder="jane@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-xs tracking-widest uppercase text-muted mb-2 font-semibold">
                                Message
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm rounded-xl focus:border-accent focus:outline-none transition-colors duration-300 resize-none placeholder:text-muted/50"
                                placeholder="Tell us about your dream bridal look..."
                            />
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-dark text-sm tracking-widest uppercase font-bold hover:bg-accent/90 transition-all duration-300 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30"
                            >
                                <Send size={14} />
                                Send Message
                            </button>

                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2 text-sm text-green-600 font-semibold"
                                >
                                    <CheckCircle size={16} />
                                    Message sent!
                                </motion.div>
                            )}
                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
