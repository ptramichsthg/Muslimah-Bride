import { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, Wallet, CreditCard, Bot, Copy, Check, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse } from '../lib/openrouter';
import { products } from '../data/products';
import type { Order } from '../types';

interface OrderMock extends Order { } // Alias for clarity

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    // --- Store Simulation (Local State for now) ---
    const [orders, setOrders] = useState<OrderMock[]>([]);

    const [messages, setMessages] = useState<{ role: 'user' | 'assistant' | 'system'; content: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pendingOrderData, setPendingOrderData] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);


    // --- Payment Modal States ---
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [paymentInput, setPaymentInput] = useState('');
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    // --- Copy Feedback State ---
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, pendingOrderData, isLoading, isOpen]);

    // Handle Initial System Prompt & AI Logic
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    role: 'assistant',
                    content: 'Assalamualaikum! Welcome to **MuslimahBride**.\n\nI am Alya, your personal stylist. I can assist you with:\n1. **Check Stock & Details**\n2. **Instant Order**\n3. **Styling Consultation**\n4. **Check Order Status**'
                }
            ]);
        }
    }, [isOpen]);

    // Trigger AI response when user sends a message
    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
            processAIResponse();
        }
    }, [messages]);


    const processAIResponse = async () => {
        setIsLoading(true);





        // Filter messages to send only role/content to API
        const apiMessages = [
            ...messages.map(m => ({ role: m.role, content: m.content })).filter(m => m.role !== 'system')
        ];

        try {
            // @ts-ignore
            const reply = await getAIResponse(apiMessages);
            if (reply) {
                const parts = reply.split('~~~');
                const naturalText = parts[0].trim();

                if (parts.length > 1) {
                    try {
                        const actionData = JSON.parse(parts[1].trim());

                        if (actionData.action === 'PAYMENT') {
                            setPendingOrderData(actionData);
                            setMessages(prev => [...prev, { role: 'assistant', content: naturalText }]);
                        }
                        else if (actionData.action === 'CANCEL_ORDER') {
                            // Mock cancellation logic
                            const orderIndex = orders.findIndex(o => o.id === actionData.orderId);
                            if (orderIndex >= 0) {
                                const newOrders = [...orders];
                                newOrders[orderIndex].status = 'Canceled';
                                setOrders(newOrders);
                                setMessages(prev => [...prev, {
                                    role: 'assistant',
                                    content: `**Order Canceled**\n\nOrder \`${actionData.orderId}\` has been canceled.`
                                }]);
                            } else {
                                setMessages(prev => [...prev, {
                                    role: 'assistant',
                                    content: `Order ID \`${actionData.orderId}\` not found.`
                                }]);
                            }
                        }
                    } catch (e) {
                        console.error("Failed to parse action JSON", e);
                        setMessages(prev => [...prev, { role: 'assistant', content: naturalText }]);
                    }
                } else {
                    setMessages(prev => [...prev, { role: 'assistant', content: naturalText }]);
                }
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, Alya's connection is unstable. Please repeat your message." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: 'user', content: input }]);
        setInput('');
    };

    const handlePaymentClick = (method: string) => {
        setSelectedMethod(method);
        setPaymentInput('');
        setShowPaymentModal(true);
    };

    const isEWallet = (method: string) => ['Dana', 'Gopay', 'Ovo'].includes(method);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(text);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const calculateTotalBill = (prodName: string, _variantName: string, qty: number) => {
        const product = products.find(p => p.title.toLowerCase().includes(prodName.toLowerCase()));
        if (!product) return 0;
        return product.price * qty; // Simplified logic as variants usually don't have diff prices in our current data
    };

    const confirmPayment = async () => {
        if (!pendingOrderData || !paymentInput) return;

        setIsProcessingPayment(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

        const product = products.find(p =>
            p.title.toLowerCase().includes(pendingOrderData.product.toLowerCase())
        ) || products[0];

        const finalTotalPrice = product.price * pendingOrderData.qty;
        const orderId = `ORD-${Date.now().toString().slice(-6)}`;

        const newOrder: OrderMock = {
            id: orderId,
            id_product: product.id,
            product_name: product.title,
            product_price: product.price,
            quantity: pendingOrderData.qty,
            total_price: finalTotalPrice,
            buyer_name: pendingOrderData.name,
            buyer_phone: pendingOrderData.phone,
            buyer_location: pendingOrderData.location || "Address not detected",
            selected_variants: pendingOrderData.variant || "-",
            payment_method: selectedMethod,
            status: 'Packaging',
            created_at: new Date().toISOString(),
            variant: ''
        };

        setOrders(prev => [...prev, newOrder]);

        // Also add to global cart context for visibility if needed, or just relying on "Direct Order" flow
        // addToCart({...product, quantity: newOrder.quantity, color: 'Default', size: 'M'}); 

        setMessages(prev => [...prev, {
            role: 'assistant',
            content: `### Payment Successful!\n\nPayment via **${selectedMethod}** has been verified.\n\n**Order Details:**\n- **Order ID:** \`${orderId}\` \n- **Product:** ${product.title}\n- **Total:** $${finalTotalPrice.toLocaleString()}\n\nThank you! We are preparing your order.`
        }]);

        setIsProcessingPayment(false);
        setShowPaymentModal(false);
        setPendingOrderData(null);
    };

    const handleClearHistory = () => {
        setMessages([
            {
                role: 'assistant',
                content: 'Assalamualaikum! Welcome to **MuslimahBride**.\n\nI am Alya, your personal stylist. I can assist you with:\n1. **Check Stock & Details**\n2. **Instant Order**\n3. **Styling Consultation**\n4. **Check Order Status**'
            }
        ]);
    }


    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
            {/* Payment Modal */}
            <AnimatePresence>
                {showPaymentModal && (
                    <div className="fixed inset-0 z-100 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-md bg-white rounded-4xl shadow-2xl border border-white/20 p-8 relative overflow-hidden"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

                            {!isProcessingPayment && (
                                <button onClick={() => setShowPaymentModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition"><X size={24} /></button>
                            )}

                            <div className="text-center mb-8 relative z-10">
                                <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
                                    {isEWallet(selectedMethod) ? <Wallet size={40} /> : <CreditCard size={40} />}
                                </div>
                                <h3 className="font-heading text-dark text-xl font-bold tracking-tight">Payment Verification</h3>
                                <p className="text-xs text-muted mt-1 uppercase font-bold tracking-widest">{selectedMethod} Gateway</p>
                            </div>

                            {isProcessingPayment ? (
                                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                                    <Loader2 className="w-12 h-12 text-accent animate-spin" />
                                    <p className="text-sm font-bold text-dark animate-pulse uppercase tracking-widest">Verifying...</p>
                                </div>
                            ) : (
                                <div className="space-y-5 relative z-10">
                                    <div>
                                        <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1 mb-2 block">
                                            {isEWallet(selectedMethod) ? "Input E-Wallet Number" : "Input Account Number"}
                                        </label>
                                        <input
                                            type="text"
                                            value={paymentInput}
                                            onChange={(e) => setPaymentInput(e.target.value)}
                                            placeholder={isEWallet(selectedMethod) ? "08..." : "Account No..."}
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-accent rounded-2xl px-5 py-4 text-sm outline-none transition-all font-bold text-dark placeholder:text-muted/40"
                                            autoFocus
                                        />
                                    </div>

                                    <div className="bg-dark rounded-2xl p-5 text-white shadow-lg">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-white/50 font-bold">Product:</span>
                                            <span className="text-xs text-white font-bold text-right w-32 truncate">{pendingOrderData?.product}</span>
                                        </div>
                                        {pendingOrderData?.variant && (
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-xs text-white/50 font-bold">Variant:</span>
                                                <span className="text-xs text-accent font-bold text-right">{pendingOrderData.variant}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center border-t border-white/10 pt-3">
                                            <span className="text-xs text-white/50 font-bold">Total Bill:</span>
                                            <span className="font-heading text-accent text-lg font-bold">
                                                ${calculateTotalBill(pendingOrderData?.product || '', pendingOrderData?.variant || '', pendingOrderData?.qty || 1).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={confirmPayment}
                                        disabled={!paymentInput}
                                        className="w-full bg-accent text-dark font-bold py-4 rounded-2xl hover:bg-yellow-400 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-accent/20"
                                    >
                                        Confirm Payment
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            {/* Floating Toggle Button */}
            {!isOpen && (
                <motion.button
                    onClick={() => setIsOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-linear-to-tr from-dark to-slate-800 transition-transform duration-300 group-hover:scale-110"></div>

                    <div className="relative z-10 text-white">
                        <MessageCircle size={28} className="text-accent fill-current" />
                    </div>
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="bg-white w-[380px] sm:w-[450px] h-[650px] max-h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 flex flex-col relative z-50"
                    >
                        {/* Header */}
                        <div className="h-20 bg-dark/95 backdrop-blur-md flex items-center justify-between px-6 border-b border-white/5 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-accent to-yellow-200 p-[2px]">
                                        <div className="w-full h-full rounded-full bg-dark flex items-center justify-center overflow-hidden">
                                            <Bot size={20} className="text-accent" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-heading text-white font-semibold text-base tracking-wide">Alya AI</h3>
                                    <p className="text-[10px] text-accent font-bold mt-0.5 uppercase tracking-widest">Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleClearHistory}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-rose-500/20 hover:text-rose-400 transition-all"
                                    title="Clear History"
                                >
                                    <X size={14} className="rotate-45" /> {/* Using X as Trash icon for simplicity or Import Trash */}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-slate-50 relative custom-scrollbar">
                            {/* Date Separator */}
                            <div className="flex justify-center mb-4">
                                <span className="text-[10px] uppercase tracking-widest text-muted/60 font-semibold bg-slate-100 px-3 py-1 rounded-full">Today</span>
                            </div>

                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] text-sm leading-relaxed shadow-sm relative group
                                    ${msg.role === 'user'
                                            ? 'bg-dark text-white rounded-3xl rounded-tr-sm px-5 py-3.5'
                                            : 'bg-white text-slate-700 rounded-3xl rounded-tl-sm px-5 py-4 border border-slate-100'
                                        }`}>

                                        {/* Markdown Rendering */}
                                        <ReactMarkdown
                                            components={{
                                                // Style bold text
                                                strong: ({ node, ...props }) => <span className="font-bold text-accent" {...props} />,
                                                // Style headings
                                                h3: ({ node, ...props }) => <h3 className="text-lg font-heading font-bold mb-2 mt-2" {...props} />,
                                                // Style lists
                                                ul: ({ node, ...props }) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
                                                // Style codes
                                                code: ({ node, className, children, ...props }: any) => {
                                                    const content = String(children);
                                                    const isOrderId = /ORD-\d+/.test(content);
                                                    const isInline = !className?.includes('language-');

                                                    if (isInline && isOrderId) {
                                                        const id = content.match(/ORD-\d+/)?.[0] || content;
                                                        return (
                                                            <button
                                                                onClick={() => copyToClipboard(id)}
                                                                className="bg-accent/10 text-accent px-2 py-0.5 rounded-md font-bold hover:bg-accent/20 transition-colors inline-flex items-center gap-1 group/btn relative mx-1 align-middle"
                                                                title="Click to copy"
                                                            >
                                                                {content}
                                                                {copiedId === id ? (
                                                                    <Check size={12} className="text-green-600" />
                                                                ) : (
                                                                    <Copy size={12} className="opacity-50 group-hover/btn:opacity-100" />
                                                                )}
                                                            </button>
                                                        );
                                                    }
                                                    return <code className={`${className} bg-slate-100 px-1 py-0.5 rounded text-xs font-mono`} {...props}>{children}</code>;
                                                }
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white px-4 py-3 rounded-3xl rounded-tl-sm shadow-sm border border-slate-100 flex items-center gap-1.5 h-[42px]">
                                        <span className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-[bounce_1s_infinite_0ms]"></span>
                                        <span className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                                        <span className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
                                    </div>
                                </div>
                            )}

                            {/* Payment Selection UI */}
                            {pendingOrderData && !showPaymentModal && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white p-6 rounded-4xl shadow-xl border border-accent/20 mt-2 mx-auto"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-accent/10 p-2 rounded-xl text-accent"><CreditCard size={18} /></div>
                                        <h4 className="font-bold text-dark uppercase text-xs tracking-widest">Choose Payment Method</h4>
                                    </div>
                                    <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <div className="flex justify-between text-[10px] font-bold">
                                            <span className="text-muted uppercase">Product</span>
                                            <span className="text-dark text-right truncate w-24">{pendingOrderData.product}</span>
                                        </div>
                                        {pendingOrderData.variant && (
                                            <div className="flex justify-between text-[10px] font-bold">
                                                <span className="text-muted uppercase">Variant</span>
                                                <span className="text-dark text-right">{pendingOrderData.variant}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center pt-2 border-t border-slate-200 mt-2">
                                            <span className="text-xs font-bold text-dark">Total</span>
                                            <span className="text-accent font-heading font-bold text-base">
                                                ${calculateTotalBill(pendingOrderData.product, pendingOrderData.variant, pendingOrderData.qty).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-2 ml-1">E-Wallet</p>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['Dana', 'Gopay', 'Ovo'].map(m => (
                                                    <button key={m} onClick={() => handlePaymentClick(m)} className="bg-dark text-white text-[9px] font-bold py-3 rounded-xl hover:bg-accent transition-all uppercase">
                                                        {m}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-2 ml-1">Bank Transfer</p>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['BCA', 'BRI', 'Mandiri'].map(m => (
                                                    <button key={m} onClick={() => handlePaymentClick(m)} className="bg-slate-50 text-dark border border-slate-200 text-[9px] font-bold py-3 rounded-xl hover:bg-accent hover:text-white hover:border-accent transition-all uppercase">
                                                        {m}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} className="h-4" />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="relative flex items-center gap-2 bg-slate-50 p-1.5 rounded-3xl border border-slate-200 focus-within:ring-2 focus-within:ring-accent/20 focus-within:border-accent transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type a message..."
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-3 bg-transparent text-sm text-dark placeholder:text-muted/60 focus:outline-none disabled:opacity-50 font-medium"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm
                                    ${!input.trim() || isLoading
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-dark text-white hover:bg-accent hover:rotate-6'}`}
                                >
                                    <Send size={18} className={input.trim() ? "ml-0.5" : ""} />
                                </button>
                            </div>
                            <div className="text-center mt-2.5">
                                <p className="text-[9px] text-muted flex items-center justify-center gap-1 uppercase tracking-widest font-bold opacity-60">
                                    Powered by Alya AI <Bot size={10} />
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
