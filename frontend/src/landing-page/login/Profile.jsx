// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { useParams, Link } from "react-router";
// import { FaCamera } from "react-icons/fa";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { AuthContext } from "../../AuthProvider";
// import { toast } from 'react-toastify';

// const ProfilePage = () => {
//     const {id}=useParams();
//     const {user, setUser}=useContext(AuthContext);
//     const [story , setStory]=useState();

//     const handleImageChange = async (e) => {
//         console.log("hi");  
//         const file = e.target.files[0];
//         if (file) {
//         //  const response= await axios.post(`http://localhost:4000/api/${id}/profile`,{profileImage:file},
//         //     {
//         //         headers: { "Content-Type": "multipart/form-data"},
//         //       }
//         //   );
//           const response= toast.promise(
//             axios.post(`http://localhost:4000/api/${id}/profile`,{profileImage:file},
//                 {
//                     headers: { "Content-Type": "multipart/form-data"},
//                   }
//               ),
//             {
//               pending: 'Updating Your photo...',
//               success: 'Updated Successfully! 👌',
//               error: 'Updation rejected 🤯'
//             }
//         )
//           setUser(response.data.updatedUser);
//         }
//       };

// // useEffect(()=>{
// //     const fetchUser=async ()=>{
// //         const response= await axios.get(`http://localhost:4000/api/${id}/profile`);
// //         setUser(response.data)
// //     }
// //     fetchUser();
// // },[handleImageChange])

// // useEffect(()=>{
// //     const fetchUser=async ()=>{
// //         const storyRes= await axios.get(`http://localhost:4000/api${user?.category==="donor"?`/donor-story/${user?._id}`:`/recipient-story/${user?._id}`}`);
// //         console.log(storyRes);
// //     }
// //     if(user){
// //         fetchUser();
// //     }
    
// // },[])

// // Fetch user profile
// useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/${id}/profile`);
//         setUser(response.data);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     fetchUser();
//   }, [id,user]); // Add `id` as a dependency

//   // Fetch user story based on user category
//   useEffect(() => {
//     const fetchUserStory = async () => {
//       if (user?.category && user?._id) {
//         try {
//           const storyRes = await axios.get(
//             `http://localhost:4000/api/${
//               user.category === "donor" 
//                 ? `donor-story/${user._id}` 
//                 : `recipient-story/${user._id}`
//             }`
//           );
//           setStory(storyRes.data.story);
//         } catch (error) {
//           console.error("Error fetching user story:", error);
//         }
//       }
//     };

//     fetchUserStory();
//   }, [user]); // Add `user` as a dependency


//   return (
//     <div className="container mt-5">
//       {user &&
//         <div className="card p-4 shadow-lg">
//         {/* Profile Header */}
//         <div className="text-center">
//         <div className=" d-flex justify-content-center">
//             <div className=" position-relative" style={{width:"250px"}}>
//             <img
//                 src={user.profileImage.url}
//                 alt="Profile-pic"
//                 className="rounded-circle mb-3"
//                 style={{width:"200px", height:"200px", objectFit:"cover", objectPosition:"top"}}
//                 />
//                 <label htmlFor="profile-pic" className="rounded-circle bg-secondary p-2" style={{position:"absolute", bottom:"25px", right:"45px"}}>
//                 <FaCamera className="text-white fs-4"/>
//             </label>
//             </div>
//         </div>
//             <input type="file" id="profile-pic" onChange={handleImageChange} style={{display:"none"}}/>
//             <h2 className="mb-1">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h2>
//             <p className="text-muted">Organ {user.category}</p>
//         </div>

//         {/* User Details */}
//         <div className="mt-4">
//             <h4 className="text-primary">Personal Information</h4>
//             <ul className="list-group">
//             {/* <li className="list-group-item">
//                 <strong>Age:</strong> {user.age}
//             </li> */}
//             {/* <li className="list-group-item">
//                 <strong>Blood Type:</strong> {user.bloodType}
//             </li> */}
//             {/* <li className="list-group-item">
//                 <strong>Phone:</strong> {user.phone}
//             </li> */}
//             <li className="list-group-item">
//                 <strong>Email:</strong> {user.email}
//             </li>
//             {/* <li className="list-group-item">
//                 <strong>Address:</strong> {user.address}
//             </li> */}
//             </ul>
//         </div>

//         <div className='row no-gutters d-flex'>
//         <h4 className="text-primary mt-3">Your Story</h4>
//               {story &&
//               <Link to={user.category==="donor"?`/donor-stories/${story?._id}`:`/recipient-stories/${story?._id}`} className="col-4 mt-3 text-decoration-none">
//               <div className="card bg-secondary-subtle">
//               <img src={story?.image?.url} className="card-img-top story-img" alt={story?.image?.filename} style={{height:"260px"}}/>
//               <div className="card-body">
//                   <h5 className="card-title">{story?.title}</h5>
//                   <p className="card-text">{story?.description.slice(0,100)}</p>
//                   <p>Read more &gt;</p>
//               </div>
//               </div>
//               </Link>
//               }
//         </div>

