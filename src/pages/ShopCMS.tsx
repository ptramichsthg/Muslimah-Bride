import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, ShoppingBag, ShoppingCart, BarChart3,
    LogOut, Plus, Search, Edit2, Trash2, X, Upload
} from 'lucide-react';
import { products } from '../data/products';

// Mock Data for statistics or other tabs if needed
const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: ShoppingBag, label: 'Products', id: 'products', active: true },
    { icon: ShoppingCart, label: 'Orders', id: 'orders' },
    { icon: BarChart3, label: 'Business Analyzer', id: 'analytics' },
];

export default function ShopCMS() {
    const [selectedTab, setSelectedTab] = useState('products');
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<any>(null);

    // Filter products
    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (product: any) => {
        setCurrentProduct(product);
        setIsEditModalOpen(true);
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would update the backend
        alert(`Updated ${currentProduct.title}`);
        setIsEditModalOpen(false);
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex-col fixed inset-y-0 z-10 hidden md:flex">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="font-heading text-xl font-bold text-slate-900">
                        Muslimah<span className="text-accent">Bride</span>
                    </h1>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">SaaS CMS & AI Analyzer</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedTab(item.id)}
                            className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                            ${selectedTab === item.id
                                    ? 'bg-accent/10 text-accent font-bold'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-slate-900">Product <span className="text-accent">Catalog</span></h2>
                        <p className="text-slate-500 mt-2">Manage your boutique's exclusive dress collection.</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        <Plus size={16} />
                        Add New Dress
                    </button>
                </header>

                {/* Search & Filter */}
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-8 flex items-center gap-2 max-w-2xl">
                    <Search size={20} className="text-slate-400 ml-3" />
                    <input
                        type="text"
                        placeholder="Search collections..."
                        className="flex-1 px-2 py-2 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            layoutId={`product-${product.id}`}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
                        >
                            {/* Image */}
                            <div className="aspect-3/4 relative overflow-hidden bg-slate-100">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900">
                                    {product.category}
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        className="w-10 h-10 bg-white text-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5 text-center">
                                <h3 className="font-heading font-bold text-slate-900 mb-1">{product.title}</h3>
                                <p className="text-accent font-bold mb-3">${product.price.toLocaleString()}</p>
                                <div className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-slate-300">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                                    Handcrafted Premium
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditModalOpen && currentProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-lg rounded-4xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-heading text-xl font-bold text-slate-900">Update Collection</h3>
                                <button onClick={() => setIsEditModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleUpdate} className="p-8 space-y-6">
                                <div className="flex justify-center mb-6">
                                    <div className="w-24 h-32 rounded-xl overflow-hidden border-2 border-slate-100 shadow-inner relative group cursor-pointer aspect-3/4">
                                        <img src={currentProduct.image} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <Upload size={20} className="text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        defaultValue={currentProduct.title}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-accent transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">Image URL</label>
                                    <input
                                        type="text"
                                        defaultValue={currentProduct.image}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none focus:border-accent transition-colors truncate"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">Price ($)</label>
                                        <input
                                            type="number"
                                            defaultValue={currentProduct.price}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-accent transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">Category</label>
                                        <input
                                            type="text"
                                            defaultValue={currentProduct.category}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-accent transition-colors"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/25 hover:bg-yellow-500 hover:shadow-accent/40 transition-all active:scale-95"
                                >
                                    Confirm Update
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
