import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../AuthProvider";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { toast } from 'react-toastify';

const loginData = {
  username: "",
  password: "",
};

function Login() {
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate= useNavigate();
  const { backendUrl,login,isLoggedIn} = useContext(AuthContext);
    useEffect(()=>{
      if(!isLoggedIn){
        navigate("/login")
      }else{
        navigate("/")
      }
    },[isLoggedIn, navigate])

  // validation schema-------------------------
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Minimum 3 character is required")
      .required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  // --------------------------------------------

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: loginData,
      validationSchema: validationSchema,
      onSubmit: async (values, actions) => {
        // Sending data to backend
        try {
          const response = await axios.post(
            `${backendUrl}/api/login`,
            values
          );
          // setResponseMessage(response.data.message);
          login(response.data.token);
          // Reset the form data
          actions.resetForm();
          navigate("/");
          toast.success(response.data.message);
          
        } catch (err) {
          actions.resetForm();
          navigate("/login");
          setErrorMessage(err.response.data.message);
        }
      },
    });
    
  return (
    <div
      className="container card p-4 shadow w-100 mt-5 mb-5"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="text-center mb-3">Login</h2>
      <div className="text-danger text-center">{errorMessage}</div>
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
            autoComplete="username"
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
              autoComplete="current-password"
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
