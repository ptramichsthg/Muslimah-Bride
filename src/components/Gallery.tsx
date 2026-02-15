import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Eye, ArrowUpRight, X, ShoppingBag, Heart,
    ChevronLeft, ChevronRight, Check, Star, Minus, Plus,
} from 'lucide-react';
import { products } from '../data/products';
import type { Product } from '../data/products';

const categories = ['All', 'Wedding Veil', 'Bridal Hijab', 'Nikah Set', 'Evening Veil'];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1 },
    }),
};

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [cartMessage, setCartMessage] = useState('');

    const filtered = activeCategory === 'All'
        ? products
        : products.filter((p) => p.category === activeCategory);

    const openProduct = (product: Product) => {
        setSelectedProduct(product);
        setSelectedSize(product.sizes[0]);
        setSelectedColor(product.colors[0].name);
        setCurrentImageIndex(0);
        setQuantity(1);
    };

    const closeProduct = () => {
        setSelectedProduct(null);
        setCartMessage('');
    };

    const toggleWishlist = (id: number) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const addToCart = () => {
        if (!selectedProduct) return;
        setCartMessage(`${selectedProduct.title} (${selectedSize}, ${selectedColor}) × ${quantity} added to bag!`);
        setTimeout(() => setCartMessage(''), 3000);
    };

    const nextImage = () => {
        if (!selectedProduct) return;
        setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    };

    const prevImage = () => {
        if (!selectedProduct) return;
        setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    };

    return (
        <section id="gallery" className="py-24 md:py-32 bg-card">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
                >
                    <div>
                        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-semibold">Collections</p>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground font-bold">
                            Our Signature <span className="text-accent">Pieces</span>
                        </h2>
                    </div>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group"
                    >
                        Custom Order
                        <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap gap-2 mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${activeCategory === cat
                                ? 'bg-dark text-white shadow-lg'
                                : 'bg-background text-muted hover:text-foreground hover:bg-background/80'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((product, i) => (
                            <motion.div
                                key={product.id}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.95 }}
                                variants={fadeUp}
                                layout
                                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
                                onClick={() => openProduct(product)}
                            >
                                {/* Image */}
                                <div className="aspect-3/4 relative overflow-hidden bg-slate-100">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); openProduct(product); }}
                                            className="w-10 h-10 bg-white text-dark rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg ${wishlist.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white text-dark'
                                                }`}
                                            title="Wishlist"
                                        >
                                            <Heart size={18} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
                                        </button>
                                    </div>

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {product.badge && (
                                            <span className={`px-3 py-1 text-[10px] tracking-widest uppercase font-bold rounded-full ${product.badge === 'Sold Out' ? 'bg-slate-900 text-white' : 'bg-white/90 backdrop-blur text-dark'
                                                }`}>
                                                {product.badge}
                                            </span>
                                        )}
                                        {product.originalPrice && (
                                            <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full uppercase w-fit">
                                                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-5 text-center">
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-bold mb-2">{product.category}</p>
                                    <h3 className="font-heading text-lg text-slate-900 font-bold mb-2">{product.title}</h3>

                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <span className="font-heading text-lg font-bold text-accent">${product.price.toLocaleString()}</span>
                                        {product.originalPrice && (
                                            <span className="text-xs text-slate-400 line-through">${product.originalPrice.toLocaleString()}</span>
                                        )}
                                    </div>

                                    {/* Color Dots */}
                                    <div className="flex justify-center items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                        {product.colors.slice(0, 4).map((c) => (
                                            <div
                                                key={c.name}
                                                className="w-3 h-3 rounded-full border border-slate-200"
                                                style={{ backgroundColor: c.hex }}
                                                title={c.name}
                                            />
                                        ))}
                                        {product.colors.length > 4 && (
                                            <span className="text-[9px] text-slate-400">+{product.colors.length - 4}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center p-4"
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={closeProduct} />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.97 }}
                            transition={{ duration: 0.3 }}
                            className="relative bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 z-10"
                        >
                            {/* Close */}
                            <button
                                onClick={closeProduct}
                                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                            >
                                <X size={18} />
                            </button>

                            {/* Image Gallery */}
                            <div className="relative bg-background">
                                <div className="relative aspect-3/4 overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentImageIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            src={selectedProduct.images[currentImageIndex]}
                                            alt={selectedProduct.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </AnimatePresence>

                                    {/* Nav arrows */}
                                    {selectedProduct.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </>
                                    )}

                                    {/* Badge */}
                                    {selectedProduct.badge && selectedProduct.badge !== 'Sold Out' && (
                                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent text-dark text-[10px] tracking-widest uppercase font-bold rounded-lg">
                                            {selectedProduct.badge}
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnails */}
                                <div className="flex gap-2 p-4">
                                    {selectedProduct.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-6 sm:p-8 flex flex-col">
                                <p className="text-xs tracking-[0.3em] uppercase text-accent font-semibold mb-2">{selectedProduct.category}</p>
                                <h3 className="font-heading text-2xl sm:text-3xl text-foreground font-bold mb-2">{selectedProduct.title}</h3>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className={i < Math.floor(selectedProduct.rating) ? 'text-accent fill-accent' : 'text-border'}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold text-foreground">{selectedProduct.rating}</span>
                                    <span className="text-sm text-muted">({selectedProduct.reviews} reviews)</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-3 mb-6">
                                    <span className="font-heading text-3xl font-bold text-foreground">
                                        ${selectedProduct.price.toLocaleString()}
                                    </span>
                                    {selectedProduct.originalPrice && (
                                        <>
                                            <span className="text-lg text-muted line-through">
                                                ${selectedProduct.originalPrice.toLocaleString()}
                                            </span>
                                            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-md">
                                                Save ${(selectedProduct.originalPrice - selectedProduct.price).toLocaleString()}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <p className="text-sm text-muted leading-relaxed mb-6">{selectedProduct.longDescription}</p>

                                {/* Colors */}
                                <div className="mb-5">
                                    <p className="text-xs tracking-widest uppercase text-muted mb-3 font-semibold">
                                        Color — <span className="text-foreground">{selectedColor}</span>
                                    </p>
                                    <div className="flex gap-2">
                                        {selectedProduct.colors.map((c) => (
                                            <button
                                                key={c.name}
                                                onClick={() => setSelectedColor(c.name)}
                                                className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === c.name ? 'border-accent scale-110' : 'border-border hover:scale-105'
                                                    }`}
                                                style={{ backgroundColor: c.hex }}
                                                title={c.name}
                                            >
                                                {selectedColor === c.name && (
                                                    <Check size={14} className="text-dark/70" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sizes */}
                                <div className="mb-6">
                                    <p className="text-xs tracking-widest uppercase text-muted mb-3 font-semibold">Size</p>
                                    <div className="flex gap-2">
                                        {selectedProduct.sizes.map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setSelectedSize(s)}
                                                className={`w-11 h-11 rounded-xl text-sm font-semibold transition-all ${selectedSize === s
                                                    ? 'bg-dark text-white shadow-md'
                                                    : 'bg-background text-foreground border border-border hover:border-accent/30'
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="mb-6">
                                    <p className="text-xs tracking-widest uppercase text-muted mb-3 font-semibold">Quantity</p>
                                    <div className="flex items-center gap-1 bg-background rounded-xl border border-border w-fit">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center hover:text-accent transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-10 text-center font-semibold text-foreground">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center hover:text-accent transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-auto">
                                    <button
                                        onClick={addToCart}
                                        disabled={!selectedProduct.inStock}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-dark text-sm tracking-widest uppercase font-bold rounded-xl hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20"
                                    >
                                        <ShoppingBag size={16} />
                                        {selectedProduct.inStock ? 'Add to Bag' : 'Sold Out'}
                                    </button>
                                    <button
                                        onClick={() => toggleWishlist(selectedProduct.id)}
                                        className={`w-14 h-14 flex items-center justify-center border rounded-xl transition-all ${wishlist.includes(selectedProduct.id)
                                            ? 'bg-red-50 border-red-200 text-red-500'
                                            : 'border-border text-muted hover:border-accent/30 hover:text-accent'
                                            }`}
                                    >
                                        <Heart
                                            size={18}
                                            className={wishlist.includes(selectedProduct.id) ? 'fill-red-500' : ''}
                                        />
                                    </button>
                                </div>

                                {/* Cart message */}
                                <AnimatePresence>
                                    {cartMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="flex items-center gap-2 mt-4 px-4 py-3 bg-green-50 border border-green-200 rounded-xl"
                                        >
                                            <Check size={16} className="text-green-600" />
                                            <p className="text-sm text-green-700 font-medium">{cartMessage}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
