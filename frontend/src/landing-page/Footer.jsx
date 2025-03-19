import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

import { MdAddCall } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

function Footer() {
  return (
    <div style={{backgroundColor:"rgb(0, 74, 99)"}}>
      <div className="container text-white">
        <div className="row border-bottom mb-3 mt-3">
          <div className="col">
            <img
              src="/images/web-logo.png"
              alt="logo"
              style={{ width: "120px" }}
            />
          </div>
          <div className="col"></div>
          <div className="col">
            <h3 className="mt-2 mb-3">Follow Us</h3>
            <img src="/images/fb.png" alt="fb-logo" className="social-ac" />
            <img
              src="/images/insta.png"
              alt="insta-logo"
              className="social-ac"
            />
            <img src="/images/x.png" alt="x-logo" className="social-ac" />
            <img src="/images/yt.png" alt="yt-logo" className="social-ac" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>
              Gift of Life is a dedicated platform promoting organ donation to
              save and transform lives. Join us in spreading hope by donating
              organs and making a lasting impact. Together, we can give the
              ultimate gift - the gift of life.
            </p>
          </div>
          <div className="col">
            <h3>Important Links</h3>
            <p>
              <Link className="custom-link text-white" to="/">
                Home
              </Link>
            </p>
            <p>
              <Link className="custom-link text-white" to="about">
                About Us
              </Link>
            </p>
            <p>
              <Link className="custom-link text-white" to="understand-donation">
                Understand Donation
              </Link>
            </p>
          </div>
          <div className="col">
            <h3>Contact & Connect</h3>
            <p>
              <MdAddCall /> 8147806410
            </p>
            <p>
              <IoMdMail /> giftoflife@gmail.com
            </p>
            <p>
              <FaLocationDot /> Gift Of Life, Acharya College Rd,
              Soladevanahalli, Bengaluru, Karnataka 560107
            </p>
          </div>
        </div>
        <div className="row">
          <p>
            Terms & Condition | Privacy Policy | &copy; Copyright 2025 Gift Of
            Life. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
