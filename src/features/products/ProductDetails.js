import axios from "axios";
import { setAlert } from "features/ui/uiSlice";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Stack,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const deleteProduct = async () => {
    await axios.delete(`/products/${id}`);
    navigate("/products");
    dispatch(
      setAlert({ type: "success", message: "The product has already deleted." })
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/products/${id}`);
      setProduct(res.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>No product found.</div>;

  return (
    <Container fluid>
      <Row className="my-2">
        <Col md={4}>
          <img
            src={`${process.env.REACT_APP_API_URL}/${product.image}`}
            alt={product.name}
            className="w-100"
          />
        </Col>
        <Col md={8}>
          <Stack>
            <p className="fs-6 fw-bold">SKU:</p>
            <p className="ms-4">{product.sku}</p>
            <p className="fs-6 fw-bold">Name:</p>
            <p className="ms-4">{product.name}</p>
            <p className="fs-6 fw-bold">Status:</p>
            <p className="ms-4">
              {product.status === 1 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="fs-6 fw-bold">Category:</p>
            <p className="ms-4">{product.category.name}</p>
            <p className="fs-6 fw-bold">Price:</p>
            <p className="ms-4">{product.price}</p>
            <p className="fs-6 fw-bold">Details:</p>
            <p className="ms-4">{product.desc}</p>
            <ButtonGroup aria-label="Basic example">
              <Button onClick={() => navigate(`/products/${id}/edit`)}>
                Edit
              </Button>
              <Button variant="danger" onClick={deleteProduct}>
                Delete
              </Button>
            </ButtonGroup>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
