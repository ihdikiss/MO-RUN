export type CategoryType = 'all' | 'swimming' | 'running' | 'fitness';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'swimming' | 'running' | 'fitness';
  tagline: string;
  originalPrice: number; // in MAD
  discountedPrice: number; // in MAD
  discountPercent: number; // e.g. 25
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  isTopPick?: boolean;
  isNewArrival?: boolean;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  specs: ProductSpec[];
  inStock: boolean;
  stockCount: number;
}

export const WHATSAPP_PHONE_NUMBER = '212600112233'; // Dakhla Fit Sales Hotline Placeholder

export function generateWhatsAppOrderUrl(product: Product, quantity: number = 1, deliveryCity: string = ''): string {
  const total = product.discountedPrice * quantity;
  const savings = (product.originalPrice - product.discountedPrice) * quantity;
  
  const lines = [
    `*⚡ DAKHLA FIT — ORDER REQUEST*`,
    `--------------------------------`,
    `*Item:* ${product.name}`,
    `*Category:* ${product.category.toUpperCase()} EQUIPMENT`,
    `*Quantity:* ${quantity}`,
    `*Unit Price:* ${product.discountedPrice} MAD (Original: ~${product.originalPrice} MAD~)`,
    `*Discount:* -${product.discountPercent}% (Saved: ${savings} MAD)`,
    `*Total Order:* *${total} MAD*`,
    `--------------------------------`,
    deliveryCity ? `*Delivery City:* ${deliveryCity}` : `*Delivery City:* [Enter your city here]`,
    `*Client Name:* [Enter your name]`,
    `--------------------------------`,
    `Salam Dakhla Fit! I would like to confirm my order. Please send delivery details & estimated arrival time. Thank you! 🇲🇦`
  ];

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${message}`;
}
