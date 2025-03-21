// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const reviewData= await axios.get("http://localhost:4000/admin/review-donorstories");
//       console.log(reviewData);
//       setDonorStories(reviewData.data.reviewStory);
      
//     } catch (err) {
//       console.log("error :", err);
//     }
//   };
//   fetchData();
// }, []); // Add refreshData as a dependency

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminAuthContext } from '../AdminAuthProvider';

const ReviewStoryPage = () => {
    const {backendUrl}=useContext(AdminAuthContext);
    const [stories, setStories] = useState([]);

    // Fetch stories from the backend
    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/admin/review-stories`);
            setStories(response.data.reviewStory);
        } catch (error) {
            console.error('Error fetching stories:', error);
        }
    };

    // Approve a story
    const approveStory = async (id) => {
        try {
            await axios.patch(`http://localhost:4000/api/admin/review-stories/${id}/approve`);
            fetchStories(); // Refresh the list after approval
        } catch (error) {
            console.error('Error approving story:', error);
        }
    };

    // Delete a story
    const deleteStory = async (id) => {
        try {
            await axios.patch(`http://localhost:4000/api/admin/review-stories/${id}/reject`);
            fetchStories(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting story:', error);
        }
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center mb-4">Review Stories</h1>
            <div className="row">
                {stories.length===0 && <p className='text-success mt-3 text-center'>There are no pending stories.</p>}
                {stories.map((story) => (
                    <div key={story._id} className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{story.title}</h5>
                                <p className="card-text">{story.description}</p>
                                <p className="card-text">
                                    <small className={`text-${story.approved ? 'success' : 'warning'}`}>
                                        {story.approved ? 'Approved' : 'Pending Approval'}
                                    </small>
                                </p>
                                <div className="d-flex justify-content-between">
                                    {!story.approved && (
                                        <button
                                            onClick={() => approveStory(story._id)}
                                            className="btn btn-success btn-sm"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteStory(story._id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewStoryPage;
