
import React ,{useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../AuthProvider';

function ViewDonorStory() {
  const {backendUrl}=useContext(AuthContext);
    const {id}=useParams();
    const [donorStory, setDonorStory] = useState();
  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/donor-stories/${id}`);
        setDonorStory(response.data.story);
      } catch (err) {
        console.log("error :", err);
      }
    };
    fetchData();
  }, []); // Add refreshData as a dependency

  return (
    <div className=''>
      {donorStory &&
      <div className="container">
      <div className="row">
        <h1 className='mt-2 mb-4 '>{donorStory.title}</h1>
      </div>

      <div className="row">
          <div className='mb-2 col-12 col-md-4 col-xl-3'><img src={donorStory.image.url} alt={donorStory.image.filename}/></div>
          <p className='fs-6' style={{ whiteSpace: "pre-wrap", wordBreak: "break-word"}}>{donorStory.description}</p>
      </div>
    </div>
      }
    </div>
  )
}

export default ViewDonorStory;
