import { Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import QuantityControl from "./QuantityControl";

const ProductItem = ({ product }) => {
  return (
    <Col>
      <Card>
        <Link
          to={`/products/${product.id}`}
          className="text-decoration-none text-secondary"
        >
          <Card.Img
            variant="top"
            src={`${process.env.REACT_APP_API_URL}/${product.image}`}
          />
          <Card.Body>
            <Card.Title>
              <Badge bg="secondary me-1">{product.category.name}</Badge>
              {product.name}{" "}
            </Card.Title>
            <Card.Text>Price: {product.price}</Card.Text>
          </Card.Body>
        </Link>
        <Card.Footer>
          <QuantityControl product={product} />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ProductItem;
