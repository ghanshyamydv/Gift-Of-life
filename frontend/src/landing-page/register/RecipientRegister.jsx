import React, { useState } from "react";
import axios from "axios";

function RecepientRegister() {
  const [organsAndTissuesData, setOrgansAndTissuesData] = useState([]);
  const [otherOrganTissue, setOtherOrganTissue] = useState(false);
  const [otherOrgans, setOtherOrgans] = useState({otherOrganTissue:""});
  const [responseMessage, setResponseMessage] = useState("");

  let [recepientDetails, setRecepientDetails] = useState({
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
      recepientRelationship: "",
      email: "",
      phoneNumber: "",
    },
    organsAndTissues: [],
    consent: false,
    signature: "",
    date: "",
    witnessDetail: {
      name: "",
      recepientRelationship: "",
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
    paidOption: false,
    photo: null,
    citizenship:null,
    hospitalDocs:null,
    confirmation: false,
  });

  const handleOrganAndTissue=(event)=>{
      if(event.target.checked){
        setOrgansAndTissuesData([...organsAndTissuesData,event.target.value])
      }else{
        setOrgansAndTissuesData([...organsAndTissuesData.filter((item)=>item!==event.target.value)])
      }
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    // If the field is a checkbox, we use checked value
    const updatedValue = type === "checkbox" ? checked : value;

    setRecepientDetails((prevDetails) => {
      const keys = name.split("."); // To handle nested fields
      if (keys.length > 1) {
        // If the name is for a nested field (e.g. address.street)
        return {
          ...prevDetails,
          [keys[0]]: {
            ...prevDetails[keys[0]],
            [keys[1]]: updatedValue, // Update the nested field
          },
        };
      }

      // For non-nested fields (e.g. fullName, age, consent)
      if(name==="photo" || name==="citizenship" || name==="hospitalDocs"){
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    recepientDetails = {
      ...recepientDetails,
      organsAndTissues: [...organsAndTissuesData, otherOrgans]
    };

    const formData = new FormData();

    // Loop through donorDetails and append each property
    Object.entries(recepientDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // sending data to backend
    try {
      const response = await axios.post(
        "http://localhost:4000/recipient-register", // Example API
        recepientDetails,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResponseMessage("Data submitted successfully: " + JSON.stringify(response.data));
    } catch (err) {
      setResponseMessage("Error: " + err.message);
    }
    console.log(recepientDetails);
  };

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
              value={recepientDetails.fullName}
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
              value={recepientDetails.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>

            <div className="mb-3 col-7">
            <label className="form-label">Gender *</label>
            <select
              name="gender"
              value={recepientDetails.gender}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
              value={recepientDetails.address.street}
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
              value={recepientDetails.address.city}
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
              value={recepientDetails.address.state}
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
              value={recepientDetails.address.zipCode}
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
              value={recepientDetails.address.country}
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
              value={recepientDetails.email}
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
              value={recepientDetails.phoneNumber}
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
              value={recepientDetails.emergencyContact.name}
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
              name="emergencyContact.recepientRelationship"
              value={recepientDetails.emergencyContact.recepientRelationship}
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
              value={recepientDetails.emergencyContact.email}
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
              value={recepientDetails.emergencyContact.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <h3>Donation Preferences </h3>
          <hr />
          <div className="col-7 mb-5">
            <h4>I Want to receive *</h4>
            <div className="form-check">
              <div className="pt-2">
                <p className="">Organs a Living Recipient Can Donate:</p>
                <div className="ms-4">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="heart"
                    value="heart"
                    onChange={handleOrganAndTissue}
                  />
                  <label className="form-check-label" htmlFor="heart">
                    Heart
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="lungs"
                    value="lung"
                    onChange={handleOrganAndTissue}
                  />
                  <label className="form-check-label" htmlFor="lungs">
                    Lung
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="kidneys"
                    value="kidney"
                    onChange={handleOrganAndTissue}
                  />
                  <label className="form-check-label" htmlFor="kidneys">
                    Kidneys
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="liver"
                    value="liver"
                    onChange={handleOrganAndTissue}
                  />
                  <label className="form-check-label" htmlFor="liver">
                    Liver
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="pancreas"
                    value="pancreas"
                    onChange={handleOrganAndTissue}
                  />

                  <label className="form-check-label" htmlFor="pancreas">
                    Pancreas
                  </label>
                  <br />

                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="small-intestine"
                    value="small-intestine"
                    onChange={handleOrganAndTissue}
                  />
                  <label className="form-check-label" htmlFor="small-intestine">
                    Small Intestine (bowel)
                  </label>
                </div>

                <p className="mt-3">Tissue a Living Recipient Can Donate:</p>
                <div className="ms-4">
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="tendons-ligaments"
                    value="tendons-ligaments"
                    onChange={handleOrganAndTissue}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="tendons-ligaments"
                  >
                    Tendons and Ligaments
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="corneas"
                    value="corneas"
                    onChange={handleOrganAndTissue}
                  />
                  <label className="form-check-label" htmlFor="corneas">
                    Corneas
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="amniotic-membrane"
                    value="amniotic-membrane"
                    onChange={handleOrganAndTissue}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="amniotic-membrane"
                  >
                    Amniotic Membrane
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="bone-marrow"
                    value="bone-marrow"
                    onChange={handleOrganAndTissue}
                  />
                  <label className="form-check-label" htmlFor="bone-marrow">
                    Bone Marrow
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="bone"
                    value="bone"
                    onChange={handleOrganAndTissue}
                  />
                  <label className="form-check-label" htmlFor="bone">
                    Bone
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="skin"
                    value="skin"
                    onChange={handleOrganAndTissue}
                  />
                  <label className="form-check-label" htmlFor="skin">
                    Skin
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="blood-components"
                    value="blood-components"
                    onChange={handleOrganAndTissue}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="blood-components"
                  >
                    Blood Components
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="blood-stem-cells"
                    value="blood-stem-cells"
                    onChange={handleOrganAndTissue}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="blood-stem-cells"
                  >
                    Peripheral Blood Stem Cells
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="other-organ-tissue"
                    onChange={()=>{setOtherOrganTissue(!otherOrganTissue)}}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="other-organ-tissue"
                  >
                    Other Organ or Tissue (please specify)
                  </label>
                  {otherOrganTissue && (
                    <input
                      type="text"
                      className="form-control border-dark"
                      id="other-organ-tissue"
                      value={otherOrgans.otherOrganTissue}
                      onChange={(event)=>{setOtherOrgans({otherOrganTissue:event.target.value})}}
                    />
                  )}
                </div>
              </div>
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
              checked={recepientDetails.consent}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="consent">
              By filling this form, I declare that:
            </label>
            {recepientDetails.consent && (
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
            <label htmlFor="recipient-signature" className="form-label">
              Recipient Signature *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="recipient-signature"
              name="signature"
              value={recepientDetails.signature}
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
              value={recepientDetails.date}
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
              value={recepientDetails.witnessDetail.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="recipient-relationship" className="form-label">
              Relationship to Recipient *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="recipient-relationship"
              name="witnessDetail.recepientRelationship"
              value={recepientDetails.witnessDetail.recepientRelationship}
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
              value={recepientDetails.witnessDetail.signature}
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
              value={recepientDetails.medicalPractitioner.name}
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
              value={recepientDetails.medicalPractitioner.role}
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
              value={recepientDetails.medicalPractitioner.signature}
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
              value={recepientDetails.religious}
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
              value={recepientDetails.conditions}
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
              value={recepientDetails.notes}
              onChange={handleInputChange}
            />
          </div>

          <label className="form-label">I Want to receive *</label>
          <div className="ps-2">
            <div className="form-check">
              <input
                className="form-check-input border-dark"
                type="radio"
                id="for-free"
                name="paidOption"
                value={false}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="for-free">
                For Free
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input border-dark"
                type="radio"
                id="paid-option"
                name="paidOption"
                value={true}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="paid-option">
                Paid Option
              </label>
              {otherOrganTissue && <input type="text" className="form-control border-dark" name="other-organ-tissue" onChange={handleOrganAndTissue}/>}
            </div>
          </div>

          <div className="col-7 mb-3">
            <h3 className="mt-3">Upload your passport size photo</h3>
            <label className="form-label">Upload your photo *</label>
            <br />
            <input 
              type="file" 
              name="photo"
              onChange={handleInputChange}/>
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
            <h3 className="mt-3">Upload your Hospital Documents</h3>
            <label className="form-label">
              Upload your hospital documents by combining all into a single .pdf
              file
            </label>
            <br />
            <input type="file" 
            name="hospitalDocs"
            onChange={handleInputChange}
            />
            <br />
          </div>

          <h3>Confirmation</h3>
          <hr />
          <div className="form-check">
            <input
              className="form-check-input border-dark"
              type="checkbox"
              id="confirm"
              name="confirmation"
              checked={recepientDetails.confirmation}
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

export default RecepientRegister;
