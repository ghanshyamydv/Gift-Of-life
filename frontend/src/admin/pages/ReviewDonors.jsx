import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminAuthContext } from '../AdminAuthProvider';

const ReviewDonors = () => {
    const {backendUrl}=useContext(AdminAuthContext);
    const [donors, setDonors] = useState([]);

    // Fetch Donors from the backend
    useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/admin/review-donors`);  
            setDonors(response.data.donors);
        } catch (error) {
            console.error('Error fetching Donors:', error);
        }
    };

    // Approve a donor
    const approveDonor = async (id) => {
        try {
            await axios.patch(`${backendUrl}/api/admin/review-donor/${id}/approve`);
            fetchDonors(); // Refresh the list after approval
        } catch (error) {
            console.error('Error approving donor:', error);
        }
    };

    // Delete a donor
    const rejectDonor = async (id) => {
        try {
            await axios.patch(`${backendUrl}/api/admin/review-donor/${id}/reject`);
            fetchDonors(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting donor:', error);
        }
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center mb-4">Review Stories</h1>
            <div className="row">
                {donors.length===0 && <p className='text-success mt-3 text-center'>There are no pending donors.</p>}
                {donors.map((donor) => (
                    <div key={donor._id} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                            {donor.photo && (
                            <img
                            src={donor.photo.url}
                            alt={donor.fullName}
                            className="card-img-top"
                            style={{ height: "300px", objectFit: "cover", objectPosition:"top"  }}
                            />
                        )}

                            <h5 className="card-title fs-5 mt-2">
                            <strong>Donor:</strong> {donor.fullName}
                            </h5>
                            <p className="card-text fs-6">
                            <strong>Organs Donating:</strong>{" "}
                            {donor.organsAndTissues[0]?.selectedOrgans.join(", ")},{" "}
                            {donor.organsAndTissues[0]?.otherOrganTissue}
                            </p>
                                <p className="card-text">
                                    <small className={`text-${donor.approved ? 'success' : 'warning'}`}>
                                        {donor.approved ? 'Approved' : 'Pending Approval'}
                                    </small>
                                </p>
                                <div className="d-flex justify-content-between">
                                    {!donor.approved && (
                                        <button
                                            onClick={() => approveDonor(donor._id)}
                                            className="btn btn-success btn-sm"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    <button
                                        onClick={() => rejectDonor(donor._id)}
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

export default ReviewDonors;