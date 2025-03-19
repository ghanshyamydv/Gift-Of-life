import axios from 'axios';
import React , {useEffect, useState}from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

function RecipientStories() {
  const { pathname } = useLocation();
  const navigate=useNavigate();
  const [recipientStories, setRecipientStories]=useState([]);
  useEffect(()=>{
    window.scrollTo(0, 0); // Scroll to top on route change

    const fetchData = async () => {
      try{
        const response=await axios.get("http://localhost:4000/api/approved-stories");
        const data=response.data.stories.filter((story)=>story.category==="recipient")
        setRecipientStories(data);
        
      }catch(err){
        console.log(err);
      }
    };
    fetchData();

    
  },[pathname])
  return (
    <div className='container mt-5 mb-5'>
        <h1 className='mb-3 d-block fw-bold'>Recipient Stories</h1>
        <div className="row">
          <div className="col-8">
          <p className="text-muted mb-4">
              Tell us about your journey. Why did you choose the gift of life? How has it impacted you and others?
            </p>
          </div>
          <div className="col-4"><button className="btn btn-primary btn-lg" onClick={()=>{navigate("/create-story")}}>Share Your Story</button></div>
        </div>
        <div className='row no-gutters d-flex'>
            {recipientStories.slice().reverse().map((story)=>(
              <Link to={`/recipient-stories/${story._id}`} className="col-4 mt-3 text-decoration-none" key={story._id}>
              <div className="card bg-secondary-subtle">
              <img src={story.image.url} className="card-img-top story-img" alt={story.image.filename} style={{height:"260px"}}/>
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

export default RecipientStories;
