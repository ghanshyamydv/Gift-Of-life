import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUserId} = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // Loading state

  const navigate=useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try{
        const response = await axios.post(
            "http://localhost:4000/api/resetpassword",
            {email}
          );
        // Simulate sending OTP to the email
    setMessage(`OTP has been sent to ${email}`);
    setErrorMessage("");
    setShowOtpField(true); // Show the OTP input field
    }catch(err){
        // Simulate sending OTP to the email
        setErrorMessage(err.response.data.message);
        setShowOtpField(false); // Show the OTP input field
    }finally{
      setLoading(false);
    }
  };

  const handleVerifyOtp = async(e) => {
    e.preventDefault();
    setLoading(true);
    try{
        const response = await axios.post(
            "http://localhost:4000/api/resetpassword",
            {otp}
          );
          setUserId(response.data.userId)
          setMessage("OTP verified! You can now reset your password.");
          setTimeout(()=>{
            navigate("/set-newpassword");
          },2000)
          
    }catch(err){
        setMessage("Invalid OTP. Please try again.");
    }finally{
      setTimeout(()=>{
        setLoading(false);
      },2000)
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Reset Password</h2>
              {!showOtpField ? (
                // Step 1: Enter email to receive OTP
                <form onSubmit={handleSendOtp}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                  {loading ? (
                  // Loading spinner and animation
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="ms-2">Sending OTP...</span>
                  </div>
                ) : (
                  'Send OTP'
                )} 
                  </button>
                </form>
              ) : (
                // Step 2: Enter OTP for verification
                <form onSubmit={handleVerifyOtp}>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      placeholder="Enter the OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                  {loading ? (
                  // Loading spinner and animation
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="ms-2">Verifying OTP...</span>
                  </div>
                ) : (
                  'Verify OTP'
                )} 
                  </button>
                </form>
              )}
              {message && (
                <div className="alert alert-info mt-3" role="alert">
                  {message}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;