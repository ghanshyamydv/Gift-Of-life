import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { FaCamera, FaEdit } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider";
import { toast } from 'react-toastify';
import EditProfileModal from "./EditProfile";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditStoryForm from "../story/EditStory";
const ProfilePage = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const {backendUrl,user, updateUser}=useContext(AuthContext);
    const [story , setStory]=useState();
    const [isEditing, setIsEditing]=useState(false);
    const [isStoryEditing, setIsStoryEditing]=useState(false);

    
    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        toast.promise(
          new Promise((resolve, reject) => {
            axios
              .patch(`${backendUrl}/api/${id}/profile`, { profileImage: file }, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((res) => {
                setTimeout(() => resolve(res), 1000); // Ensures at least 1 second before success
              })
              .catch((err) => {
                setTimeout(() => reject(err), 1000); // Ensures at least 1 second before error
              });
          }),
          {
            pending: "Updating Your photo...",
            success: "Updated Successfully! 👌",
            error: "Updation rejected 🤯",
          }
        ).then(() => updateUser()); // Update user data after success
      }
    };
    


  // Fetch user story based on user category
  useEffect(() => {
    const fetchUserStory = async () => {
      if (user?.category && user?._id) {
        try {
          const storyRes = await axios.get(
            `${backendUrl}/api/${
              user.category === "donor" 
                ? `donor-story/${user._id}` 
                : `recipient-story/${user._id}`
            }`
          );
          setStory(storyRes.data.story);
        } catch (error) {
          console.error("Error fetching user story:", error);
        }
      }
    };

    fetchUserStory();
  }, [user]); // Add `user` as a dependency

 
  const handleEditClick = () => {
    setIsEditing(true);
};
// console.log(formData);
const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue } =
  useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      fullName: user?.fullName || "",
      address: user?.address || "",
      profileImage: user?.profileImage || null,
    },
    // validationSchema: validationSchema, // Uncomment and define your schema
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.patch(
          `${backendUrl}/api/${id}/profile`,
          values, 
          {
            headers: { "Content-Type": "multipart/form-data"},
          }
        );
        updateUser();
        setIsEditing(false); // Close the modal
        toast.success("Profile updated successfully!");
      } catch (err) {
        toast.error("Failed to update profile.");
      }
    },
  });
const handleEditStory=async (id)=>{
  setIsStoryEditing(true);
}

const handleDeleteStory= async(id)=>{
  try{
    const response=await axios.delete(`${backendUrl}/api/story/${id}/delete`);
    toast.success(response.data.message);
    updateUser();
  }catch(err){
    toast.error(err.response.data.message);
  }
  
}

  return (
    <div className="container mt-5">
      {user &&
        <div className="card p-4 shadow-lg">
        <div className="d-flex justify-content-end mb-2"><button className="btn btn-primary" style={{width:"150px"}} onClick={handleEditClick}>
            <FaEdit /> Edit Profile
        </button></div>
        {/* Profile Header */}
        <div className="text-center">
        <div className=" d-flex justify-content-center">
            <div className=" position-relative" style={{width:"250px"}}>
            <img
                src={user.profileImage.url}
                alt="Profile-pic"
                className="rounded-circle mb-3"
                style={{width:"200px", height:"200px", objectFit:"cover", objectPosition:"top"}}
                />
                <label htmlFor="profile-pic" className="rounded-circle bg-secondary p-2" style={{position:"absolute", bottom:"25px", right:"45px"}}>
                <FaCamera className="text-white fs-4"/>
            </label>
            </div>
        </div>
            <input type="file" id="profile-pic" onChange={handleImageChange} style={{display:"none"}}/>
            <h2 className="mb-1">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h2>
            <p className="text-muted">Organ {user.category}</p>
        </div>
        {/* Edit Profile Modal */}
                {isEditing && 
                <EditProfileModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                values={values}
                handleSubmit={handleSubmit}
                setFieldValue={setFieldValue}
            />
                }
        {/* User Details */}
        <div className="mt-4">
            <h4 className="text-primary">Personal Information</h4>
            <ul className="list-group">
            <li className="list-group-item">
                <strong>Full Name:</strong> {user.fullName || "Not Provided"}
            </li>
            {/* <li className="list-group-item">
                <strong>Age:</strong> {user.age}
            </li> */}
            {/* <li className="list-group-item">
                <strong>Blood Type:</strong> {user.bloodType}
            </li> */}
            <li className="list-group-item">
                <strong>Phone Number:</strong> {user.phoneNumber || "Not Provided"}
            </li>
            <li className="list-group-item">
                <strong>Email:</strong> {user.email}
            </li>
            <li className="list-group-item">
                <strong>Address:</strong> {user.address || "Not Provided"}
            </li>
            </ul>
        </div>

        <div className='row no-gutters d-flex'>
        <h4 className="text-primary mt-3">Your Story</h4>
        {!story && <div className="col-4"><button className="btn btn-primary btn-lg" onClick={()=>{navigate("/create-story")}}>Share Your Story</button></div>}
        {isStoryEditing && (
          <EditStoryForm story={story} onClose={() => setIsStoryEditing(false)}/>
        )}
        {story && (
          <div className="mt-4" style={{width:"400px"}}>
            <div className="card bg-secondary-subtle">
              <Link
                to={user.category === "donor" ? `/donor-stories/${story?._id}` : `/recipient-stories/${story?._id}`}
                className="text-decoration-none text-dark"
              >
                <img
                  src={story?.image?.url}
                  className="card-img-top story-img"
                  alt={story?.image?.filename || "Story Image"}
                  style={{ height: "280px", objectFit:"cover", objectPosition:"center" }}
                />
                <div className="card-body pb-0">
                  <h5 className="card-title">{story?.title}</h5>
                  <p className="card-text">{story?.description?.slice(0, 100) || "No description available"}</p>
                  <p>Read more &gt;</p>
                  <p>Status: <span className={story.status==="pending"?"text-primary":"text-success"}> {story.status}</span></p>
                </div>
              </Link>
              <div className="d-flex justify-content-between pb-3 ps-3 pe-3 pt-0 mt-0">
                <button className="btn btn-primary" onClick={()=>handleEditStory(story._id)}>Edit Story</button>
                <button className="btn btn-danger" onClick={()=>handleDeleteStory(story._id)}>Delete Story</button>
              </div>
            </div>
          </div>
        )}

        </div>

        {/* Organ Donation History */}
        {/* <div className="mt-4">
            <h4 className="text-success">Donation History</h4>
            <ul className="list-group"> */}
            {/* {user.organsDonated.length > 0 ? (
                user.organsDonated.map((organ, index) => (
                <li key={index} className="list-group-item">
                    {organ}
                </li>
                ))
            ) : (
                <li className="list-group-item text-muted">
                No organs donated yet.
                </li>
            )} */}
            {/* </ul>
        </div> */}
        </div>
      }
    </div>
  );
};

export default ProfilePage;

