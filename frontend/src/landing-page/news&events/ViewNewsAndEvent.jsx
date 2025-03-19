
import React ,{useEffect, useState} from 'react'
import { useParams } from 'react-router';
import axios from 'axios';

function ViewNewsAndEvent() {
    const {id}=useParams();
    const [newsAndEvent, setNewsAndEvent] = useState();

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resNewsandeventsData = await axios.get(`http://localhost:4000/api/admin/newsandevent/${id}`);
        setNewsAndEvent(resNewsandeventsData.data.newsAndEvent);
      } catch (err) {
        console.log("error :", err);
      }
    };
    fetchData();
  }, []); // Add refreshData as a dependency

  return (
    <div className='container'>
      <div className="row">
        {newsAndEvent && 
        <div className="col-7">
        <h1 className='mt-2 mb-4'>{newsAndEvent.title}</h1>
        {newsAndEvent.category==="event" && 
        <div>
            <h3 className='mt-4'>{newsAndEvent.category.charAt(0).toUpperCase() + newsAndEvent.category.slice(1)} Date</h3>
            <p>{newsAndEvent.date}</p>
            <h3 className='mt-4'>{newsAndEvent.category.charAt(0).toUpperCase() + newsAndEvent.category.slice(1)} Detail</h3>
        </div>
        }
        <p>{newsAndEvent.description}</p>
    </div>
        }
      </div>
    </div>
  )
}

export default ViewNewsAndEvent
