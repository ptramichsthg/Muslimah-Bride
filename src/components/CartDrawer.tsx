import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
    const { items, removeFromCart, isOpen, setIsOpen, cartCount } = useCart();

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="font-heading text-2xl font-bold flex items-center gap-3">
                                <ShoppingBag className="text-accent" />
                                Cart ({cartCount})
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                                    <ShoppingBag size={48} className="opacity-20" />
                                    <p>Your bag is empty.</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 border-b border-slate-100 pb-6">
                                        <div className="w-24 h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-heading font-bold text-slate-900">{item.title}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <p className="text-accent font-bold text-sm mt-1">${item.price.toLocaleString()}</p>
                                            <div className="text-xs text-slate-500 space-y-1 mt-2">
                                                <p>Color: <span className="font-semibold text-slate-700">{item.color}</span></p>
                                                <p>Size: <span className="font-semibold text-slate-700">{item.size}</span></p>
                                                <p>Qty: <span className="font-semibold text-slate-700">{item.quantity}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-slate-100 bg-slate-50">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Subtotal</span>
                                    <span className="font-heading text-2xl font-bold text-slate-900">${total.toLocaleString()}</span>
                                </div>
                                <button className="w-full py-4 bg-accent text-dark font-bold tracking-widest uppercase text-sm rounded-xl hover:bg-yellow-500 transition-all shadow-lg shadow-accent/20">
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
