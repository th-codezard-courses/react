import { useSelector, useDispatch } from "react-redux";
import { ButtonGroup, Button, Accordion } from "react-bootstrap";
import { isEmpty } from "lodash";
import OrderDetails from "./OrderDetails";
import CustomerInfo from "./CustomerInfo";
import { clear } from "./cartSlice";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { setAlert } from "features/ui/uiSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerInfo, products } = useSelector((state) => state.cart);
  const productItems = Object.values(products);

  const save = async () => {
    const payload = { ...customerInfo, products: productItems };
    await axios.post("/orders", payload);
    dispatch(clear());
    navigate("/products");
    dispatch(
      setAlert({
        type: "success",
        message: "Order has already created.",
      })
    );
  };

  if (isEmpty(products)) return <p>Empty Cart</p>;

  return (
    <>
      <h1 className="text-center my-4">Order Summary</h1>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Order Details</Accordion.Header>
          <Accordion.Body>
            <OrderDetails products={productItems} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Customer Info</Accordion.Header>
          <Accordion.Body>
            <CustomerInfo />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <hr />
      <ButtonGroup>
        <Button onClick={save}>Save</Button>
        <Button variant="danger" onClick={() => dispatch(clear)}>
          Clear
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Cart;
