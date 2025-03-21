import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AdminAuthContext } from '../AdminAuthProvider';

const PostProduct = () => {
  const {backendUrl}=useContext(AdminAuthContext);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });

  const [imageFile, setImageFile] = useState(null); // State to store the image file
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setImageFile(file); // Store the file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the file and other data
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('quantity', productData.quantity);
    formData.append('image', imageFile); // Append the image file

    try {
      const response = await axios.post(`${backendUrl}/api/admin/product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });
      setMessage('Product posted successfully!');
      setProductData({
        name: '',
        description: '',
        price: '',
        quantity: '',
      });
      // console.log('Product posted:', response.data);
    } catch (error) {
      setMessage('Error posting product');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Post a Product for Sale</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="price" className="form-label">
            Price &#8377;:
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="quantity" className="form-label">
            Quantity:
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="image" className="form-label">
            Product Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*" // Allow only image files
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Post Product
          </button>
        </div>

        {message && <p className=" text-success mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default PostProduct;