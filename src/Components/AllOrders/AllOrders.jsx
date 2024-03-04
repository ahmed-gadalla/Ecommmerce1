import React, { useEffect, useState } from "react";
import style from "./AllOrders.module.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import IsLoading from "../IsLoading/IsLoading";
import Slider from "react-slick";

export default function AllOrders() {
  let [data, setData] = useState({});
  let [loading, setLoading] = useState(true);
  var settings = {
    dots: true,
    infinite: false,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
  };
  let userId = jwtDecode(localStorage.getItem("userToken"));
  console.log(userId.id);

  async function getAllOrders() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId.id}`)
      .then((data) => data)

      .catch((err) => err);
  }
  useEffect(() => {
    (async () => {
      let data = await getAllOrders();
      if (data?.status == "200") {
        setData(data);
        console.log(data);
      } else {
        setData(null);
      }
      setLoading(false);
    })();
  }, []);
  if (loading) return <IsLoading />;
  if (data.data == [] || data == null )
    return <h2 className=" my-5  text-main text-center"> No Orders Yet.</h2>;

  return (
    <>
      {data?.data?.map((item,ind) => {
        return (
          <div key={ind} className="m-3  row pt-2 pb-4 border-bottom align-items-center justify-content-between ">
            <div className="col-md-3">
              <div>
                <h4 className="text-main">Order information:</h4>
                <h6>Order Date: {item?.createdAt}</h6>
                <h6>paid By: {item?.paymentMethodType}</h6>
                <p className="m-0">City: {item?.shippingAddress?.city}</p>
                <p className="m-0">Details: {item?.shippingAddress?.details}</p>
                <p className="m-0">Phone: {item?.shippingAddress?.phone}</p>
                <h6>Shipping Price: {item?.shippingPrice} EGP</h6>

                <h5 className="text-main">
                  Total Price: {item?.totalOrderPrice} EGP
                </h5>
              </div>
            </div>
            <div className="col-md-6">
            <h4 className="text-main">Items: {item.cartItems.length}</h4>
            <Slider {...settings}>
                {item?.cartItems.map((ele,ind) => {
                 return <div className="mt-md-0 mt-2" key={ind}>
                    
                    <img
                      src={ele?.product?.imageCover}
                      alt="product 1"
                      className="w-50"
                    ></img>
                    <p className="m-1">{ele?.product?.title.split(" ").slice(0, 2).join(" ")}</p>
                    <p className="m-1">Price: {ele?.price}</p>
                    <p className="m-1">Count: {ele?.count}</p>
                  </div>;

                })}
                </Slider>

            </div>
          </div>
        );
      })}
    </>
  );
}
