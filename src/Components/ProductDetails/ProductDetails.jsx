import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import IsLoading from "../IsLoading/IsLoading";
import { cartContext } from "../Context/CardContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  let x = useParams();
  let [product, setProduct] = useState({});
  let [loading, setLoading] = useState(true);

  let { addToCart, setCounter } = useContext(cartContext);
  let [btnLoading, setBtnLoading] = useState(true);
  async function addProductToCart(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);
    console.log(data);
    if (data.status == "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
    }
  }

  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${x.id}`
    );
    setProduct(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProduct();
  }, []);
  if (loading) return <IsLoading />;

  return (
    <>
      <div className="container">
        <div className="row mt-5  align-items-center">
          <div className="col-md-3">
            <img
              src={product.imageCover}
              className="w-100"
              alt="product details image"
            />
          </div>
          <div className="col-md-9">
            <h4 className="my-1 ">{product.title}</h4>
            <p className="py-2">{product.description}</p>
            <span className="text-main ">{product.category.name}</span>

            <div className="d-flex justify-content-between py-2">
              <div>{product.price} EGP</div>
              <div>
                <i className="fa-solid fa-star rating-color px-1"></i>
                {product.ratingsAverage}
              </div>
            </div>
            <button
              disabled={!btnLoading}
              onClick={() => addProductToCart(product._id)}
              className="btn bg-main w-100 text-white"
            >
              {btnLoading ? (
                "Add To Cart"
              ) : (
                <i className="fa-solid fa-spinner fa-spin"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
