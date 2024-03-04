import React from "react";
import IsLoading from "../IsLoading/IsLoading";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Categories() {
  function getAllSubCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, isLoading } = useQuery("getAllSubCategory", getAllSubCategory);
  if (isLoading) return <IsLoading />;

  return (
    <>
      <div className="container-fload d-flex ">
        <div className="row g-3 m-3 ">
          {data?.data?.data.map((ele, ind) => {
            return (
              <div key={ele._id} className="col-lg-2 col-md-4 col-6  ">
                <div className="rounded-3 product d-flex text-center">
                  <div className="m-auto">
                    <Link
                      className=" text-decoration-none text-main py-3 "
                      to={"/category-details/" + ele._id}
                    >
                      <img
                        src={ele?.image}
                        alt="categories photos"
                        className="imgaCat rounded-3 my-2"
                      />
                      <p>{ele?.name}</p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
