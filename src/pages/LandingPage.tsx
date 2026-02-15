import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PromoBanner from '../components/PromoBanner';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Experience from '../components/Experience';
import Newsletter from '../components/Newsletter';
import Contact from '../components/Contact';
import ChatWidget from '../components/ChatWidget';
import { MapPin, Mail, Phone, ArrowUp } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-body">
            <Navbar />
            <Hero />
            <PromoBanner />
            <About />
            <Gallery />
            <Testimonials />
            <Experience />
            <Newsletter />
            <Contact />

            {/* Footer */}
            <footer className="bg-dark pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    {/* Top section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
                        {/* Brand */}
                        <div className="lg:col-span-1">
                            <p className="font-heading text-2xl font-bold text-white mb-3">
                                Muslimah<span className="text-accent">Bride</span>
                            </p>
                            <p className="text-sm text-white/50 leading-relaxed mb-6">
                                Luxury Muslim bridal boutique — where modesty meets elegance. Crafting timeless pieces for your special day.
                            </p>
                            <div className="flex gap-3">
                                {['Instagram', 'Pinterest', 'TikTok'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="px-4 py-2 bg-white/5 text-white/60 text-xs font-semibold rounded-lg hover:bg-accent hover:text-dark transition-all duration-300"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Quick Links</h4>
                            <ul className="space-y-3">
                                {['Home', 'About', 'Shop', 'Experience', 'Contact'].map((link) => (
                                    <li key={link}>
                                        <a
                                            href={`#${link === 'Shop' ? 'gallery' : link.toLowerCase()}`}
                                            className="text-sm text-white/50 hover:text-accent transition-colors duration-300"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Collections */}
                        <div>
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Collections</h4>
                            <ul className="space-y-3">
                                {['Wedding Veils', 'Bridal Hijabs', 'Nikah Sets', 'Evening Wear', 'Custom Orders'].map((item) => (
                                    <li key={item}>
                                        <a href="#gallery" className="text-sm text-white/50 hover:text-accent transition-colors duration-300"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Contact</h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-white/70">350 Fifth Avenue, Suite 4820</p>
                                        <p className="text-sm text-white/50">New York, NY 10118</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail size={16} className="text-accent shrink-0" />
                                    <p className="text-sm text-white/70">hello@muslimahbride.com</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={16} className="text-accent shrink-0" />
                                    <p className="text-sm text-white/70">+1 (212) 555-0189</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment methods strip */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-b border-white/5">
                        <p className="text-xs text-white/30 uppercase tracking-wider">Secure Payment</p>
                        <div className="flex items-center gap-4">
                            {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'].map((method) => (
                                <span key={method} className="text-xs text-white/30 font-semibold px-3 py-1.5 bg-white/5 rounded-md">
                                    {method}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
                        <p className="text-xs text-white/30 tracking-wide">
                            &copy; {new Date().getFullYear()} MuslimahBride. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
                            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Service</a>
                            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Shipping & Returns</a>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-lg hover:bg-accent hover:text-dark text-white/40 transition-all duration-300"
                                aria-label="Scroll to top"
                            >
                                <ArrowUp size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* AI Chat Widget */}
            <ChatWidget />
        </div>
    );
}
