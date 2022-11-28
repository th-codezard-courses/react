import axios from "axios";
import { setAlert } from "features/ui/uiSlice";
import { omit } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();

  const updateProduct = async (product) => {
    try {
      await axios.patch(`/products/${id}`, product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/products");
      dispatch(
        setAlert({
          type: "success",
          message: "The product has already updated.",
        })
      );
    } catch (ex) {
      dispatch(setAlert({ type: "danger", message: ex.response.data.error }));
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/products/${id}`);
      const product = omit(data, ["category", "id", "createdAt", "updatedAt"]);

      setProduct({ ...product, categoryId: data.category.id });
    };

    fetchProduct(id);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <h1 className="text-center fs-3">Edit Product</h1>
      <ProductForm currentProduct={product} onSubmit={updateProduct} />
    </>
  );
};

export default EditProduct;
