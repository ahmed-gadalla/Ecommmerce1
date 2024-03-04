import React from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import nointernet from '../../Assets/Images/network-signal.png'
export default function Layout() {
  return (
    <div className="d-flex flex-column ">
      <Navbar />
      <div className="py-5 mt-lg-3 mt-3 min-vh-100">
      <Online>
        <Outlet  />
      </Online>
      <Offline>
        <div className=" vh-100 d-flex ">
          <div className="w-50 h-50 m-auto d-flex flex-column justify-content-center align-items-center text-center">
            <img src={nointernet} className="w-25 mb-2" alt="no internet connection" />
            <h6 className=" h4 ">There's no Internet connection !!</h6>
          </div>
          
        </div>
      </Offline>
      </div>
      <Footer />
    </div>
  );
}
