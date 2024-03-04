import React, { useContext, useEffect, useState } from "react";
import style from "./Product.module.css";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CardContext";
import { toast } from "react-toastify";
import { wishListContext } from "../Context/WishListContext";
import TextFitting from "text-fitting";

export default function Product({ item, wishListData }) {
  let { addToCart, setCounter } = useContext(cartContext);
  let { addToWishList, setWishCounter, getWishList, dleteItemWishList } =
    useContext(wishListContext);
  let textFitting = require("text-fitting");
  let [btnLoading, setBtnLoading] = useState(true);
  let [wishLoading, setWishLoading] = useState(true);

  let [wishId, setWishId] = useState([]);

  useEffect(() => {
    (async () => {
      let filteredProduct = await wishListData?.data?.data?.data?.map(
        (product) => product.id
      );

      setWishId(filteredProduct);
    })();
  }, []);
  async function addProductToCart(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);
    if (data.status == "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
    }
  }
  async function addProductToWishList(productId) {
    setWishLoading(false);
    let data = await addToWishList(productId);
    if (data.status == "success") {
      setWishId(data?.data);

      toast.success("Product added to wishlist successfully");
      setWishCounter(data.data.length);
      setWishLoading(true);
    }
  }
  async function deleteProductWishList(productId) {
    setWishLoading(false);

    let data = await dleteItemWishList(productId);
    if (data.status == "success") {
      toast.error("Product Deleted Successfully");
      console.log(data);
      setWishId(data?.data);

      setWishCounter(data.data.length);

      setWishLoading(true);
    }
  }

  return (
    <>
      <div className=" col-lg-2 col-md-4 col-sm-3 col-6 ">
        <div className="product cursor-pointer rounded-3 p-2 overflow-hidden position-relative ">
          <div className="  rounded-bottom-3 ">
            <Link
              className="text-decoration-none text-black "
              to={"/product-details/" + item._id}
            >
              <img
                src={item.imageCover}
                className="w-100 rounded-3"
                alt="product cover"
              />
              <span className="text-main font-sm">{item.category.name}</span>
              <br></br>
              <span className="text-main font-sm">{item.brand.name}</span>

              <h5 className="my-1 h6">
                {item.title.split(" ").slice(0, 2).join(" ")}
              </h5>
              <div className="d-flex justify-content-between py-2">
                <div>{item.price} EGP</div>
                <div>
                  <i className="fa-solid fa-star rating-color px-1"></i>
                  {item.ratingsAverage}
                </div>
              </div>
            </Link>
          </div>
          <div className=" d-flex justify-content-between align-items-center">
            <button
              disabled={!btnLoading}
              onClick={() => addProductToCart(item._id)}
              className="btn btn-success w-100 text-white  "
            >
              {btnLoading ? (
                'Add To Cart'
              ) : (
                <i className="fa-solid fa-spinner fa-spin "></i>
              )}
            </button>
            <div className="wish">
              {wishId?.includes(item._id) ? (
                <div
                  disabled={!wishLoading}
                  onClick={() => deleteProductWishList(item._id)}
                  className=" w-25  m-2"
                >
                  {wishLoading ? (
                    <i className="fa-solid text-main fa-heart"></i>
                  ) : (
                    <i className="fa-solid text-main text-main fa-spinner fa-spin"></i>
                  )}
                </div>
              ) : (
                <div
                  disabled={!wishLoading}
                  onClick={() => addProductToWishList(item._id)}
                  className=" w-25 m-2 "
                >
                  {wishLoading ? (
                    <i className="fa-regular text-main fa-heart"></i>
                  ) : (
                    <i className="fa-solid v text-main fa-spinner fa-spin"></i>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
