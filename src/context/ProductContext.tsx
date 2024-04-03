import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

type ProductProviderProps = {
  children: ReactNode;
};

type ProductContext = {
  products: ProductProps[];
};

export type ProductProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
};

const ProductContext = createContext<ProductContext>({ products: [] });

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
