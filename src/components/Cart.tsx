import { Offcanvas, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { CartItem } from "./CartItem";
import { useProducts } from "../context/ProductContext";
import { formatCurrency } from "../utilities/FormatCurrency";

type CartProps = {
  isOpen: boolean;
};

export function Cart({ isOpen }: CartProps) {
  // Retrieve props of items in cart
  const { closeCart, cartItems } = useCart();

  // Retrieve props of all products
  const { products } = useProducts();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {/* Display all items in cart. */}
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item}></CartItem>
          ))}
          {/* Add up total price of all cart items. */}
          <div className="ms-auto fw-bold fs-5">
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const product = products.find(
                  (product) => product.id === cartItem.id
                );
                return total + (product?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
