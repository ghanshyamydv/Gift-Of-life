// import axios from "axios";
// import React, { useEffect, useState } from "react";
// // import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

// const NewsAndEvent = () => {
//   const [newsList, setNewsList] = useState([]);
//   const [eventList, setEventList] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({ date: "", title: "", description: "", category: "" }); // Added category field
//   const [isEditing, setIsEditing] = useState(false); // To track if editing an existing item
//   const [editId, setEditId] = useState(null); // To store the ID of the item being edited
//   const [newsandeventsData,setNewsandeventsData]=useState();

//   useEffect(()=>{
//     const fetchData=async ()=>{
//         try {
//             const resNewsandeventsData=await axios.get("http://localhost:4000/admin/newsandevents");
//             setNewsandeventsData(resNewsandeventsData)

//           } catch (err) {
//             // setResponseMessage("Error: " + err.message);
//             console.log("error :", err);
            
//           }
//     }
//     fetchData();
//   },[])
//   // Open modal for adding or editing
//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

//   // Close modal and reset form data
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setFormData({ date: "", title: "", description: "", category: "" });
//     setIsEditing(false);
//     setEditId(null);
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const response=await axios.post("http://localhost:4000/admin/newsandevents",formData);
//         if (response.status === 200) {
//           // Reset the form data
//           handleCloseModal();
//         } else {
//           console.error("Failed to submit data");
//         }
//       } catch (err) {
//         // setResponseMessage("Error: " + err.message);
//         console.log("error :", err);
        
//       }
//     if (isEditing) {
//       // Update existing item
//       if (formData.category === "news") {
//         const updatedNewsList = newsList.map((news) =>
//           news._id === editId ? { ...news, ...formData } : news
//         );
//         setNewsList(updatedNewsList);
//       } else {
//         const updatedEventList = eventList.map((event) =>
//           event._id === editId ? { ...event, ...formData } : event
//         );
//         setEventList(updatedEventList);
//       }
//     } else {
//       // Add new item
//       if (formData.category === "news") {
//         const newNews = { id: newsList.length + 1, ...formData };
//         setNewsList([...newsList, newNews]);
//       } else {
//         const newEvent = { id: eventList.length + 1, ...formData };
//         setEventList([...eventList, newEvent]);
//       }
//     }
//     // handleCloseModal();
//   };

//   // Function to handle deleting a news item
//   const handleDeleteNews = (id) => {
//     const updatedNewsList = newsList.filter((news) => news._id !== id);
//     setNewsList(updatedNewsList);
//   };

//   // Function to handle deleting an event item
//   const handleDeleteEvent = (id) => {
//     const updatedEventList = eventList.filter((event) => event._id !== id);
//     setEventList(updatedEventList);
//   };

//   // Function to handle editing a news or event item
//   const handleEdit = (id, category) => {
//     const itemToEdit = category === "news" ? newsList.find((news) => news._id === id) : eventList.find((event) => event._id === id);
//     setFormData(itemToEdit);
//     setIsEditing(true);
//     setEditId(id);
//     handleOpenModal();
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Manage News and Events</h1>
//       <div className="text-center mb-4">
//         <button className="btn btn-primary mx-2" onClick={handleOpenModal}>
//           Add News/Event
//         </button>
//       </div>

