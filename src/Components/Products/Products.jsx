import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import axios from "axios";
import IsLoading from "../IsLoading/IsLoading";
import Product from "../Product/Product";
import { useQuery } from "react-query";

export default function Products() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("getProducts", getProducts);

  const [input, setInput] = useState("");
  const [search, setSearch] = useState([]);
  const serchData = (value) => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => data)
      .then((data) => {
        console.log(data);
        const result = data?.data.filter((item) => {
          return item && item.title && item.title.includes(value);
        });
        console.log(result);
        setSearch(result);
      });
  };
  const handleChange = (value) => {
    setInput(value);
    serchData(value);
  };

  async function getWish() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,

      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }
  let wishListData = useQuery("getWish", getWish);
  let Loading = useQuery("getWish", getWish, {
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  if (wishListData.status == "success") {
    Loading = false;
  }

  if (isLoading || Loading) return <IsLoading />;
  // if (Loading) return <IsLoading />;

  return (
    <>
      <div className="  d-flex justify-content-center align-items-center m-md-5 m-3 mb-md-2 ">
        <i class="fa-solid fa-magnifying-glass fs-5 text-main shado"></i>
        <input
          placeholder="Type product name to search ..."
          type="text"
          className="form-control m-3 shadow"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {!input ? (
        <div className="container-flaod  mt-md-2 mx-md-5 m-1 ">
          <div className="row g-3 mt-1">
            {data?.data?.data.map((item) => {
              return (
                <Product
                  item={item}
                  wishListData={wishListData}
                  key={item._id}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container-flaod  mt-md-2 mx-md-5 m-3 ">
          <div className="row g-3">
            {search.map((item) => {
              return (
                <Product
                  item={item}
                  wishListData={wishListData}
                  key={item._id}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
