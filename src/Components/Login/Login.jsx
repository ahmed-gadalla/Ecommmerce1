import React, { useContext } from "react";
import { useFormik } from "formik";
import { useState } from "react";

import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Signin() {
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setloading] = useState(true);

  function sendDataToApi(values) {
    setloading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        console.log(data);
        if (data.message == "success") {
          localStorage.setItem("userToken", data.token);
          setUserToken(data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setloading(true);
      });
  }

  function validationSchema() {
    let schema = new Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string()
        .matches(
          /^[A-Z][a-zA-Z0-9@]{6,}$/,
          "password must be 7 characters or more start with capital letter"
        )
        .required(),
    });
    return schema;
  }

  let login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  return (
    <>
      <div className="w-75 m-auto my-4">
        <form onSubmit={login.handleSubmit}>
          <h2 className="py-2">Login :</h2>

          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}

          <label htmlFor="email">E-maile:</label>
          <input
            onBlur={login.handleBlur}
            onChange={login.handleChange}
            type="email"
            name="email"
            className="form-control mb-3 "
            id="email"
          />

          {login.errors.email && login.touched.email ? (
            <div className="alert alert-danger">{login.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password:</label>
          <input
            onBlur={login.handleBlur}
            onChange={login.handleChange}
            type="password"
            name="password"
            className="form-control mb-3 "
            id="password"
          />

          {login.errors.password && login.touched.password ? (
            <div className="alert alert-danger">{login.errors.password}</div>
          ) : (
            ""
          )}

          <p className="m-0">
            <Link
              to={"/forget-password"}
              className=" text-decoration-none ms-auto"
            >
              Forget Password ?
            </Link>
          </p>
          <div className="d-flex align-items-center  justify-content-between pt-2">
            <p className="m-0">
              Don't Have account?{" "}
              <Link to={"/register"} className=" text-decoration-none ">
                Register Now
              </Link>
            </p>
            <button
              disabled={!(login.dirty && login.isValid)}
              className="btn bg-main text-white "
              type="submit"
            >
              {loading ? "Login" : <i className="fa fa-spinner fa-spin"></i>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
