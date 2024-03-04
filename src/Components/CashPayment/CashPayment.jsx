import React, { useContext } from "react";
import { useFormik } from "formik";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../Context/CardContext";

export default function CashPayment() {
  let navigate = useNavigate();

  let { id } = useParams();
  const [loading, setloading] = useState(true);
  let { PayCash, setCounter } = useContext(cartContext);
  console.log(id) ;

  async function sendCashDataToApi(values) {
    setloading(false);
    let data = await PayCash(id, values);
    console.log(data);
    if (data.status == "success") {
      navigate("/allorders");
      setCounter(null);
    }
  }

  let cashpayment = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (values) => {
      sendCashDataToApi(values);
      console.log(values);
    },
  });
  return (
    <>
      <div className="w-75 m-auto my-4">
        <form onSubmit={cashpayment.handleSubmit}>
          <h2 className="py-2">Address Now :</h2>

          <label htmlFor="details">Address Details:</label>
          <textarea
            onBlur={cashpayment.handleBlur}
            onChange={cashpayment.handleChange}
            type="text"
            name="details"
            className="form-control mb-3 "
            id="details"
          ></textarea>

          <label htmlFor="phone">Phone:</label>
          <input
            onBlur={cashpayment.handleBlur}
            onChange={cashpayment.handleChange}
            type="tel"
            name="phone"
            className="form-control mb-3 "
            id="phone"
          />

          <label htmlFor="city">City:</label>
          <input
            onBlur={cashpayment.handleBlur}
            onChange={cashpayment.handleChange}
            type="text"
            name="city"
            className="form-control mb-3 "
            id="city"
          />

          <button
            disabled={!(cashpayment.dirty && cashpayment.isValid)}
            className="btn  bg-main text-white"
            type="submit"
          >
            {loading ? (
              <>
                <i className="fa-regular fa-circle-check pe-2"></i> Place Order{" "}
              </>
            ) : (
              <i className="fa fa-spinner fa-spin"></i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
