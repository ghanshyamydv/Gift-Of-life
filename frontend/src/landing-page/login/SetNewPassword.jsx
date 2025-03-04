import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router';
import { AuthContext } from "../../AuthProvider";

const initialPassword={
  password: "",
  confirmPassword:"",
};

const ResetPassword = () => {
    const [showPass, setShowPass] = useState(false);
    const [responseMessage, setResponseMessage] = useState();
    const navigate=useNavigate();
    const { userId} = useContext(AuthContext);
    
  // validation schema-------------------------
  const validationSchema=Yup.object({
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
  })

  // ----------------------------------
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues: initialPassword,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
        // Sending data to backend
        try {
          const response = await axios.post(`http://localhost:4000/setnewpassword/${userId}`,values);
          setResponseMessage(
            "Data submitted successfully: " + JSON.stringify(response.data)
          );
          if (response.status === 200) {
            // Reset the form data
            actions.resetForm();
            navigate("/login");
          } else {
            console.error("Failed to submit data");
          }
        } catch (err) {
          setResponseMessage("Error: " + err.message);
        }
    },
  });

  console.log(userId);
  useEffect(()=>{
    if(!userId){
      navigate("/login");
    }
  },[userId])
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="username" autoComplete="username" style={{display:"none"}}/>
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              autoComplete="new-password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.password && touched.password?<p className="text-danger">{errors.password}</p>:null}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              autoComplete="new-password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          {errors.confirmPassword && touched.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}

          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