//         {/* Organ Donation History */}
//         <div className="mt-4">
//             <h4 className="text-success">Donation History</h4>
//             <ul className="list-group">
//             {/* {user.organsDonated.length > 0 ? (
//                 user.organsDonated.map((organ, index) => (
//                 <li key={index} className="list-group-item">
//                     {organ}
//                 </li>
//                 ))
//             ) : (
//                 <li className="list-group-item text-muted">
//                 No organs donated yet.
//                 </li>
//             )} */}
//             </ul>
//         </div>
//         </div>
//       }
//     </div>
//   );
// };

// export default ProfilePage;


import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { FaCamera, FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import { AuthContext } from "../../AuthProvider";

const ProfilePage = () => {
    const { id } = useParams();
    const { user, setUser } = useContext(AuthContext);
    const [story, setStory] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        profileImage: null, // For file upload
    });

    // Fetch user profile
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/${id}/profile`);
                setUser(response.data);
                setFormData({
                    username: response.data.username,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber || "", // Handle optional fields
                    profileImage: null, // Reset file input
                });
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUser();
    }, [id, user]); // Add `id` as a dependency

    // Fetch user story based on user category
    useEffect(() => {
        const fetchUserStory = async () => {
            if (user?.category && user?._id) {
                try {
                    const storyRes = await axios.get(
                        `http://localhost:4000/api/${
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

    // Handle image change
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append("profileImage", file);

                const response = await toast.promise(
                    axios.post(`http://localhost:4000/api/${id}/profile`, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    }),
                    {
                        pending: 'Updating Your photo...',
                        success: 'Updated Successfully! 👌',
                        error: 'Updation rejected 🤯'
                    }
                );
                setUser(response.data.updatedUser);
            } catch (error) {
                console.error("Error updating profile image:", error);
            }
        }
    };

    // Handle edit button click
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            profileImage: file,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("username", formData.username);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("phoneNumber", formData.phoneNumber);
            if (formData.profileImage) {
                formDataToSend.append("profileImage", formData.profileImage);
            }

            const response = await toast.promise(
                axios.put(`http://localhost:4000/api/profile/edit`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                }),
                {
                    pending: 'Updating profile...',
                    success: 'Profile updated successfully! 👌',
                    error: 'Profile update failed 🤯'
                }
            );
            setUser(response.data.updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="container mt-5">
            {user &&
                <div className="card p-4 shadow-lg">
                    {/* Profile Header */}
                    <div className="text-center">
                        <div className="d-flex justify-content-center">
                            <div className="position-relative" style={{ width: "250px" }}>
                                <img
                                    src={user.profileImage.url}
                                    alt="Profile-pic"
                                    className="rounded-circle mb-3"
                                    style={{ width: "200px", height: "200px", objectFit: "cover", objectPosition: "top" }}
                                />
                                <label htmlFor="profile-pic" className="rounded-circle bg-secondary p-2" style={{ position: "absolute", bottom: "25px", right: "45px" }}>
                                    <FaCamera className="text-white fs-4" />
                                </label>
                            </div>
                        </div>
                        <input type="file" id="profile-pic" onChange={handleImageChange} style={{ display: "none" }} />
                        <h2 className="mb-1">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h2>
                        <p className="text-muted">Organ {user.category}</p>
                        <button className="btn btn-primary" onClick={handleEditClick}>
                            <FaEdit /> Edit Profile
                        </button>
                    </div>

                    {/* Edit Profile Form */}
                    {isEditing && (
                        <div className="mt-4">
                            <h4 className="text-primary">Edit Profile</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Profile Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="profileImage"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success mt-3">Save Changes</button>
                                <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={() => setIsEditing(false)}>Cancel</button>
                            </form>
                        </div>
                    )}

                    {/* User Details */}
                    <div className="mt-4">
                        <h4 className="text-primary">Personal Information</h4>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Username:</strong> {user.username}
                            </li>
                            <li className="list-group-item">
                                <strong>Email:</strong> {user.email}
                            </li>
                            <li className="list-group-item">
                                <strong>Phone Number:</strong> {user.phoneNumber || "Not provided"}
                            </li>
                        </ul>
                    </div>

                    <div className='row no-gutters d-flex'>
                        <h4 className="text-primary mt-3">Your Story</h4>
                        {story &&
                            <Link to={user.category === "donor" ? `/donor-stories/${story?._id}` : `/recipient-stories/${story?._id}`} className="col-4 mt-3 text-decoration-none">
                                <div className="card bg-secondary-subtle">
                                    <img src={story?.image?.url} className="card-img-top story-img" alt={story?.image?.filename} style={{ height: "260px" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{story?.title}</h5>
                                        <p className="card-text">{story?.description.slice(0, 100)}</p>
                                        <p>Read more &gt;</p>
                                    </div>
                                </div>
                            </Link>
                        }
                    </div>

                    {/* Organ Donation History */}
                    <div className="mt-4">
                        <h4 className="text-success">Donation History</h4>
                        <ul className="list-group">
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
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProfilePage;