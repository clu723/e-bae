import { Button, Card } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utilities/FormatCurrency";

export type ProductProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
};

export function Product({
  id,
  title,
  description,
  price,
  images,
}: ProductProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={images[0]}
        height="200px"
        style={{ objectFit: "contain" }}
      ></Card.Img>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{formatCurrency(price)}</Card.Text>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <Button
                variant="danger"
                size="sm"
                onClick={() => decreaseCartQuantity(id)}
              >
                -
              </Button>
              <div>
                <span className="fs-3">{quantity}</span> in cart
              </div>

              <Button size="sm" onClick={() => increaseCartQuantity(id)}>
                +
              </Button>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              ></div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
