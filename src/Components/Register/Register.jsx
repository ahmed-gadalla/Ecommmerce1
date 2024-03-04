import React from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import { useState } from "react";

import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setloading] = useState(true);

  function sendDataToApi(values) {
    setloading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        console.log(data);
        if (data.message == "success") {
          navigate("/login");
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setloading(true);
      });
  }

  function validationSchema() {
    let schema = new Yup.object({
      name: Yup.string().min(2).max(20).required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .matches(
          /^[A-Z][a-zA-Z0-9@]{6,}$/,
          "password must be 7 characters or more start with capital letter"
        )
        .required(),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "password must match")
        .required(),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/)
        .required(),
    });
    return schema;
  }

  let signup = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  return (
    <>
      <div className="w-75 m-auto my-4">
        <form onSubmit={signup.handleSubmit}>
          <h2 className="py-2">Register Now :</h2>

          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}

          <label htmlFor="name">Name:</label>
          <input
            onBlur={signup.handleBlur}
            onChange={signup.handleChange}
            type="text"
            name="name"
            className="form-control mb-3 "
            id="name"
          />

          {signup.errors.name && signup.touched.name ? (
            <div className="alert alert-danger">{signup.errors.name}</div>
          ) : (
            ""
          )}

          <label htmlFor="email">E-maile:</label>
          <input
            onBlur={signup.handleBlur}
            onChange={signup.handleChange}
            type="email"
            name="email"
            className="form-control mb-3 "
            id="email"
          />

          {signup.errors.email && signup.touched.email ? (
            <div className="alert alert-danger">{signup.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password:</label>
          <input
            onBlur={signup.handleBlur}
            onChange={signup.handleChange}
            type="password"
            name="password"
            className="form-control mb-3 "
            id="password"
          />

          {signup.errors.password && signup.touched.password ? (
            <div className="alert alert-danger">{signup.errors.password}</div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">Re-Password:</label>
          <input
            onBlur={signup.handleBlur}
            onChange={signup.handleChange}
            type="password"
            name="rePassword"
            className="form-control mb-3 "
            id="rePassword"
          />

          {signup.errors.rePassword && signup.touched.rePassword ? (
            <div className="alert alert-danger">{signup.errors.rePassword}</div>
          ) : (
            ""
          )}

          <label htmlFor="phone">Phone:</label>
          <input
            onBlur={signup.handleBlur}
            onChange={signup.handleChange}
            type="tel"
            name="phone"
            className="form-control mb-3 "
            id="phone"
          />

          {signup.errors.phone && signup.touched.phone ? (
            <div className="alert alert-danger">{signup.errors.phone}</div>
          ) : (
            ""
          )}

          <div className=" d-flex">
            <button
              disabled={!(signup.dirty && signup.isValid)}
              className="btn bg-main text-white ms-auto"
              type="submit"
            >
              {loading ? "Singnup" : <i className="fa fa-spinner fa-spin"></i>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
