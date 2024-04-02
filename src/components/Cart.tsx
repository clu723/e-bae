import { Offcanvas, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { CartItem } from "./CartItem";
import { useProducts } from "../context/ProductContext";
import { formatCurrency } from "../utilities/FormatCurrency";

type CartProps = {
  isOpen: boolean;
};

export function Cart({ isOpen }: CartProps) {
  const { closeCart, cartItems } = useCart();
  const { products } = useProducts();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item}></CartItem>
          ))}
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
