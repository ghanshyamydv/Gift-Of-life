import React from "react";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="container mt-3">
      <div className="row bg-primary-subtle text-center p-3">
        <h2 className="fw-bold">The Need is Critical</h2>
        <p className="fs-5">
          Right now, thousands of people are waiting for a life-saving organ
          transplant. You can help change that by registering today.
        </p>

        <p className="fs-5">
          There are currently over 100,000 people on the transplant waiting list
          in the U.S.
        </p>

        <p className="fs-5">18 people die every day waiting for a transplant.</p>
        <div className="text-center mt-2"><Link className="custom-link fs-5 btn btn-success text-white fw-semibold" to="register-donor">Be a Hero-Register Now</Link></div>
      </div>
      
    </div>
  );
}

export default Hero;
