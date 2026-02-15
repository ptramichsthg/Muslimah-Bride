import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    color: string;
    size: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    cartCount: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('muslimah-cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('muslimah-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (newItem: CartItem) => {
        setItems((prev) => {
            const existing = prev.find(
                (i) => i.id === newItem.id && i.color === newItem.color && i.size === newItem.size
            );
            if (existing) {
                return prev.map((i) =>
                    i === existing ? { ...i, quantity: i.quantity + newItem.quantity } : i
                );
            }
            return [...prev, newItem];
        });
        // Optional: open cart drawer when adding
        // setIsOpen(true); 
    };

    const removeFromCart = (id: number) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartCount, isOpen, setIsOpen }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
