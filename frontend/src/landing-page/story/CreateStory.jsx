import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";
import { toast } from 'react-toastify';

const DonorStoryForm = () => {
  const navigate=useNavigate();
  const { pathname } = useLocation();

  const {isLoggedIn} = useContext(AuthContext);
  useEffect(()=>{
    window.scrollTo(0, 0); // Scroll to top on route change
    if(!isLoggedIn){
      navigate("/login")
      console.log("hi");
      
      toast.warning("Please log in to proceed.")
    }
  },[isLoggedIn, navigate, pathname])

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    category: "", // Default category
  });

  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file, // Store the file object
        });
        setImagePreview(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", {
      ...formData// Log the file name instead of the file object
    });
    try {
        const token = localStorage.getItem('token');
        if(token){
        const response = await axios.post("http://localhost:4000/api/create-story",formData,
            {
                headers: { "Content-Type": "multipart/form-data", Authorization:token },
            }
        );
       toast.success(response.data.message,{autoClose:3000})
          navigate(-1);
    }
      } catch (err) {
      toast.error(err.response.data.message)
      }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="donor-story-form p-4 bg-light rounded shadow">
            <h2 className="text-center mb-4">Share Your Gift of Life Story</h2>
            <form onSubmit={handleSubmit}>
              {/* Title Field */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Story Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Select Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="donor">Donor</option>
                  <option value="recipient">Recipient</option>
                </select>
              </div>

              {/* Image Upload Field */}
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Your Photo
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-fluid"
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                )}
              </div>

              {/* Description Field */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Your Story
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg">
                  Share Your Story
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorStoryForm;