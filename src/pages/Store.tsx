import { Col, Form, Row } from "react-bootstrap";
import { Product } from "../data/Product";
import { useProducts } from "../context/ProductContext";
import { useState } from "react";

export function Store() {
  const { products } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Form className="mb-3">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search by name or category"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Row md={2} xs={1} lg={3} className="g-3">
        {filteredProducts.map((product) => (
          <Col key={product.id}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
