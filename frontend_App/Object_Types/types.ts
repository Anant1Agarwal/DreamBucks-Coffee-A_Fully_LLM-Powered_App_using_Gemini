// Products Interface
export interface Product {
    id: string;
    category: string;
    description: string;
    image_url: string;
    name: string;
    price: number;
    rating: number;
  }

export interface ProductCategory {
    id: string;
    selected: boolean;
}

// Message Interface
export interface MessageInterface {
    role: string;
    parts: string;
    memory?: any;
}

// Object_Types/types.ts
declare module '@env' {
    export const EXPO_FASTAPI_BASE_URL: string;
  }
  