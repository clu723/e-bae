import { Col, Form, Row } from "react-bootstrap";
import { Product } from "../components/Product";
import { useProducts } from "../context/ProductContext";
import { useState } from "react";

export function Store() {
  // Retrieve props of all products
  const { products } = useProducts();

  // State for search bar
  const [search, setSearch] = useState("");

  // Filter products by search
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search bar */}
      <Form className="mb-3">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search by name or category"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </Form>
      {/* Display all products in row and columns. */}
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
