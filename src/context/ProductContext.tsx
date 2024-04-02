import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

// Define the type for the context state
type ProductContextType = {
  products: ProductProps[]; // Assuming ProductProps is already defined
};

// Define the type for the provider props
type ProductProviderProps = {
  children: ReactNode;
};

// Define a type for product properties
export type ProductProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
};

// Create the context with an initial empty state
const ProductContext = createContext<ProductContextType>({ products: [] });

// Custom hook for consuming context
export function useProducts() {
  return useContext(ProductContext);
}

// Provider component
export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}
