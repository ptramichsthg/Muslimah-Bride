export interface Order {
    id: string;
    id_product: number;
    product_name: string;
    product_price: number;
    quantity: number;
    total_price: number;
    buyer_name: string;
    buyer_phone: string;
    buyer_location: string;
    selected_variants: string;
    payment_method: string;
    status: 'Pending' | 'Packaging' | 'Shipped' | 'Delivered' | 'Canceled';
    created_at: string;
    variant: string;
}