//       {/* Two-column layout for News and Events */}
//       <div className="row">
//         {/* News Section */}
//         <div className="col-md-6">
//           <h2 className="mb-3 text-center">News</h2>
//           <div className="row">
//             {newsList.map((news) => (
//               <div key={news._id} className="col-md-12 mb-4">
//                 <div className="card h-100">
//                   <div className="card-body">
//                     <h5 className="card-title">{news.title}</h5>
//                     <p className="card-text">{news.description}</p>
//                     <p className="card-text">
//                       <small className="text-muted">{news.date}</small>
//                     </p>
//                     <div className="d-flex justify-content-end">
//                       <button
//                         className="btn btn-warning btn-sm mx-2"
//                         onClick={() => handleEdit(news._id, "news")}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDeleteNews(news._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Events Section */}
//         <div className="col-md-6">
//           <h2 className="mb-3 text-center">Events</h2>
//           <div className="row">
//             {eventList.map((event) => (
//               <div key={event._id} className="col-md-12 mb-4">
//                 <div className="card h-100">
//                   <div className="card-body">
//                     <h5 className="card-title">{event.title}</h5>
//                     <p className="card-text">{event.description}</p>
//                     <p className="card-text">
//                       <small className="text-muted">{event.date}</small>
//                     </p>
//                     <div className="d-flex justify-content-end">
//                       <button
//                         className="btn btn-warning btn-sm mx-2"
//                         onClick={() => handleEdit(event._id, "event")}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDeleteEvent(event._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Modal for Form */}
//       {showModal && (
//         <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">{isEditing ? "Edit Item" : "Add News/Event"}</h5>
//                 <button type="button" className="btn-close" onClick={handleCloseModal}></button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label htmlFor="category" className="form-label">
//                       Category
//                     </label>
//                     <select
//                       className="form-control"
//                       id="category"
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <option value="" disabled>Select Category</option>
//                       <option value="news">News</option>
//                       <option value="event">Event</option>
//                     </select>
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="date" className="form-label">
//                       Date
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="date"
//                       name="date"
//                       value={formData.date}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="title" className="form-label">
//                       Title
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="title"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="description" className="form-label">
//                       Description
//                     </label>
//                     <textarea
//                       className="form-control"
//                       id="description"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="d-flex justify-content-end">
//                     <button type="button" className="btn btn-secondary mx-2" onClick={handleCloseModal}>
//                       Close
//                     </button>
//                     <button type="submit" className="btn btn-primary">
//                       {isEditing ? "Update" : "Save"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewsAndEvent;

import React, { useState, useEffect } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const NewsAndEvent = () => {
  const [newsList, setNewsList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ date: "", title: "", description: "", category: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [refreshData, setRefreshData] = useState(false); // State to trigger useEffect re-run

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resNewsandeventsData = await axios.get("http://localhost:4000/admin/newsandevents");
        // Assuming the response data is structured as { news: [], events: [] }
        setNewsList(resNewsandeventsData.data.news);
        setEventList(resNewsandeventsData.data.events);
      } catch (err) {
        console.log("error :", err);
      }
    };
    fetchData();
  }, [refreshData]); // Add refreshData as a dependency

  // Open modal for adding or editing
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Close modal and reset form data
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ date: "", title: "", description: "", category: "" });
    setIsEditing(false);
    setEditId(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing item
        await axios.patch(`http://localhost:4000/admin/newsandevents/${editId}/edit`, formData);
      } else {
        // Add new item
        await axios.post("http://localhost:4000/admin/newsandevents", formData);
      }
      setRefreshData(!refreshData); // Toggle refreshData to trigger useEffect
      handleCloseModal();
    } catch (err) {
      console.log("error :", err);
    }
  };

  // Function to handle deleting a news or event item
  const handleDelete = async (id, category) => {
    try {
      await axios.delete(`http://localhost:4000/admin/newsandevents/${id}/delete`);
      setRefreshData(!refreshData); // Toggle refreshData to trigger useEffect
    } catch (err) {
      console.log("error :", err);
    }
  };

  // Function to handle editing a news or event item
  const handleEdit = (id, category) => {
    const itemToEdit = category === "news" ? newsList.find((news) => news._id === id) : eventList.find((event) => event._id === id);
    setFormData(itemToEdit);
    setIsEditing(true);
    setEditId(id);
    handleOpenModal();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <div className="text-center mb-4">
        <button className="btn btn-primary mx-2" onClick={handleOpenModal}>
          Add News/Event
        </button>
      </div>

      {/* Two-column layout for News and Events */}
      <div className="row">
        {/* News Section */}
        <div className="col-md-6">
          <h2 className="mb-3 text-center">News</h2>
          <div className="row">
            {newsList.slice().reverse().map((news) => (
              <div key={news._id} className="col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{news.title}</h5>
                    <p className="card-text">{news.description}</p>
                    <p className="card-text">
                      <small className="text-muted">{news.date}</small>
                    </p>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-warning btn-sm mx-2"
                        onClick={() => handleEdit(news._id, "news")}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(news._id, "news")}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div className="col-md-6">
          <h2 className="mb-3 text-center">Events</h2>
          <div className="row">
            {eventList.slice().reverse().map((event) => (
              <div key={event._id} className="col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.description}</p>
                    <p className="card-text">
                      <small className="text-muted">{event.date}</small>
                    </p>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-warning btn-sm mx-2"
                        onClick={() => handleEdit(event._id, "event")}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(event._id, "event")}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Form */}
      {showModal && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? "Edit Item" : "Add News/Event"}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-control"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                        <option value="" disabled>Select Category</option>
                      <option value="news">News</option>
                      <option value="event">Event</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary mx-2" onClick={handleCloseModal}>
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {isEditing ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsAndEvent;