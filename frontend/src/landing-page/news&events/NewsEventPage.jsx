import React from 'react'
import "./NewsEvent.css"
import { Link } from 'react-router-dom'
function NewsEventPage() {
  return (
    <div className='container'>
      <h1>News and Events</h1>
      <div className="row d-flex justify-content-between">
        <Link to={"/news-event/event"} className="col-xs-12 col-sm-12 col-md-5 col-lg card bg-primary-subtle m-3 p-3 hover-event">
          <div className="d-flex justify-content-between">
          <span className='text-primary fw-semibold'>12 Feb 2025</span>
          <span className='border rounded-pill border-primary ps-3 pe-3 pt-1 pb-1 fw-semibold text-primary hover-style'>Event</span>
          </div>
          <h3 className='mt-3 custom-fw' >SA Run for Hope 2024 - by 2nd Beat</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, facilis Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, facilis.</p>
          <p>Read more  &gt;</p>
        </Link>
        <Link to={"/news-event/event"} className="col-xs-12 col-sm-12 col-md-5 col-lg card bg-secondary-subtle m-3 p-3 hover-news">
          <div className="d-flex justify-content-between">
          <span className='text-primary fw-semibold'>12 Feb 2025</span>
          <span className='border rounded-pill border-primary ps-3 pe-3 pt-1 pb-1 fw-semibold text-primary hover-style'>News</span>
          </div>
          <h3 className='mt-3 custom-fw' >SA Run for Hope 2024 - by 2nd Beat</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, facilis Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, facilis.</p>
          <p>Read more  &gt;</p>
        </Link>
        <Link to={"/news-event/event"} className="col-xs-12 col-sm-12 col-md-5 col-lg card bg-primary-subtle m-3 p-3 hover-event">
          <div className="d-flex justify-content-between">
          <span className='text-primary fw-semibold'>12 Feb 2025</span>
          <span className='border rounded-pill border-primary ps-3 pe-3 pt-1 pb-1 fw-semibold text-primary hover-style'>Event</span>
          </div>
          <h3 className='mt-3 custom-fw' >SA Run for Hope 2024 - by 2nd Beat</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, facilis Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, facilis.</p>
          <p>Read more  &gt;</p>
        </Link>
      </div>
    </div>
  )
}

export default NewsEventPage
