import React, { useState } from "react";
import OrganDetails from "./OrganDetails";
import axios from "axios";

function DonorRegister() {
  const [moneyInput, setMoneyInput] = useState(false);
  const [someOrgan, setSomeOrgan] = useState(false);
  const [organsAndTissuesData, setOrgansAndTissuesData]=useState([]);
  const [otherOrgans, setOtherOrgans] = useState({otherOrganTissue:""});

  const [responseMessage, setResponseMessage] = useState("");

  let [donorDetails, setDonorDetails] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    email: "",
    phoneNumber: "",
    emergencyContact: {
      name: "",
      donorRelationship: "",
      email: "",
      phoneNumber: "",
    },
    organsAndTissues:[],
    consent:false,
    signature: "",
    date: "",
    witnessDetail: {
      name: "",
      donorRelationship: "",
      signature: "",
    },
    medicalPractitioner: {
      name: "",
      role: "",
      signature: "",
    },
    religious: "",
    conditions: "",
    notes: "",
    donationAmount:0,
    photo: null,
    citizenship: null,
    confirmation:false
  });


  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    // If the field is a checkbox, we use checked value
    const updatedValue = type === "checkbox" ? checked : value;

    setDonorDetails((prevDetails) => {
      const keys = name.split(".");  // To handle nested fields
      if (keys.length > 1) {
        // If the name is for a nested field (e.g. address.street)
        return {
          ...prevDetails,
          [keys[0]]: {
            ...prevDetails[keys[0]],
            [keys[1]]: updatedValue,  // Update the nested field
          },
        };
      }

      // For non-nested fields (e.g. fullName, age, consent)
      if(name==="photo" || name === "citizenship"){
        return {
          ...prevDetails,
          [name]: files[0]
        }
    }else {
        return {
        ...prevDetails,
        [name]: updatedValue
      };}

    });
  };


  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(!someOrgan){
      donorDetails={...donorDetails,organsAndTissues:["all organs and tissue after death"]}
    }else{
      donorDetails={...donorDetails,organsAndTissues:[...organsAndTissuesData,otherOrgans]}
    }

    const formData = new FormData();

    // Loop through donorDetails and append each property
    Object.entries(donorDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

// const formDataObj = Object.fromEntries(formData.entries());
// console.log(formDataObj);


// sending data to backend
    try {
      const response = await axios.post(
        "http://localhost:4000/donor-register", // Example API
        formData,
        {
          headers:{"Content-type": "multipart/form-data"},
        }
      );
      setResponseMessage("Data submitted successfully: " + JSON.stringify(response.data));
    } catch (err) {
      setResponseMessage("Error: " + err.message);
    }
    
  }

  return (
    <div className="container">
      <h1>Register a decision to donate</h1>
      <p>
        Your decision to donate can save and transform lives. Thank you for
        making this selfless choice. Fields marked * are mandatory
      </p>
      <h3>Personal Information</h3>
      <hr />
      <form action="" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-7 mb-3">
            <label htmlFor="full-name" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="full-name"
              name="fullName"
              value={donorDetails.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="birth-date" className="form-label">
              Date of birth *
            </label>
            <input
              type="date"
              className="form-control border-dark"
              id="birth-date"
              name="dateOfBirth"
              value={donorDetails.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-5">
            <label className="form-label">Gender *</label>
            <div className="form-check">
              <input
                className="form-check-input border-dark"
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input border-dark"
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input border-dark"
                type="radio"
                name="gender"
                id="other"
                value="other"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div>
          </div>

          <h3>Address</h3>
          <div className="col-7 mb-3">
            <label htmlFor="street" className="form-label">
              Street *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="street"
              name="address.street"
              value={donorDetails.address.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="city" className="form-label">
              city *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="city"
              name="address.city"
              value={donorDetails.address.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="state/province" className="form-label">
              State/Province *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="state/province"
              name="address.state"
              value={donorDetails.address.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-3">
            <label htmlFor=" zip/postal-code" className="form-label">
              {" "}
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="zip/postal-code"
              name="address.zipCode"
              value={donorDetails.address.zipCode}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-7 mb-3">
            <label htmlFor="country" className="form-label">
              Country *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="country"
              name="address.country"
              value={donorDetails.address.country}
              onChange={handleInputChange}
            />
          </div>

          <h3>Your Contact Details</h3>
          <hr />
          <div className="mb-3 col-7">
            <label htmlFor="email" className="form-label">
              Email address *
            </label>
            <input
              type="email"
              className="form-control border-dark"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={donorDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 col-7">
            <label htmlFor="mobile-number" className="form-label">
              Mobile Number *
            </label>
            <input
              type="number"
              className="form-control border-dark"
              id="mobile-number"
              name="phoneNumber"
              value={donorDetails.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <h3>Emergency Contact Details</h3>
          <hr />
          <div className="col-7 mb-3">
            <label htmlFor="emergency-fullname" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="emergency-full-name"
              name="emergencyContact.name"
              value={donorDetails.emergencyContact.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="relationship" className="form-label">
              Relationship *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="relationship"
              name="emergencyContact.donorRelationship"
              value={donorDetails.emergencyContact.donorRelationship}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 col-7">
            <label htmlFor="emergency-email" className="form-label">
              Email address *
            </label>
            <input
              type="email"
              className="form-control border-dark"
              id="emergency-email"
              name="emergencyContact.email"
              placeholder="name@example.com"
              value={donorDetails.emergencyContact.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 col-7">
            <label htmlFor="emergency-mobile-number" className="form-label">
              Phone Number *
            </label>
            <input
              type="number"
              className="form-control border-dark"
              id="emergency-mobile-number"
              name="emergencyContact.phoneNumber"
              value={donorDetails.emergencyContact.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <h3>Donation Preferences </h3>
          <hr />

          <div className="col-7 mb-5">
            <label className="form-label">I Want to donate *</label>
            <div className="form-check">
              <input
                className="form-check-input border-dark"
                type="radio"
                name="organsAndTissues"
                id="all-organ"
                onClick={() => {
                  setSomeOrgan(false);
                }}
              />
              <label className="form-check-label" htmlFor="all-organ">
                I would like to donate all my organs and tissues after my death
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input border-dark"
                type="radio"
                name="organsAndTissues"
                id="some-organ"
                value=""
                onClick={() => {
                  setSomeOrgan(true); 
                }}
              />
              <label className="form-check-label" htmlFor="some-organ">
                I would like to specify the organs and tissues I wish to donate
                (select all that apply):
              </label>
              <br />
              {someOrgan && <OrganDetails organsAndTissuesData={organsAndTissuesData} setOrgansAndTissuesData={setOrgansAndTissuesData} otherOrgans={otherOrgans} setOtherOrgans={setOtherOrgans}/>}
            </div>
          </div>
          <h3>Consent Declaration *</h3>
          <hr />
          <div className="form-check mb-3">
            <input
              className="form-check-input border-dark"
              type="checkbox"
              id="consent"
              name="consent"
              checked={donorDetails.consent}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="consent">
              By filling this form, I declare that:
            </label>
            {donorDetails.consent && (
              <ul>
                <li>
                  I am of sound mind and voluntarily wish to donate my organs
                  and tissues upon my death.
                </li>
                <li>
                  I understand that this decision is revocable at any time, and
                  I can withdraw my consent by notifying the appropriate
                  authority.
                </li>
                <li>
                  I have discussed this decision with my family or loved ones to
                  ensure they are aware of my wishes.{" "}
                </li>
                <li>
                  {" "}
                  I authorize the medical institution or relevant authority to
                  act upon this document in accordance with local laws and
                  regulations.{" "}
                </li>
              </ul>
            )}
          </div>
          <h3>Signature*</h3>
          <div className="col-7 mb-3">
            <label htmlFor="donor-signature" className="form-label">
              Donor Signature *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="donor-signature"
              name="signature"
              value={donorDetails.signature}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="registeration-date" className="form-label">
              Date *
            </label>
            <input
              type="date"
              className="form-control border-dark"
              id="registeration-date"
              name="date"
              value={donorDetails.date}
              onChange={handleInputChange}
            />
          </div>

          <h3>Witness/Authorized Representative *</h3>
          <p>
            A witness is required to confirm the donor’s consent. This could be
            a family member, legal representative, or someone else authorized
            under local laws.
          </p>
          <div className="col-7 mb-3">
            <label htmlFor="emergency-fullname" className="form-label">
              Witness Name *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="emergency-full-name"
              name="witnessDetail.name"
              value={donorDetails.witnessDetail.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="donor-relationship" className="form-label">
              Relationship to Donor *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="donor-relationship"
              name="witnessDetail.donorRelationship"
              value={donorDetails.witnessDetail.donorRelationship}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="witness-signature" className="form-label">
              Witness Signature *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="witness-signature"
              name="witnessDetail.signature"
              value={donorDetails.witnessDetail.signature}
              onChange={handleInputChange}
            />
          </div>

          <h3>Medical Practitioner/Organization Confirmation (Optional)</h3>
          <p>
            Optional section if verified by an official medical practitioner or
            organization representative.
          </p>
          <div className="col-7 mb-3">
            <label htmlFor="practitioner-fullname" className="form-label">
              Name of Practitioner/Representative
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="emergency-full-name"
              name="medicalPractitioner.name"
              value={donorDetails.medicalPractitioner.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="practitioner-role" className="form-label">
              Title/Role
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="practitioner-role"
              name="medicalPractitioner.role"
              value={donorDetails.medicalPractitioner.role}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="practitioner-signature" className="form-label">
              Signature
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="practitioner-signature"
              name="medicalPractitioner.signature"
              value={donorDetails.medicalPractitioner.signature}
              onChange={handleInputChange}
            />
          </div>

          <h3>Additional Information (Optional)</h3>
          <div className="col-7 mb-3">
            <label htmlFor="relegion" className="form-label">
              Religious/Personal Beliefs:
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="relegion"
              name="religious"
              value={donorDetails.religious}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="conditions" className="form-label">
              Any Restrictions or Conditions:
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="conditions"
              name="conditions"
              value={donorDetails.conditions}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="notes" className="form-label">
              Notes or Special Instructions:
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="notes"
              name="notes"
              value={donorDetails.notes}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-7 mb-5 mt-3">
            <label className="form-label">I Want to donate *</label>
            <div className="form-check">
              <input
                className="form-check-input border-dark"
                type="radio"
                id="for-free"
                name="donationAmount"
                value={0}
                onChange={handleInputChange}
                onClick={() => {
                  setMoneyInput(false);
                }}
              />
              <label className="form-check-label" htmlFor="for-free">
                For Free
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input border-dark"
                type="radio"
                id="for-money"
                name="donationAmount"
                value={0}
                onChange={handleInputChange}
                onClick={() => {
                  setMoneyInput(true);
                }}
              />
              <label className="form-check-label" htmlFor="for-money">
                For Money
              </label>
              <br />
              {moneyInput === true && (
                <input
                  type="number"
                  min="0"
                  name="donationAmount"
                  placeholder="Enter your amount here.."
                  value={donorDetails.donationAmount}
                  onChange={handleInputChange}
                />
              )}
            </div>
            <div className="col-7 mb-3">
              <h3 className="mt-3">Upload your passport photo</h3>
              <label className="form-label">Upload your photo *</label>
              <br />
              <input type="file" 
              name="photo"
              onChange={handleInputChange}
              />
              <br />

              <h3 className="mt-3">Upload your Citizenship</h3>
              <label className="form-label">
                Upload your citizenship in .pdf form
              </label>
              <br />
              <input type="file" 
              name="citizenship"
              onChange={handleInputChange}
              />
              <br />
            </div>
          </div>
          <h3>Confirmation</h3>
          <hr />
          <div className="form-check">
            <input
              className="form-check-input border-dark"
              type="checkbox"
              id="confirm"
              name="confirmation"
            checked={donorDetails.confirmation}
            onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="confirm">
              I have read the privacy statement and give consent for the use of
              my information in accordance with the terms
            </label>
          </div>
          <button
            className="btn btn-success fs-5 mt-4 mb-5"
            style={{ width: "300px" }}
          >
            Submit-Yes, I want to donate
          </button>
        </div>
      </form>
    </div>
  );
}

export default DonorRegister;
