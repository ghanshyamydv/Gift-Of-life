import React from 'react'
import "./HomePage.css"
import { Link } from 'react-router-dom'
function Story() {
  return (
    <div className='container mt-5 mb-5'>
        <h1 className='mb-3 d-block fw-bold'>Recepient Stories</h1>
        <div className='row no-gutters d-flex justify-content-between'>
            <Link className="col text-decoration-none">
            <div className="card bg-secondary-subtle">
            <img src="./images/story-img/sejal.jpeg" className="card-img-top story-img" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Sejal, kidney and pancreas recipient</h5>
                <p className="card-text">When Sejal graduated from medical school and was preparing to enter residency, she suddenly found herself in need of a lifesaving kidney transplant.</p>
            </div>
            </div>
            </Link>
            <Link className="col text-decoration-none">
            <div className="card bg-secondary-subtle">
            <img src="./images/story-img/autumn.jpeg" className="card-img-top story-img" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Autumn, pediatric liver recipient</h5>
                <p className="card-text">In July 2020, at Autumn’s two-month appointment, her doctor noticed her skin was yellow and ordered some further tests to be done.</p>
            </div>
            </div>
            </Link>
            <Link className="col text-decoration-none">
            <div className="card bg-secondary-subtle">
            <img src="./images/story-img/chazley.jpeg" className="card-img-top story-img" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Chazley, living kidney donor recipient</h5>
                <p className="card-text">Chazley Williams was 30 years old, newly wed and working on her master’s degree when she was added to the transplant waiting list for a kidney transplant.</p>
            </div>
            </div>
            </Link>
            <div className="text-center mt-2"><Link className="custom-link fs-5 btn btn-secondary ps-4 pe-4 mt-3 text-white fw-semibold" to="register-donor">See all Stories</Link></div>
        </div>
    </div>
  )
}

export default Story
