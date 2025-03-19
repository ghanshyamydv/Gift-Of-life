import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { useFormik } from "formik";
import { AuthContext } from "../../AuthProvider";
import * as Yup from "yup";
import validationRecipientSchema from "../../../public/js/validateRecepient";
import { toast } from 'react-toastify';

let recipientDetails={
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
    recipientRelationship: "",
    email: "",
    phoneNumber: "",
  },
  organsAndTissues: {
    selectedOrgans:[],
    otherOrganTissue:""
  },
  consent: false,
  signature: "",
  date: "",
  witnessDetail: {
    name: "",
    recipientRelationship: "",
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
};

function RecipientRegister() {
  const [otherOrganTissue, setOtherOrganTissue] = useState(false);
  const navigate=useNavigate();
  const { pathname } = useLocation();
  const {isLoggedIn} = useContext(AuthContext);
  useEffect(()=>{
    window.scrollTo(0, 0); // Scroll to top on route change
    if(!isLoggedIn){
      navigate("/login")
      toast.warning("Please log in to proceed.")
    }
  },[isLoggedIn, navigate, pathname])

  //------------------------------formik config -----------------------------------
  const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: recipientDetails,
      validationSchema: validationRecipientSchema,
      onSubmit: async (values, actions) => {
        // Sending data to backend
        
        try {
          const token = localStorage.getItem('token');
            if(token){
              const response = await axios.post(
                "http://localhost:4000/api/recipient-register",
                values,
                {
                  headers: { "Content-Type": "multipart/form-data", Authorization:token },
                }
              );
                toast.success(response.data.message,{autoClose: 5000})
                actions.resetForm();
                navigate("/donors")
            }
        } catch (err) {
          toast.error(err.response.data.message);
        }
      },
    });

