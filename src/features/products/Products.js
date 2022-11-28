import { useState, useEffect } from "react";
import { Stack, Form, Button, Row } from "react-bootstrap";
import axios from "axios";
import ProductItem from "./ProductItem";
import { isEmpty } from "lodash";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const fetchProducts = async () => {
    const queryString = query ? `?search=${query}` : "";
    const res = await axios.get(`/products${queryString}`);

    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="text-center fs-3">All Products</h1>
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          placeholder="Enter product name or SKU..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="vr" />
        <Button onClick={fetchProducts}>Search</Button>
      </Stack>
      {isEmpty(products) ? (
        <div className="py-2">No products found.</div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-2 py-2">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Row>
      )}
    </>
  );
};

export default Products;
