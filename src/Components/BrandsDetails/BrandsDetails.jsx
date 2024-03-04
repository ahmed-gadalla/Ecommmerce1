import React from "react";
import { useQuery } from "react-query";
import IsLoading from "../IsLoading/IsLoading";
import axios from "axios";
import Product from "../Product/Product";
import { useParams } from "react-router-dom";

export default function BrandsDetails() {
  let x = useParams();
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("getProducts", getProducts);
  if (isLoading) return <IsLoading />;
  return (
    <>
      <div className="container-flaod  mt-5 mx-lg-5 m-2  row g-3">
        {data?.data?.data
          .filter((product) => product.brand._id === x.id)
          .map((filteredProduct) => (
            <Product item={filteredProduct} key={filteredProduct._id} />
          ))}
      </div>
    </>
  );
}
