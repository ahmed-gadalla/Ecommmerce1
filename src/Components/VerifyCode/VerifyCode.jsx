import { useFormik } from "formik";
import { useState } from "react";

import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyCode() {
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setloading] = useState(true);

  function sendDataToApi(values) {
    setloading(false);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then(({ data }) => {
        console.log(data);
        if (data.status == "Success") {
          navigate("/password-reset");
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setloading(true);
      });
  }

  let verify = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  return (
    <>
      <div className="w-75 m-auto my-4">
        <form onSubmit={verify.handleSubmit}>
          <h2 className="py-2">Verify Code :</h2>

          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}

          <label htmlFor="code">Code:</label>
          <input
            onBlur={verify.handleBlur}
            onChange={verify.handleChange}
            type="text"
            name="resetCode"
            className="form-control mb-3 "
            id="code"
          />

          <div className="d-flex">
            <button
              disabled={!(verify.dirty && verify.isValid)}
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
