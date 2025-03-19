import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";
function AboutPage() {
  const navigate=useNavigate();
  return (
    <div className="container pt-3">
      <h1 className="fw-bold ">About Gift Of Life</h1>

      <p>
        Founded in 2025, Gift Of Life is an organ donation platform dedicated to
        simplifying the process of giving and receiving life-saving organs. We
        bridge the gap between donors and recipients by:
      </p>
      <p>
        <span className="fw-bold">Streamlining the process:</span> We provide a
        user-friendly platform with dedicated registration pages for both donors
        and recipients.
      </p>
      <p>
        <span className="fw-bold">Connecting with ease:</span> Our platform
        facilitates seamless communication between potential donors and
        recipients.
      </p>
      <p>
        <span className="fw-bold">Personalized support:</span> We offer
        personalized notifications to both parties when potential matches arise,
        increasing the chances of successful transplants.
      </p>

      <div className="row custom-understand-page-bg d-flex justify-content-center align-items-center mt-5 p-3">
        <div className="col-sm-12 col-md p-5">
          <h2 className="fw-bold">Our Mission</h2>
          <p className="fs-5 fs-3 fw-bold">To make
          <span className="highlight-text"> organ</span> donation accessible and efficient for everyone, fostering
          a compassionate community that <span className="highlight-text">saves lives</span>.
          </p>
        </div>
        <div className="col-sm-12 col-md">
          <img src="./images/make-donation-easy.png" alt="man-woman-image" style={{width:"100%"}} />
        </div>
      </div>

      <div className="row mt-5 custom-understand-page-bg border mb-5 d-flex justify-content-center align-items-center p-3">
        <div className="col-sm-6 col-md-3">
          <img src="./images/deliver-organ.png" alt="donor-man-image" style={{width:"100%"}} />
        </div>
        <div className="col-sm-12 col-md-5">
        <h2 className="fw-bold ">Our Vision</h2>
          <p className="fs-3 fw-bold">
          A world where every person in need of an organ finds a <span className="highlight-text">timely</span> and
          compassionate donor.
          </p>
        </div>
        <div className="col-sm-6 col-md-4">
          <img src="./images/transplant-organ.png" alt="donor-man-image" style={{width:"100%"}}/>
        </div>
      </div>

      <div className="row mb-5 border text-center p-3">
        <h2 className="p-2 fw-bold">Achievements</h2>
        <div className="col text-center">
          <div
            className="card p-2 d-flex justify-content-center align-items-center"
            style={{ height: "300px" }}
          >
            <img
              src="./images/conected-people.png"
              alt="save-life-image"
              style={{ width: "160px" }}
            />
            <p>
              [Demo 1] Successfully connected [Number] potential donors with
              recipients in need.
            </p>
          </div>
        </div>
        <div className="col text-center">
          <div
            className="card p-2 d-flex justify-content-center align-items-center"
            style={{ height: "300px" }}
          >
            <img
              src="./images/registration-process.png"
              alt="quality-life-image"
              style={{ width: "160px" }}
            />
            <p>
              [Demo 2] Streamlined the registration process for over [Number]
              individuals.
            </p>
          </div>
        </div>
        <div className="col text-center">
          <div
            className="card p-2 d-flex justify-content-center align-items-center"
            style={{ height: "300px" }}
          >
            <img
              src="./images/awarness.png"
              alt="donation-impact-image"
              style={{ width: "220px" }}
            />
            <p>
              [Demo 3] Raised awareness about organ donation through [Number]
              community outreach events.
            </p>
          </div>
        </div>
      </div>
      <h2 className="fw-bold">Addressing Your Concerns:</h2>

      <p>
        We understand the complexities of current organ donation systems. Many
        platforms present cumbersome interfaces and lack transparency. Our
        platform aims to:
      </p>

      <p>
        <span className="fw-bold">Simplify the process:</span> We make it easy
        for individuals to register and express their donation preferences,
        including the option to donate for free or with financial compensation.
      </p>
      <p>
        <span className="fw-bold">Humanize the experience:</span>We provide a
        space for recipients to share their stories, fostering empathy and
        understanding within the community.
      </p>

      <div className="row mb-5">
      <div className="col-7">
      <h2 className="fw-bold">Call to Action:</h2>
      <p>
        <span className="fw-bold">Become a Donor:</span>Register today and join
        the Gift Of Life community in saving lives.
      </p>
      <p>
        <span className="fw-bold">Volunteer:</span>Share your time and skills to
        support our mission.
      </p>
      <p>
        <span className="fw-bold">Spread Awareness:</span>Educate your friends
        and family about the importance of organ donation.
      </p>
      </div>
      <div className="col-xs-6 col-sm-6 col-lg d-flex flex-column justify-content-center ">
        <img src="./images/volunteer-donor.png" alt="" style={{width:"100%"}} />
        <div className="text-center mt-2"><button className="custom-link fs-5 btn btn-success text-white fw-semibold" onClick={()=>{navigate("/register-donor")}}>Be a Hero-Register Now</button></div>
      </div>
      </div>
    </div>
  );
}

export default AboutPage;
