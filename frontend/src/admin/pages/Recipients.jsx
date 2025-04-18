import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminAuthContext } from "../AdminAuthProvider";
import "./Donors.css"
const ConfirmPage=({recipient,setShowConfirmPage})=>{
    const {backendUrl}=useContext(AdminAuthContext);
    const [donorId,setDonorId]=useState("");
    const [organsDonated, setOrgansDonated]=useState("");
    const [donorIdErr, setDonorIdErr]=useState("");
    const [otpSentMsg, setOtpSentMsg]=useState("");
    const [errorMsg,setErrorMsg]=useState("");
    const [loading, setLoading]=useState(false);
    const [otp, setOtp]=useState("");
    const [showOtpInputBox, setShowOtpInputBox]=useState(false);
    const handleSendOtp= async()=>{
      setLoading(true)
        if(donorId && recipient._id){
            setDonorIdErr("")
            try {
                const response = await axios.post(`${backendUrl}/api/confirm-recipient/transplant`,{recipientId:recipient._id,donorId, organsDonated});
                setShowOtpInputBox(true)
              } catch (err) {
                setErrorMsg(err.response.message)
              }
        }else{
            setDonorIdErr("Enter Valid Donor Id!")
        }    
    }

    const handleSubmitOtp= async()=>{
      if(donorId && recipient._id){
          try {
              const response = await axios.post(`${backendUrl}/api/confirm-recipient/transplant-otp`,{otp,id:recipient._id});
              
              if(response.status===200){
                setShowConfirmPage(false);
              }
            } catch (err) {
              setErrorMsg(err.response.data.message)
              
            }
      }else{
          setDonorIdErr("Enter Valid Recipient Id!")
      }    
  }

  console.log(errorMsg.err);
  

    return <div className="confirm-container">
        <div className="card shadow-sm">
          <div className="card-body">
              {/* Display the image if it exists */}
              {recipient.photo && (
                <img
                  src={recipient.photo.url}
                  alt={recipient.fullName}
                  className="card-img-top"
                  style={{ height: "300px", objectFit: "cover", objectPosition:"top"  }}
                />
              )}
                <h5 className="card-title fs-5 mt-2">
                  <strong>Recipient:</strong> {recipient.fullName}
                </h5>
                <p className="card-text fs-6">
                  <strong>Organs Needed:</strong>{" "}
                  {recipient.organsAndTissues[0]?.selectedOrgans.join(", ")},{" "}
                  {recipient.organsAndTissues[0]?.otherOrganTissue}
                </p>
                <p className="card-text fs-6">
              <strong>Email: </strong>{recipient.email}
              </p>
              <p className="card-text fs-6">
              <strong>Id: </strong>{recipient._id}
              </p>
              {!showOtpInputBox &&
              <>
              <div className="d-flex">
              <label htmlFor="donorId">Enter Donor Id: </label>
              <input name="donorId" value={donorId} onChange={(e)=>setDonorId(e.target.value)} type="text" style={{flex:"1", marginLeft:"5px"}}/><br />
              </div>
              <div className="d-flex mt-3">
              <label htmlFor="organsName">Enter Organs Name: </label>
              <input name="organsName" value={organsDonated} onChange={(e)=>setOrgansDonated(e.target.value)} type="text" style={{flex:"1", marginLeft:"5px"}}/><br />
              </div>
              </>
              }
              {showOtpInputBox &&
              <div className="d-flex">
                <label htmlFor="otp">Enter OTP: </label>
                <input name="otp" value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" style={{flex:"1", marginLeft:"5px"}}/><br />
              </div>
              }
              {donorIdErr && <p className="text-danger text-center">{donorIdErr}</p>}
              {!showOtpInputBox && <div className="d-flex justify-content-between">
                <button onClick={handleSendOtp} className="btn btn-outline-primary mt-3">
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
                <button type="button" className="btn btn-outline-danger mt-3 ms-3 ml-2" onClick={()=>setShowConfirmPage(false)}>Cancel</button>
              </div>}
              {errorMsg && <p className="text-danger text-center mt-2 mb-0">{errorMsg}</p>}
              {showOtpInputBox && <div className="d-flex justify-content-center"><button className="btn btn-outline-success mt-3" onClick={handleSubmitOtp}>Submit OTP</button></div>}
              </div>
          </div>
    </div>
}

const Recipients = () => {
  const {backendUrl}=useContext(AdminAuthContext);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currRecipient, setCurrRecipient]=useState({});
  const [showConfirmPge, setShowConfirmPage]=useState(false);

  // Fetch recipient data from the backend
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/recipients`);
        setRecipients(response.data.recipients);
        console.log(response.data.recipients.organsAndTissues);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipients();
  }, [showConfirmPge]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }

  const handleSearch=async(event)=>{
    event.preventDefault();
    const searchTerm=event.target.elements.searchInput.value;
    try {
      const response = await axios.get(`${backendUrl}/api/recipients/search`, {
        params: { q: searchTerm }, // Send search term as a query parameter
      });
      
      setRecipients(response.data.results);
    } catch (err) {
      console.log("error :", err);
    }
  }

  const handleTransplant=(donor)=>{
    setShowConfirmPage(true)
    setCurrRecipient(donor)
  }

  return (
    <div className="container mt-3">
      {showConfirmPge && <ConfirmPage recipient={currRecipient} setShowConfirmPage={setShowConfirmPage}/>}
      <h1 className="text-center mb-4">Waiting Recipients</h1>
      <form className='d-flex justify-content-center mb-5' onSubmit={handleSearch}>
        <input className='form-control border-primary' style={{width:"300px"}} type="text" name='searchInput'/>
        <button type='submit' className='btn btn-outline-primary ms-2'>Search</button>
      </form>
      {recipients.length===0 && <h2 className="text-center text-danger">Results Not Found!</h2>}
      <div className="row">
        {recipients.map((recipient) => (
          <div key={recipient._id} className="col-md-4 mb-4">
            <div className="card h-100">
              {/* Display the image if it exists */}
              {recipient.photo && (
                <img
                  src={recipient.photo.url}
                  alt={recipient.fullName}
                  className="card-img-top"
                  style={{ height: "300px", objectFit: "cover", objectPosition:"top"  }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title fs-5">
                  <strong>Recipient:</strong> {recipient.fullName}
                </h5>
                <p className="card-text fs-6">
                  <strong>Organs Needed:</strong>{" "}
                  {recipient.organsAndTissues[0]?.selectedOrgans.join(", ")},{" "}
                  {recipient.organsAndTissues[0]?.otherOrganTissue}
                </p>
                <p className="card-text fs-6">
              <strong>Email: </strong>{recipient.email}
              </p>
              <p className="card-text fs-6">
              <strong>Id: </strong>{recipient._id}
              </p>
              <button className="btn btn-outline-success" onClick={()=>handleTransplant(recipient)}>Mark as Transplanted</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipients;