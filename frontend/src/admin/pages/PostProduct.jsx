import React, { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminAuthContext } from '../AdminAuthProvider';

const EditProductForm = ({product, setIsProductEditing, setProducts}) => {
  const {backendUrl}=useContext(AdminAuthContext);
  
  const [formData, setFormData] = useState({
    name: product.name,
    image: product.image,
    description: product.description,
    price: product.price
  });

  const [imagePreview, setImagePreview] = useState(formData.image.url); // State for image preview

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
    try {
        const res = await axios.patch(`${backendUrl}/api/admin/product/${product._id}/edit`,formData,
            {
                headers: { "Content-Type": "multipart/form-data"},
            }
        );
      //  toast.success(response.data.message,{autoClose:3000})
      const response = await axios.get(`${backendUrl}/api/admin/product`);
       setProducts(response.data.products);
       setIsProductEditing(false);
      } catch (err) {
        console.log(err);
        
      // toast.error(err.response.data.message)
      }
  };

  return (
    <div className="confirm-container pb-3" style={{paddingTop:"150px"}}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="donor-product-form p-4 bg-light rounded shadow">
            <h2 className="text-center mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
              {/* Title Field */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>{" "}
                <input type="number" htmlFor="price" name='price' value={formData.price} onChange={handleChange}/>
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
              <button type="submit" className="btn btn-success mt-3">Save Changes</button>
              <button type="button" className="btn btn-secondary mt-3 ms-3 ml-2" onClick={()=>setIsProductEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const LifeStorePage = () => {
  const {backendUrl}=useContext(AdminAuthContext);
  const [products, setProducts] = useState([]);
  const [currProduct,setCurrentProduct]=useState({});
  const [isProductEditing, setIsProductEditing]=useState(false);
    // Fetch data from the server
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${backendUrl}/api/admin/product`);
          setProducts(response.data.products);
        } catch (err) {
          console.log("error :", err);
        }
      };
      fetchData();
    }, []);



  const handleEditProduct = (product) => {
    // try{
    //   await axios.patch(`${backendUrl}/api/admin/product/${productId}/edit`);
    //   const response = await axios.get(`${backendUrl}/api/admin/product`);
    //       setProducts(response.data.products);

    // }catch(err){
    //   console.log(err);
      
    // }
    setCurrentProduct(product);
    setIsProductEditing(true);
  };

  const handleDeleteProduct=async (productId)=>{
    try{
      const res=await axios.delete(`${backendUrl}/api/admin/product/${productId}/delete`);
      const response = await axios.get(`${backendUrl}/api/admin/product`);
          setProducts(response.data.products);

    }catch(err){
      console.log(err); 
    }
    
  }
  const handleSearch=async(event)=>{
    event.preventDefault();
    const searchTerm=event.target.elements.searchInput.value;
    try {
      const response = await axios.get(`${backendUrl}/api/products/search`, {
        params: { q: searchTerm }, // Send search term as a query parameter
      });
      setProducts(response.data.results);
    } catch (err) {
      console.log("error :", err);
    }
  }

  return (
    <div className="container mt-2">
      {isProductEditing && <EditProductForm product={currProduct} setIsProductEditing={setIsProductEditing} setProducts={setProducts}/>}
      <h2 className="text-center mb-4">Life Store Products</h2>
      <form className='d-flex justify-content-center mb-4' onSubmit={handleSearch}>
        <input className='form-control border-primary' style={{width:"300px"}} type="text" name='searchInput'/>
        <button type='submit' className='btn btn-outline-primary ms-2'>Search</button>
      </form>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={product.image.url} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">&#8377;{product.price.toFixed(2)}</p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={() => handleEditProduct (product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger flex-grow-1"
                    onClick={() => handleDeleteProduct(product._id)}
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
  );
};


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
      <LifeStorePage/>
    </div>
  );
};

export default PostProduct;