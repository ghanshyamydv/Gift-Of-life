import React ,{useState, useEffect} from 'react'
import axios from 'axios';
import "./NewsEvent.css"
import { Link } from 'react-router-dom'
function NewsEventPage() {
  const [newsAndEvents, setNewsAndEvents] = useState([]);
  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resNewsandeventsData = await axios.get("http://localhost:4000/api/admin/newsandevents");
        setNewsAndEvents(resNewsandeventsData.data.newsAndEvents);
      } catch (err) {
        console.log("error :", err);
      }
    };
    fetchData();
  }, []); // Add refreshData as a dependency
  return (
    <div className='container'>
      <h1>News and Events</h1>
      <div className="row">

        {newsAndEvents.slice().reverse().map((newsOrEvent) => (
          <div key={newsOrEvent._id} className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
          <Link to={`/news-event/${newsOrEvent._id}`} className={`card ${newsOrEvent.category==="news"?"bg-secondary-subtle hover-news":"bg-primary-subtle hover-event"} m-2 p-3`}>
          <div className="d-flex justify-content-between">
          <span className='text-primary fw-semibold'>{newsOrEvent.date}</span>
          <span className='border rounded-pill border-primary ps-3 pe-3 pt-1 pb-1 fw-semibold text-primary hover-style'>{newsOrEvent.category}</span>
          </div>
          <h3 className='mt-3 custom-fw' >{newsOrEvent.title}</h3>
          <p>{newsOrEvent.description.slice(0,150)}</p>
          <p className='readmore'>Read more &gt;</p>
        </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsEventPage
