import React, { useEffect, useState } from "react";
import style from "./SubSlider.module.css";
import axios from "axios";
import IsLoading from "../IsLoading/IsLoading";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

export default function SubSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  function getAllSubCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, isLoading } = useQuery("getAllSubCategory", getAllSubCategory);

  
  if (isLoading) return <IsLoading />;
  
  return (
    <>
      <h4 className="mt-4 mx-3">Shop Popular Categories : </h4>
      <Slider {...settings}>
        {data?.data?.data.map((ele, ind) => {
          return (
            <Link  key={ele._id} className=" text-decoration-none text-main py-3 text-center d-flex " to={"/category-details/" +  ele._id}>
            <div className="m-auto product rounded-3 p-2">
              <img src={ele?.image} alt="categories photos -2" className="imgaSlider rounded" />
              <p className="pt-1">{ele?.name}</p>

            </div>
            </Link>
          );
        })}
      </Slider>{" "}
    </>
  );
}
