import { Button, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { formatCurrency } from "../utilities/FormatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useCart();

  // Retrieve props of products
  const { products } = useProducts();

  // Find the product details using the ID
  const product = products.find((product) => product.id === id);

  // If product details are not found, render nothing
  if (product == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={product.images[0]}
        alt={product.title}
        style={{ width: "100px", height: "100px", objectFit: "contain" }}
      />
      <div className="me-auto">
        <div>
          {product.title}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.8rem" }}>
              {" "}
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted">
          <p>{formatCurrency(product.price * quantity)}</p>
        </div>
        {/* Remove from cart button */}
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(id)}
        >
          Remove
        </Button>
      </div>
    </Stack>
  );
}
