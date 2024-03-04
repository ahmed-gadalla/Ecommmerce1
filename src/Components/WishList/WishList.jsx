import React, { useContext, useEffect, useState } from "react";
import IsLoading from "../IsLoading/IsLoading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { wishListContext } from "../Context/WishListContext";
import { cartContext } from "../Context/CardContext";

export default function WishList() {
  let { getWishList, dleteItemWishList, setWishCounter } =
    useContext(wishListContext);
  let [data, setData] = useState({});
  let [loading, setLoading] = useState(true);
  let [btnLoading, setBtnLoading] = useState(true);
  let { addToCart, setCounter } = useContext(cartContext);

  useEffect(() => {
    (async () => {
      let data = await getWishList();
      if (data?.status == "fail") {
        setData(null);
      } else {
        setData(data);
      }
      setLoading(false);
    })();
  }, []);

  async function deleteProductWishList(productId) {
    setBtnLoading(false);

    let data = await dleteItemWishList(productId);
    if (data.status == "success") {
      toast.error("Product Deleted Successfully");
      setData(await getWishList());
      setWishCounter(data.data.length);

      setBtnLoading(true);
    }
  }
  async function addProductToCart(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);
    if (data.status == "success") {
      toast.success("Product added successfully");
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
    }
  }

  if (loading) return <IsLoading />;
  if (data == null || data?.count == 0)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center ">
        <h2 className=" my-5  text-main text-center"> No Item In Wishlist.</h2>
        <Link to={`/allorders`} className="btn bg-warning text-white my-2 w-50">
          <i className="fa-solid fa-list-check pe-1"></i>
          All Orders
        </Link>
      </div>
    );

  return (
    <>
      <div className="container  my-2 bg-main-light py-3 rounded-3 ">
        <h2 className="border-bottom pb-2 mb-2">WishList:</h2>

        {data?.data.map((item) => {
          return (
            <div key={item._id} className="  row py-2 border-bottom">
              <div className="col-lg-1 col-md-2 col-3">
                <img
                  src={item.imageCover}
                  alt="product photo in cart"
                  className="w-100 rounded-3"
                />
              </div>
              <div className="col-lg-11 col-md-10 col-9 d-flex justify-content-between align-items-end">
                <div>
                  <p className="m-1">
                    {item.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className="m-1">
                    {item.description.split(" ").slice(0, 8).join(" ")}
                  </p>
                  <p className="text-main m-1 ">Price: {item.price} EGP</p>
                  <div className="d-flex align-items-center">
                    <button
                      disabled={!btnLoading}
                      onClick={() => addProductToCart(item._id)}
                      className="btn btn-success  text-white "
                    >
                      {btnLoading ? (
                        "Add To Cart"
                      ) : (
                        <i className="fa-solid fa-spinner fa-spin "></i>
                      )}
                    </button>

                    <button
                      onClick={() => deleteProductWishList(item._id)}
                      className="btn btn-outline-danger my-3 mx-3  p-1"
                    >
                      {btnLoading ? (
                        <>
                          <i className=" fa-solid fa-trash-can px-1"></i>
                          Remove
                        </>
                      ) : (
                        <i className="fa-solid fa-spinner fa-spin p-1"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
