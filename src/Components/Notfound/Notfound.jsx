import React from "react";
import style from "./Notfound.module.css";
import noFound from "../../Assets/Images/error.svg";

export default function Notfound() {
  return (
    <>
      <div className="d-flex ">
      <img src={noFound} className="w-50 m-auto py-5" alt="" />
      </div>
    </>
  );
}
