import React from "react";
import "./Understand.css";
import { Link } from "react-router-dom";
import LivingOrgan from "./LivingOrgan";
import Benefits from "./Benefits";
function UnderstandDonationPage() {
  return (
    <div className="container">
      <p>
        Organ donation is the process of giving an organ or a part of an organ
        to save or improve someone’s life. One donor can save up to eight lives
        through organ transplantation. Donors can choose to donate their organs
        after death (deceased donation) or during their lifetime (living
        donation).
      </p>
      <div className="row mb-5 border text-center p-3">
        <h2 className="p-3 fw-bold">Why Organ Donation Matters</h2>
        <p>
          Every day, people across the country are waiting for a life-saving
          organ transplant. Your decision to donate can give someone the chance
          to live, see their family, and fulfill their dreams. One organ donor
          can save up to 8 lives and enhance the lives of many more.
        </p>
        <div className="col text-center">
          <div className="card p-3 d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
            <img src="./images/save-life.png" alt="save-life-image" style={{ width:"150px"}}/>
            <p>Your organs could save someone’s life.</p>
          </div>
        </div>
        <div className="col text-center">
          <div className="card p-3 d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <img src="./images/quality-life.jpg" alt="quality-life-image" style={{width:"150px"}}/>
            <p>Even non-life-saving donations, like corneas, improve the quality of life.</p>
          </div>
        </div>
        <div className="col text-center">
          <div className="card p-3 d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
            <img src="./images/impact.png" alt="donation-impact-image" style={{width:"150px"}}/>
            <p>Every donor’s choice makes an impact.</p>
          </div>
        </div>
      </div>
      <h2>What Can Be Donated?</h2>
      <ul>
        <li className="u-list">
          Organs: Heart, lungs, liver, kidneys, pancreas, intestines.
        </li>
        <li className="u-list">
          Tissues: Corneas, skin, heart valves, tendons, and bones.
        </li>
        <li className="u-list">
          Living Donation: Kidneys, a part of the liver, and a portion of the
          lung.
        </li>
      </ul>

      <h2>How Does the Process Work?</h2>
      <ul>
        <li className="u-list">
          Registration: Pledge to be an organ donor through your country’s organ
          donor registry or your website.
        </li>
        <li className="u-list">
          After Death: Doctors determine eligibility based on the donor’s
          medical condition.
        </li>
        <li className="u-list">
          Matching: The recipient is selected based on medical need,
          compatibility, and urgency.
        </li>
      </ul>

      <div className="row p-3 text-center ">
        <h2>Clearing Up the Myths</h2>

        <div className="card p-3 mt-3 mb-3">
          <h3>Myth 1: "I’m too old to donate."</h3>
          <p>
            Fact: Age doesn’t necessarily limit your ability to donate. Many
            people in their 60s or even 70s have donated successfully.
          </p>
        </div>

        <div className="card p-3 mt-3 mb-3">
          <h3>
            Myth 2: "Doctors won’t try as hard to save my life if I’m a donor."
          </h3>
          <p>
            Fact: Doctors and transplant teams work tirelessly to save all
            patients, regardless of their donation status.
          </p>
        </div>

        <div className="card p-3 mt-3 mb-3">
          <h3>Myth 3: "Organ donation is only for rich or famous people."</h3>
          <p>
            Fact: Anyone can be a donor, regardless of their background or
            status.
          </p>
        </div>
      </div>

      <h2>Benefits of Organ Donation</h2>
      <ul>
        <li className="u-list">
          Save lives and improve the quality of life for recipients.
        </li>
        <li className="u-list">
          Bring hope to families of recipients and inspire others to donate.
        </li>
        <li className="u-list">
          Leave behind a legacy of kindness and compassion.
        </li>
      </ul>

      <LivingOrgan />
      <Benefits />
      <div className="row mb-5 border text-center p-3">
        <h2 className="p-3 fw-bold">Steps to Become an Organ Donor</h2>
        <p>
          Becoming an organ donor takes just a few minutes. Simply follow the
          steps below. Once you register, your decision is legally binding, and
          your loved ones will have peace of mind knowing your wishes.
        </p>
        <div className="col text-center">
          <div className="card p-3 " style={{ height: "200px" }}>
            <h3>Step 1: Register Online</h3>
            <p>Fill out a simple form to sign up.</p>
          </div>
        </div>
        <div className="col text-center">
          <div className="card p-3" style={{ height: "200px" }}>
            <h3>Step 2: Share Your Decision</h3>
            <p>FLet your family know about your decision.</p>
          </div>
        </div>
        <div className="col text-center">
          <div className="card p-3" style={{ height: "200px" }}>
            <h3>Step 3: Carry Your Donor Card</h3>
            <p>Keep your card in your wallet or on your phone.</p>
          </div>
        </div>
        <div className="text-center mt-5">
          {" "}
          <Link
            className="custom-link fs-5 btn btn-success text-white fw-semibold"
            to="register-donor"
          >
            Register to be a Donor
          </Link>
        </div>
      </div>
      <div className="row custom-understand-page-bg d-flex justify-content-center align-items-center">
        <div className="col p-5">
          <p className="fs-5">
            If you would like to help someone you know through living directed
            donation, talk to them and contact the transplant program where the
            person is listed. If you would like to help someone you do not know
            by being a living non-directed donor, contact a transplant hospital
            of your choice and ask if they have such a donation program.
          </p>
        </div>
        <div className="col">
          <img src="./images/living-donor-woman.png" alt="man-woman-image" />
        </div>
      </div>
    </div>
  );
}

export default UnderstandDonationPage;
