
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewRecipients = () => {
    const [recipients, setRecipients] = useState([]);

    // Fetch Donors from the backend
    useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/admin/review-recipients'); 
            setRecipients(response.data.recipients);
        } catch (error) {
            console.error('Error fetching Donors:', error);
        }
    };

    // Approve a recipients
    const approveRecipient = async (id) => {
        try {
            await axios.patch(`http://localhost:4000/api/admin/review-recipient/${id}/approve`);
            fetchDonors(); // Refresh the list after approval
        } catch (error) {
            console.error('Error approving recipients:', error);
        }
    };

    // Delete a recipients
    const rejectRecipient = async (id) => {
        try {
            await axios.patch(`http://localhost:4000/api/admin/review-recipient/${id}/reject`);
            fetchDonors(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting recipients:', error);
        }
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center mb-4">Review Stories</h1>
            <div className="row">
                {recipients.length===0 && <p className='text-success mt-3 text-center'>There are no pending recipients.</p>}
                {recipients.map((recipient) => (
                    <div key={recipient._id} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                            {recipient.photo && (
                            <img
                            src={recipient.photo.url}
                            alt={recipient.fullName}
                            className="card-img-top"
                            style={{ height: "300px", objectFit: "cover", objectPosition:"top"  }}
                            />
                        )}

                            <h5 className="card-title fs-5 mt-2">
                            <strong>Donor:</strong> {recipient.fullName}
                            </h5>
                            <p className="card-text fs-6">
                            <strong>Organs Donating:</strong>{" "}
                            {recipient.organsAndTissues[0]?.selectedOrgans.join(", ")},{" "}
                            {recipient.organsAndTissues[0]?.otherOrganTissue}
                            </p>
                                <p className="card-text">
                                    <small className={`text-${recipient.approved ? 'success' : 'warning'}`}>
                                        {recipient.approved ? 'Approved' : 'Pending Approval'}
                                    </small>
                                </p>
                                <div className="d-flex justify-content-between">
                                    {!recipient.approved && (
                                        <button
                                            onClick={() => approveRecipient(recipient._id)}
                                            className="btn btn-success btn-sm"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    <button
                                        onClick={() => rejectRecipient(recipient._id)}
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

export default ReviewRecipients;