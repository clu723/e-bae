import { ReactNode, createContext, useContext, useState } from "react";
import { Cart } from "../components/Cart";

type CartProviderProps = {
  children: ReactNode;
};

type CartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  // Retrieve cart item props
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // State for displaying Cart component (passed into Cart())
  const [isOpen, setIsOpen] = useState(false);

  // Quantity of all items in cart
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Retrieve quantity of cart item matching the id
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  // Increases quantity of cart item matching id
  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      // If item not in cart, add item
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // Decreasses quantity of cart item matching id
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      // If item not in cart, add item
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // Removes cart item matching id from cart
  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <Cart isOpen={isOpen}></Cart>
    </CartContext.Provider>
  );
}
