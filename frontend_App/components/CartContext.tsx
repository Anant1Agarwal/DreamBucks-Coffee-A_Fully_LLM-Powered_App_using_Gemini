import { createContext, useContext } from "react";
import { useState } from "react";
type CartItems = {
  [key: string]: number; // key is the product ID, value is the quantity
};

type CartContextType = {
  cartItems: CartItems;
  addToCart: (itemKey: string, quantity: number) => void;
  setQuantityinCart: (itemKey: string, delta: number) => void;
  emptyCart: () => void;
};

//Create a Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems>({});

  const addToCart = (itemKey: string, quantity: number) => {
    setCartItems((prevCartItems) => {
      return {
        ...prevCartItems,
        [itemKey]: (prevCartItems[itemKey] || 0) + quantity,
      };
    });
  };
  const setQuantityinCart = (itemKey: string, delta: number) => {
    setCartItems((prevCartItems) => {
      return {
        ...prevCartItems,
        [itemKey]: Math.max((prevCartItems[itemKey] || 0) + delta, 0),
      };
    });
  };
  const emptyCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, setQuantityinCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );

};


export const useCart = () : CartContextType => {
  const context=useContext(CartContext);
  if(!context){
    throw new Error("useCart must be used within a CartProvider");
  }


  return context;
}