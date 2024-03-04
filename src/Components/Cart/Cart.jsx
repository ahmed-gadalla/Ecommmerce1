import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { cartContext } from "../Context/CardContext";
import IsLoading from "../IsLoading/IsLoading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getCart, dleteItem, setCounter, updateQTY, cleareCart } =
    useContext(cartContext);
  let [data, setData] = useState({});
  let [loading, setLoading] = useState(true);
  let [btnLoading, setBtnLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let data = await getCart();
      if (data?.response?.data?.statusMsg == "fail") {
        setData(null);
      } else {
        setData(data);
        console.log(data);
      }
      setLoading(false);
    })();
  }, []);

  async function deleteProduct(productId) {
    setBtnLoading(false);

    let data = await dleteItem(productId);
    if (data.status == "success") {
      toast.error("Product Deleted Successfully");
      setCounter(data.numOfCartItems);
      setData(data);
      setBtnLoading(true);
    }
  }
  async function clear() {
    setBtnLoading(false);

    await cleareCart();
    setData(null);
    setCounter(0);

    setBtnLoading(true);
  }

  async function updateProductQuantity(productId, count) {
    let data = await updateQTY(productId, count);
    console.log(data);
    if (data?.status == "success") {
      toast.success("Product Updated Successfully");
      setCounter(data.numOfCartItems);
      setData(data);
    }
  }

  if (loading) return <IsLoading />;
  if (data == null || data?.numOfCartItems == 0)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center ">
        <h2 className=" my-5  text-main text-center"> No Item In Cart.</h2>
        <Link to={`/allorders`} className="btn bg-warning text-white my-2 w-50">
          <i className="fa-solid fa-list-check pe-1"></i>
          All Orders
        </Link>
      </div>
    );

  return (
    <>
      <div className="container  my-2 bg-main-light py-3 rounded-3">
        <h2 className=" mb-3">Shop Cart:</h2>

        <div className="d-flex flex-md-row flex-column  justify-content-between align-items-center border-bottom">
          <p className="text-main m-0 p-0">
            Total Cart Price: {data?.data?.totalCartPrice} EGP
          </p>
          <div className="mb-2 ">
            <Link
              to={`/allorders`}
              className="btn btn-warning text-white my-2 "
            >
              <i className="fa-solid fa-list-check pe-1"></i>
              All Orders
            </Link>
            <button
              onClick={() => clear()}
              className="btn btn-danger text-white my-2 ms-3 "
            >
              <i className=" fa-solid fa-trash-can pe-1"></i> Clear All
            </button>
          </div>
        </div>

        {data?.data?.products.map((item) => {
          return (
            <div key={item._id} className="  row py-2 border-bottom">
              <div className="col-lg-1 col-md-2 col-3">
                <img
                  src={item.product.imageCover}
                  alt="product photo in cart"
                  className="w-100 rounded-3"
                />
              </div>
              <div className="col-lg-11 col-md-10 col-9 ">
                <div>
                  <p className="m-1">
                    {item.product.title.split(" ").slice(0, 8).join(" ")}
                  </p>
                  <p className="text-main m-1 ">Price: {item.price} EGP</p>
                </div>
                <div className="d-flex flex-md-row  justify-content-md-between align-items-md-center justify-content-between mt-2 ">
                  
                  <div>
                    <button
                      disabled={item.count <= 1}
                      onClick={() =>
                        updateProductQuantity(item.product._id, item.count - 1)
                      }
                      className="btn brdr bg-white h5"
                    >
                      -
                    </button>
                    <span className="px-2 cursor-pointer">{item.count}</span>
                    <button
                      disabled={item.count >= item.product.quantity}
                      onClick={() =>
                        updateProductQuantity(item.product._id, item.count + 1)
                      }
                      className="btn brdr bg-white h5"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => deleteProduct(item.product._id)}
                      className="btn btn-outline-danger  mx-0  p-1"
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
        <div className=" d-md-flex d-sm-block   ">
          <div className="ms-md-auto ">
            <div>
              <Link
                to={`/address/${data?.data._id}`}
                className="btn btn-success  text-white mt-3  "
              >
                <i className="fa-regular fa-credit-card pe-1"></i> Pay Online
              </Link>

              <Link
                to={`/cashpayment/${data?.data._id}`}
                className="btn btn-success  text-white mt-3 ms-md-3 ms-2  "
              >
                <i className="fa-solid fa-hand-holding-dollar pe-1"></i> Cash On
                Delivery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
