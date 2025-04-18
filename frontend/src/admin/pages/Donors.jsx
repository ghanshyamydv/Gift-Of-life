import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminAuthContext } from "../AdminAuthProvider";
import "./Donors.css"
const ConfirmPage=({donor,setShowConfirmPage})=>{
    const {backendUrl}=useContext(AdminAuthContext);
    const [recipientId,setRecipientId]=useState("");
    const [organsDonated, setOrgansDonated]=useState("");
    const [recipientIdErr, setRecipientIdErr]=useState("")
    const [otpSentMsg, setOtpSentMsg]=useState("")
    const [errorMsg,setErrorMsg]=useState("");
    const [otp, setOtp]=useState("");
    const [loading, setLoading]=useState(false);
    const [showOtpInputBox, setShowOtpInputBox]=useState(false);
    const handleSendOtp= async()=>{
      setLoading(true)
        if(recipientId && donor._id){
            setRecipientIdErr("")
            try {
                const response = await axios.post(`${backendUrl}/api/confirm-donor/transplant`,{donorId:donor._id,recipientId, organsDonated});
                setShowOtpInputBox(true)
              } catch (err) {
                console.log("errr", err);
              }
        }else{
            setRecipientIdErr("Enter Valid Recipient Id!")
        }    
    }

    const handleSubmitOtp= async()=>{
      if(recipientId && donor._id){
          try {
              const response = await axios.post(`${backendUrl}/api/confirm-donor/transplant-otp`,{otp,id:donor._id});
              
              if(response.status===200){
                setShowConfirmPage(false);
              }
            } catch (err) {
              setErrorMsg(err.response.data.message)
            }
      }else{
          setRecipientIdErr("Enter Valid Recipient Id!")
      }    
  }

    return <div className="confirm-container">
        {/* <div className="col-md-4 mb-4"> */}
          <div className="card shadow-sm">
            
              <div className="card-body">
                
              {donor.photo && (
              <img
              src={donor.photo.url}
              alt={donor.fullName}
              className="card-img-top"
              style={{ height: "300px", objectFit: "cover", objectPosition:"top"  }}
              />
          )}

              <h5 className="card-title fs-5 mt-2">
              <strong>Donor:</strong> {donor.fullName}
              </h5>
              <p className="card-text fs-6">
              <strong>Organs Donating:</strong>{" "}
              {donor.organsAndTissues[0]?.selectedOrgans.join(", ")},{" "}
              {donor.organsAndTissues[0]?.otherOrganTissue}
              </p>
              <p className="card-text fs-6">
              <strong>Email: </strong>{donor.email}
              </p>
              <p className="card-text fs-6">
              <strong>Id: </strong>{donor._id}
              </p>
              {!showOtpInputBox &&
              <>
              <div className="d-flex">
              <label htmlFor="recipientId">Enter Recipient Id: </label>
              <input name="recipientId" value={recipientId} onChange={(e)=>setRecipientId(e.target.value)} type="text" style={{flex:"1", marginLeft:"5px"}}/><br />
              </div>
              <div className="d-flex mt-3">
              <label htmlFor="organsName">Enter Organs Name: </label>
              <input name="organsName" value={organsDonated} onChange={(e)=>setOrgansDonated(e.target.value)} type="text" style={{flex:"1", marginLeft:"5px"}}/><br />
              </div>
              </>
              }
              {showOtpInputBox &&
              <>
              <div className="d-flex">
                <label htmlFor="otp">Enter OTP: </label>
                <input name="otp" value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" style={{flex:"1", marginLeft:"5px"}}/><br />
              </div>
              </>
              }
              {recipientIdErr && <p className="text-danger text-center">{recipientIdErr}</p>}
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
              {showOtpInputBox && <div className="d-flex justify-content-center"><button className="btn btn-outline-success mt-3" onClick={handleSubmitOtp}>Verify OTP</button></div>}
              </div>
          </div>
      {/* </div> */}
    </div>
}

const Donors = () => {
  const {backendUrl}=useContext(AdminAuthContext);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmPge, setShowConfirmPage]=useState(false);
  const [currDonor, setCurrDonor]=useState({});
  // Fetch donor data from the backend
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/donors`);
        setDonors(response.data.donors);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDonors();
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
      const response = await axios.get(`${backendUrl}/api/donors/search`, {
        params: { q: searchTerm }, // Send search term as a query parameter
      });
      
      setDonors(response.data.results);
    } catch (err) {
      console.log("error :", err);
    }
  }
  const handleTransplant=(donor)=>{
    setShowConfirmPage(true)
    setCurrDonor(donor)
  }

  return (
    <div className="container mt-3">
        {showConfirmPge && <ConfirmPage donor={currDonor} setShowConfirmPage={setShowConfirmPage}/>}
      <h1 className="text-center mb-4">Available Donors</h1>
      <form className='d-flex justify-content-center mb-5' onSubmit={handleSearch}>
        <input className='form-control border-primary' style={{width:"300px"}} type="text" name='searchInput'/>
        <button type='submit' className='btn btn-outline-primary ms-2'>Search</button>
      </form>
      <div className="row">
    {donors.length===0 && <h2 className="text-center text-danger">Results Not Found!</h2>}
      {donors.map((donor) => (
          <div key={donor._id} className="col-md-4 mb-4">
          <div className="card shadow-sm">
            
              <div className="card-body">
              {donor.photo && (
              <img
              src={donor.photo.url}
              alt={donor.fullName}
              className="card-img-top"
              style={{ height: "300px", objectFit: "cover", objectPosition:"top"  }}
              />
          )}

              <h5 className="card-title fs-5 mt-2">
              <strong>Donor:</strong> {donor.fullName}
              </h5>
              <p className="card-text fs-6">
              <strong>Organs Donating:</strong>{" "}
              {donor.organsAndTissues[0]?.selectedOrgans.join(", ")},{" "}
              {donor.organsAndTissues[0]?.otherOrganTissue}
              </p>
              <p className="card-text fs-6">
              <strong>Email: </strong>{donor.email}
              </p>
              <p className="card-text fs-6">
              <strong>Id: </strong>{donor._id}
              </p>
              <button className="btn btn-outline-success" onClick={()=>handleTransplant(donor)}>Mark as Transplanted</button>
              </div>
          </div>
      </div>
        ))}
      </div>
    </div>
  );
};

export default Donors;