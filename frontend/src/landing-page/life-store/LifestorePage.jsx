import React, { useState,useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../AuthProvider';

const LifeStorePage = () => {
  const {backendUrl}=useContext(AuthContext);
  const navigate=useNavigate();
  const [products, setProducts] = useState([]);
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


  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleBuyNow=(product)=>{
    navigate(`/${product._id}/buy`)
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
      <h2 className="text-center mb-4">Welcome To Life Store</h2>
      <form className='d-flex justify-content-center mb-2' onSubmit={handleSearch}>
        <input className='form-control border-primary' style={{width:"300px"}} type="text" name='searchInput'/>
        <button type='submit' className='btn btn-outline-primary ms-2'>Search</button>
      </form>
      <p className="text-center lead">
        Support the Gift of Life Organ Donation Platform by purchasing our merchandise. Every purchase helps spread awareness and save lives.
      </p>
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
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-success flex-grow-1"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex align-item-center justify-content-between">
                <span>{item.name} - &#8377;{item.price.toFixed(2)}</span>
                <div>
                <button
                    className="btn btn-success"
                    style={{width:"150px"}}
                    onClick={() => handleBuyNow()}
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn btn-danger ms-3"
                    style={{width:"150px"}}
                    onClick={() => handleBuyNow()}
                  >
                    Remove
                  </button>
                </div>
              </li>
              
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LifeStorePage;