//------------------------------------------

  return (
    <div className="container">
      <h1>Register a decision to be a Recipient </h1>
      <p>
        Your decision to recipient can save and transform lives. Thank you for
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
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.fullName && touched.fullName ? (
            <div className="text-danger">{errors.fullName}</div>
          ) : null}
          
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
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.dateOfBirth && touched.dateOfBirth ? (
            <div className="text-danger">{errors.dateOfBirth}</div>
          ) : null}
          </div>
            <div className="mb-3 col-7">
            <label className="form-label">Gender *</label>
            <select
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-select"
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && touched.gender ? (
            <div className="text-danger">{errors.gender}</div>
          ) : null}
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
              value={values.address.street}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.address?.street && touched.address?.street ? (
            <div className="text-danger">{errors.address.street}</div>
          ) : null}
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
              value={values.address.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
           {errors.address?.city && touched.address?.city ? (
            <div className="text-danger">{errors.address.city}</div>
          ) : null}
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
              value={values.address.state}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.address?.state && touched.address?.state ? (
            <div className="text-danger">{errors.address.state}</div>
          ) : null}
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
              value={values.address.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.address?.zipCode && touched.address?.zipCode ? (
            <div className="text-danger">{errors.address.zipCode}</div>
          ) : null}
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
              value={values.address.country}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.address?.country && touched.address?.country ? (
            <div className="text-danger">{errors.address.country}</div>
          ) : null}
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
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
            <div className="text-danger">{errors.email}</div>
          ) : null}
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
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phoneNumber && touched.phoneNumber ? (
            <div className="text-danger">{errors.phoneNumber}</div>
          ) : null}
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
              value={values.emergencyContact.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.emergencyContact?.name && touched.emergencyContact?.name ?(
            <div className="text-danger">{errors.emergencyContact.name}</div>
          ) : null}
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="relationship" className="form-label">
              Relationship *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="relationship"
              name="emergencyContact.recipientRelationship"
              value={values.emergencyContact.recipientRelationship}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.emergencyContact?.recipientRelationship && touched.emergencyContact?.recipientRelationship ? (
            <div className="text-danger">{errors.emergencyContact.recipientRelationship}</div>
          ) : null}
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
              value={values.emergencyContact.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.emergencyContact?.email && touched.emergencyContact?.email ? (
            <div className="text-danger">{errors.emergencyContact.email}</div>
          ) : null}
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
              value={values.emergencyContact.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.emergencyContact?.phoneNumber && touched.emergencyContact?.phoneNumber ? (
            <div className="text-danger">{errors.emergencyContact.phoneNumber}</div>
          ) : null}
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
                    name="organsAndTissues.selectedOrgans"
                    id="heart"
                    value="heart"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("heart")}
                  />
                  <label className="form-check-label" htmlFor="heart">
                    Heart
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    name="organsAndTissues.selectedOrgans"
                    id="lungs"
                    value="lung"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("lung")}
                  />
                  <label className="form-check-label" htmlFor="lungs">
                    Lung
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="kidneys"
                    name="organsAndTissues.selectedOrgans"
                    value="kidney"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("kidney")}
                  />
                  <label className="form-check-label" htmlFor="kidneys">
                    Kidneys
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="liver"
                    name="organsAndTissues.selectedOrgans"
                    value="liver"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("liver")}
                  />
                  <label className="form-check-label" htmlFor="liver">
                    Liver
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="pancreas"
                    name="organsAndTissues.selectedOrgans"
                    value="pancreas"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("pancreas")}
                  />

                  <label className="form-check-label" htmlFor="pancreas">
                    Pancreas
                  </label>
                  <br />

                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="small-intestine"
                    name="organsAndTissues.selectedOrgans"
                    value="small-intestine"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("small-intestine")}
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
                    name="organsAndTissues.selectedOrgans"
                    value="tendons-ligaments"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("pancreas")}
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
                    name="organsAndTissues.selectedOrgans"
                    value="corneas"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("corneas")}
                  />
                  <label className="form-check-label" htmlFor="corneas">
                    Corneas
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="amniotic-membrane"
                    name="organsAndTissues.selectedOrgans"
                    value="amniotic-membrane"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("amniotic-membrane")}
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
                    name="organsAndTissues.selectedOrgans"
                    value="bone-marrow"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("bone-marrow")}
                  />
                  <label className="form-check-label" htmlFor="bone-marrow">
                    Bone Marrow
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="bone"
                    name="organsAndTissues.selectedOrgans"
                    value="bone"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("bone")}
                  />
                  <label className="form-check-label" htmlFor="bone">
                    Bone
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="skin"
                    name="organsAndTissues.selectedOrgans"
                    value="skin"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("skin")}
                  />
                  <label className="form-check-label" htmlFor="skin">
                    Skin
                  </label>
                  <br />
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="blood-components"
                    name="organsAndTissues.selectedOrgans"
                    value="blood-components"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("blood-components")}
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
                    name="organsAndTissues.selectedOrgans"
                    value="blood-stem-cells"
                    onChange={handleChange}
                    checked={values.organsAndTissues.selectedOrgans?.includes("blood-stem-cells")}
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
                    onChange={()=>{setOtherOrganTissue(!otherOrganTissue) ;
                      setFieldValue("organsAndTissues.otherOrganTissue","")
                      }}
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
                      name="organsAndTissues.otherOrganTissue"
                      value={values.organsAndTissues.otherOrganTissue}  // Bind value to Formik state
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </div>
                {errors.organsAndTissues && touched.organsAndTissues ? (
            <div className="text-danger">{errors.organsAndTissues}</div>
          ) : null}
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
              onChange={handleChange}
              checked={values.consent}
              onBlur={handleBlur}
            />
            <label className="form-check-label" htmlFor="consent">
              By filling this form, I declare that:
            </label>
            {values.consent && (
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
            {errors.consent && touched.consent ? (
            <div className="text-danger">{errors.consent}</div>
          ) : null}
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
              value={values.signature}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.signature && touched.signature ? (
            <div className="text-danger">{errors.signature}</div>
          ) : null}
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
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.date && touched.date ? (
            <div className="text-danger">{errors.date}</div>
          ) : null}
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
              value={values.witnessDetail.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.witnessDetail?.name && touched.witnessDetail?.name ? (
            <div className="text-danger">{errors.witnessDetail?.name}</div>
          ) : null}
          </div>
          <div className="col-7 mb-3">
            <label htmlFor="recipient-relationship" className="form-label">
              Relationship to Recipient *
            </label>
            <input
              type="text"
              className="form-control border-dark"
              id="recipient-relationship"
              name="witnessDetail.recipientRelationship"
              value={values.witnessDetail.recipientRelationship}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.witnessDetail?.recipientRelationship && touched.witnessDetail?.recipientRelationship ? (
            <div className="text-danger">{errors.witnessDetail?.recipientRelationship}</div>
          ) : null}
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
              value={values.witnessDetail.signature}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.witnessDetail?.signature && touched.witnessDetail?.signature ? (
            <div className="text-danger">{errors.witnessDetail?.signature}</div>
          ) : null}
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
              value={values.medicalPractitioner.name}
              onChange={handleChange}
              onBlur={handleBlur}
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
              value={values.medicalPractitioner.role}
              onChange={handleChange}
              onBlur={handleBlur}
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
              value={values.medicalPractitioner.signature}
              onChange={handleChange}
              onBlur={handleBlur}
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
              value={values.religious}
              onChange={handleChange}
              onBlur={handleBlur}
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
              value={values.conditions}
              onChange={handleChange}
              onBlur={handleBlur}
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
              value={values.notes}
              onChange={handleChange}
              onBlur={handleBlur}
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
                value="no"
                checked={values.paidOption === "no"}
                onChange={handleChange}
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
                value="yes"
                checked={values.paidOption === "yes"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="paid-option">
                Paid Option
              </label>
            </div>
            {errors.paidOption && touched.paidOption ? (
            <div className="text-danger">{errors.paidOption}</div>
          ) : null}
          </div>

          <div className="col-7 mb-3">
            <h3 className="mt-3">Upload your passport size photo</h3>
            <label className="form-label">Upload your photo *</label>
            <br />
            <input 
              type="file" 
              name="photo"
              onChange={(event)=>{
                setFieldValue("photo",
                  event.currentTarget.files[0])
              }}
              />
              {errors.photo && touched.photo ? (
            <div className="text-danger">{errors.photo}</div>
          ) : null}
            <br />

            <h3 className="mt-3">Upload your Citizenship</h3>
            <label className="form-label">
              Upload your citizenship in .pdf form
            </label>
            <br />
            <input type="file" 
            name="citizenship"
            onChange={(event)=>{
              setFieldValue("citizenship",
                event.currentTarget.files[0])
            }}
            />
            {errors.citizenship && touched.citizenship ? (
            <div className="text-danger">{errors.citizenship}</div>
          ) : null}
            <br />
            <h3 className="mt-3">Upload your Hospital Documents</h3>
            <label className="form-label">
              Upload your hospital documents by combining all into a single .pdf
              file
            </label>
            <br />
            <input type="file" 
            name="hospitalDocs"
            onChange={(event)=>{
              setFieldValue("hospitalDocs",
                event.currentTarget.files[0])
            }}
            />
            {errors.hospitalDocs && touched.hospitalDocs ? (
            <div className="text-danger">{errors.hospitalDocs}</div>
          ) : null}
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
              checked={values.confirmation}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label className="form-check-label" htmlFor="confirm">
              I have read the privacy statement and give consent for the use of
              my information in accordance with the terms
            </label>
            {errors.confirmation && touched.confirmation ? (
            <div className="text-danger">{errors.confirmation}</div>
          ) : null}
          </div>
          <button type="submit"
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

export default RecipientRegister;
