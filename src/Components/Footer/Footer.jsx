import React from "react";
import store1 from "../../Assets/Images/google-play.svg";
import store2 from "../../Assets/Images/app-store.svg";
import visa1 from "../../Assets/Images/card-mastercard.svg";
import visa2 from "../../Assets/Images/card-visa.svg";

export default function Footer() {
  return (
    <>
      <div className=" container-fluid bg-light  p-5 shadow flex-grow-1  ">
        <div className="text-md-start text-center">
        <h3>Get the FreshCart app</h3>
        <p className="text-muted mb-0">
          We will send you a link, open it onyour phone to download the app.
        </p>
        </div>
        <div className="row border-bottom justify-content-md-between align-items-md-center">
          <div className="col-md-8 m-md-3 ">
            
              <input type="email " className="  form-control mt-md-0 mt-3" />
              
            
          </div>
          <div className="col-md-3 col-12">
          <button className="btn btn-success w-100 mt-md-0 mt-3">
                Get App Link
              </button>
          </div>
        </div>
        <div className="row border-bottom align-items-center justify-content-lg-between  m-auto text-md-start text-center">
          <div className="col-lg-5">
            <div className="d-md-flex m-3">
              <div className="d-md-flex text-md-start text-center">
                <p className="mb-1 m-md-0">Payment Partner : </p>
                <img className=" rounded-3 ms-2"  src={visa1} alt="payment partner logo" />
                <img className=" rounded-3 ms-2" src={visa2} alt="payment partner logo" />
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="d-md-flex m-3">
              <div className="d-md-flex  text-md-start text-center">
                <p className="mb-1 m-md-0">Get deliveries with FreshCart : </p>
                <img className=" rounded-3 ms-2" src={store2} alt="payment partner logo" />
                <img className=" rounded-3 ms-2" src={store1} alt="payment partner logo" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">Front End Devalopment @ Ahmed-Gadalla</div>
      </div>
    </>
  );
}
