import axios from 'axios';
import React , {useContext, useEffect, useState}from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../AuthProvider';

function DonorStory() {
  const {backendUrl}=useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate=useNavigate();
  const [donorStories, setDonorStories]=useState([]);
  useEffect(()=>{
    window.scrollTo(0, 0); // Scroll to top on route change

    const fetchData = async () => {
      try{
        const response=await axios.get(`${backendUrl}/api/approved-stories`);
        const data=response.data.stories.filter((story)=>story.category==="donor").slice(0, 3);
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
            <div className="text-center mt-2"><Link className="custom-link fs-5 btn btn-secondary ps-4 pe-4 mt-3 text-white fw-semibold" to="/donor-stories">See all Stories</Link></div>
        </div>
    </div>
  )
}

export default DonorStory;
