import React, { useContext } from "react";
import { useFormik } from "formik";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { cartContext } from "../Context/CardContext";

export default function Address() {
  let { id } = useParams();
  const [loading, setloading] = useState(true);
  let { Pay } = useContext(cartContext);
  async function sendDataToApi(values) {
    setloading(false);
    let data = await Pay(id, values);
    console.log(data);
    if (data.status == "success") {
      console.log(data.session.url);
      window.location.href = data.session.url;
    }
  }

  let address = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  return (
    <>
      <div className="w-75 m-auto my-4">
        <form onSubmit={address.handleSubmit}>
          <h2 className="py-2">Address Now :</h2>

          <label htmlFor="details">Address Details:</label>
          <textarea
            onBlur={address.handleBlur}
            onChange={address.handleChange}
            type="text"
            name="details"
            className="form-control mb-3 "
            id="details"
          ></textarea>

          <label htmlFor="phone">Phone:</label>
          <input
            onBlur={address.handleBlur}
            onChange={address.handleChange}
            type="tel"
            name="phone"
            className="form-control mb-3 "
            id="phone"
          />

          <label htmlFor="city">City:</label>
          <input
            onBlur={address.handleBlur}
            onChange={address.handleChange}
            type="text"
            name="city"
            className="form-control mb-3 "
            id="city"
          />

          <button
            disabled={!(address.dirty && address.isValid)}
            className="btn  bg-main text-white"
            type="submit"
          >
            {loading ? (
              <>
                <i className="fa-regular fa-circle-check pe-2"></i> Pay
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
