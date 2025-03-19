import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../AuthProvider";

const Recipients = () => {
  const {renderViewAll}=useContext(AuthContext);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipient data from the backend
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/recipients");
        setRecipients(response.data.recipients);
        console.log(response.data.recipients.organsAndTissues);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipients();
  }, [renderViewAll]);

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
      const response = await axios.get("http://localhost:4000/api/recipients/search", {
        params: { q: searchTerm }, // Send search term as a query parameter
      });
      
      setRecipients(response.data.results);
    } catch (err) {
      console.log("error :", err);
    }
  }

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-4">Recipients List</h1>
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
                {/* Uncomment and use these fields if needed */}
                {/* <p className="card-text fs-6">
                  <strong>Email:</strong> {recipient.email}
                </p>
                <p className="card-text fs-6">
                  <strong>Address:</strong> {recipient.address}
                </p>
                <p className="card-text fs-6">
                  <strong>Medical Condition:</strong> {recipient.medicalCondition}
                </p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipients;