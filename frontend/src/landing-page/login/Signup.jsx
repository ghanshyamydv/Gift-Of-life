import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
const signupData={
  username: "",
  email: "",
  password: "",
  confirmPassword:"",
  category: "",
};

function Signup() {

    const [showPass, setShowPass] = useState(false);
    const [responseMessage, setResponseMessage] = useState();

    // validation schema-------------------------
    const validationSchema=Yup.object({
      username:Yup.string().min(2, "Minimum 2 character is required").required("Username is required"),
      email:Yup.string().required("Email is required").email("Invalid email Format"),
      password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one symbol"
          )
          .matches(/[0-9]/, "Password must contain at least one number")
          .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
          .matches(/[a-z]/, " Password must contain at least one lowercase letter"),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
      category:Yup.string().required("Category is required")
    })

    // ----------------------------------
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: signupData,
      validationSchema: validationSchema,
      onSubmit: async (values, actions) => {
          // Sending data to backend
          try {
            const response = await axios.post("http://localhost:4000/signup",values);
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
        <div className="container card p-4 shadow w-100 mt-5 mb-5" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-3">Sign Up</h2>
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
            <label className="form-label">Email</label>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />
            {errors.email && touched.email ? (
            <div className="text-danger">{errors.email}</div>
          ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div style={{position:"relative"}}>
            <input
              type={showPass?"text":"password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />{showPass ?
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

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div style={{position:"relative"}}>
            <input
              type={showPass?"text":"password"}
              name="confirmPassword"
              value={values.confirmPassword}
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
            {errors.confirmPassword && touched.confirmPassword? <div className="text-danger">{errors.confirmPassword}</div>:null}
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-select"
            >
              <option value="" disabled>Select Category</option>
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
            </select>
            {errors.category && touched.category?<div className="text-danger" >{errors.category}</div>:null}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
      );
}

export default Signup
