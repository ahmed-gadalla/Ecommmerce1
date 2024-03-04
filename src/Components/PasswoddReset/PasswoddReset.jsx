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
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
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
      email: Yup.string().email().required(),
      newPassword: Yup.string()
        .matches(
          /^[A-Z][a-zA-Z0-9@]{6,}$/,
          "password must be 7 characters or more start with capital letter"
        )
        .required(),
        
    });
    return schema;
  }

  let setNewPass = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  return (
    <>
      <div className="w-75 m-auto my-4">
        <form onSubmit={setNewPass.handleSubmit}>
          <h2 className="py-2">Resaet Password :</h2>

          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}

          <label htmlFor="email">E-maile:</label>
          <input
            onBlur={setNewPass.handleBlur}
            onChange={setNewPass.handleChange}
            type="email"
            name="email"
            className="form-control mb-3 "
            id="email"
          />

          {setNewPass.errors.email && setNewPass.touched.email ? (
            <div className="alert alert-danger">{setNewPass.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">New Password:</label>
          <input
            onBlur={setNewPass.handleBlur}
            onChange={setNewPass.handleChange}
            type="password"
            name="newPassword"
            className="form-control mb-3 "
            id="password"
          />

          {setNewPass.errors.password && setNewPass.touched.password ? (
            <div className="alert alert-danger">{setNewPass.errors.password}</div>
          ) : (
            ""
          )}

          

          <divc className="d-flex">
            <button
              disabled={!(setNewPass.dirty && setNewPass.isValid)}
              className="btn bg-main text-white ms-auto "
              type="submit"
            >
              {loading ? "Reset" : <i className="fa fa-spinner fa-spin"></i>}
            </button>
          </divc>
        </form>
      </div>
    </>
  );
}
