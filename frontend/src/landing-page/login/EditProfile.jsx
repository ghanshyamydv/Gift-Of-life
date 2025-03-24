import { useState } from "react";
import "./EditProfile.css";
import { FaCamera, FaEdit } from "react-icons/fa";
const EditProfileModal = ({ 
    isOpen,
    onClose,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
 }) => {
    if (!isOpen) return null;
    const [previewProfileImg, setPreviewProfileImg]=useState(values.profileImage.url);
    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <h4 className="text-primary mt-2">Edit Profile</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className=" d-flex justify-content-center">
                                    <div className=" position-relative" style={{width:"250px"}}>
                                    <img
                                        src={previewProfileImg}
                                        alt="Profile-pic"
                                        className="rounded-circle mb-3"
                                        style={{width:"200px", height:"200px", objectFit:"cover", objectPosition:"top"}}
                                        />
                                        <label htmlFor="profileImage" className="rounded-circle bg-secondary p-2" style={{position:"absolute", bottom:"25px", right:"45px"}}>
                                        <FaCamera className="text-white fs-4"/>
                                    </label>
                                    </div>
                                </div>
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            value={values?.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={values?.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={values?.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={values?.phoneNumber}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={values?.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input style={{display:"none"}}
                            id="profileImage"
                            type="file"
                            className="form-control"
                            name="profileImage"
                            onChange={(event)=>{
                                setFieldValue("profileImage",
                                  event.currentTarget.files[0])
                                setPreviewProfileImg(URL.createObjectURL(event.currentTarget.files[0]));
                              }}
                        />
                    </div>
                    <button type="submit" className="btn btn-success mt-3">Save Changes</button>
                    <button type="button" className="btn btn-secondary mt-3 ms-3 ml-2" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;