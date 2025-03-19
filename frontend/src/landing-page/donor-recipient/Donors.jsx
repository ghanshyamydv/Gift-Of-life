import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../AuthProvider";

const DonorsPage = () => {
  const {renderViewAll}=useContext(AuthContext);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch donor data from the backend
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/donors");
        console.log(response.data.donors[0]);
        setDonors(response.data.donors);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDonors();
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
      const response = await axios.get("http://localhost:4000/api/donors/search", {
        params: { q: searchTerm }, // Send search term as a query parameter
      });
      
      setDonors(response.data.results);
    } catch (err) {
      console.log("error :", err);
    }
  }
  return (
    <div className="container mt-3">
      <h1 className="text-center mb-4">Donors List</h1>
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
                  <div className="d-flex justify-content-between">
                  </div>
              </div>
          </div>
      </div>
        ))}
      </div>
    </div>
  );
};

export default DonorsPage;