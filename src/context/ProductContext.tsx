import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

type ProductContextType = {
  products: ProductProps[];
};

type ProductProviderProps = {
  children: ReactNode;
};

export type ProductProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
};

const ProductContext = createContext<ProductContextType>({ products: [] });

// Custom hook for consuming context
export function useProducts() {
  return useContext(ProductContext);
}

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
