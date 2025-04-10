import axios from 'axios';
import React , {useContext, useEffect, useState}from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../AuthProvider';

function DonorStories() {
  const {backendUrl}=useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate=useNavigate();
  const [donorStories, setDonorStories]=useState([]);
  useEffect(()=>{
    window.scrollTo(0, 0); // Scroll to top on route change

    const fetchData = async () => {
      try{
        const response=await axios.get(`${backendUrl}/api/approved-stories`);
        const data=response.data.stories.filter((story)=>story.category==="donor")
        setDonorStories(data);
        
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
    
  },[pathname])
  return (
    <div className='container mt-5 mb-5'>
        <h1 className='mb-3 d-block fw-bold'>Donor Stories</h1>
        <div className="row">
          <div className="col-12 col-md-8">
          <p className="text-muted mb-4">
              Tell us about your journey. Why did you decide to give the gift of life? How has it impacted you and others?
            </p>
          </div>
          <div className="col-12 col-md-4"><button className="btn btn-primary btn-lg" onClick={()=>{navigate("/create-story")}}>Share Your Story</button></div>
        </div>
        <div className='row no-gutters d-flex'>
            {donorStories.slice().reverse().map((story)=>(
              <Link to={`/donor-stories/${story._id}`} className="col-12 col-sm-6 col-md-4 mt-3 text-decoration-none" key={story._id}>
              <div className="card bg-secondary-subtle">
              <img src={story.image.url} className="card-img-top story-img" alt={story.image.filename} style={{ height: "280px", objectFit:"cover", objectPosition:"center" }}/>
              <div className="card-body">
                  <h5 className="card-title">{story.title}</h5>
                  <p className="card-text">{story.description.slice(0,100)}</p>
                  <p>Read more &gt;</p>
              </div>
              </div>
              </Link>
            ))}
        </div>
    </div>
  )
}

export default DonorStories;
