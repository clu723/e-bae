import { Col, Row } from "react-bootstrap";
import { Product } from "../data/Product";
import { useProducts } from "../context/ProductContext";

export function Store() {
  const { products } = useProducts();

  return (
    <div>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((product) => (
          <Col key={product.id}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
