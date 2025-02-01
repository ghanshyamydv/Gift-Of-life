import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const loginData = {
  username: "",
  password: "",
};

function Login() {
  const [showPass, setShowPass] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // validation schema-------------------------
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, "Minimum 2 character is required")
      .required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  // ----------------------------------

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: loginData,
      validationSchema: validationSchema,
      onSubmit: async (values, actions) => {
        // Sending data to backend
        try {
          const response = await axios.post(
            "http://localhost:4000/login",
            values
          );
          setResponseMessage(
            "Data submitted successfully: " + JSON.stringify(response.data)
          );
          if (response.status === 200) {
            // Reset the form data
            actions.resetForm();
          } else {
            console.error("Failed to submit data");
          }
        } catch (err) {
          setResponseMessage("Error: " + err.message);
        }
      },
    });

  return (
    <div
      className="container card p-4 shadow w-100 mt-5 mb-5"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="text-center mb-3">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
          />
          {errors.username && touched.username ? (
            <div className="text-danger">{errors.username}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass?"text":"password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />
            {showPass ?
              <BiSolidShow
                onClick={() => {
                  setShowPass(false);
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />:
              <BiSolidHide
                onClick={() => {
                  setShowPass(true);
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            }
          </div>
          {errors.password && touched.password? <div className="text-danger">{errors.password}</div>:null}
        </div>
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
        <p className="text-center mt-3">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </p>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
