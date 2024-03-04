import { useFormik } from "formik";
import { useState } from "react";

import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setloading] = useState(true);

  function sendDataToApi(values) {
    setloading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      .then(({ data }) => {
        if (data.statusMsg == "success") {
          toast.success(data.message ,{autoClose: 2500});

          navigate("/verify-code");
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
      
    });
    return schema;
  }

  let passForget = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  return (
    <>
      <div className="w-75 m-auto my-4">
        <form onSubmit={passForget.handleSubmit}>
          <h2 className="py-2">Forget Password :</h2>

          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}

          <label htmlFor="email">E-maile:</label>
          <input
            onBlur={passForget.handleBlur}
            onChange={passForget.handleChange}
            type="email"
            name="email"
            className="form-control mb-3 "
            id="email"
          />

          {passForget.errors.email && passForget.touched.email ? (
            <div className="alert alert-danger">{passForget.errors.email}</div>
          ) : (
            ""
          )}

          <div className="d-flex">
            <button
              disabled={!(passForget.dirty && passForget.isValid)}
              className="btn bg-main text-white ms-auto "
              type="submit"
            >
              {loading ? "Submit" : <i className="fa fa-spinner fa-spin"></i>}
            </button>
            </div>
        </form>
      </div>
    </>
  );
}
