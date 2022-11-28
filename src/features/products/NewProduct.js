import axios from "axios";
import { setAlert } from "features/ui/uiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductForm from "./ProductForm";

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createProduct = async (product) => {
    try {
      await axios.post("/products", product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/products");
      dispatch(
        setAlert({
          type: "success",
          message: "The product has already created.",
        })
      );
    } catch (ex) {
      dispatch(
        setAlert({
          type: "danger",
          message: ex.response.data.error,
        })
      );
    }
  };

  return (
    <>
      <h1 className="text-center fs-3">Create Product</h1>
      <ProductForm onSubmit={createProduct} />
    </>
  );
};

export default NewProduct;
