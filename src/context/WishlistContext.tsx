import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface WishlistContextType {
    wishlist: number[];
    toggleWishlist: (id: number) => void;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<number[]>(() => {
        try {
            const saved = localStorage.getItem('muslimah-wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('muslimah-wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (id: number) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, wishlistCount: wishlist.length }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
