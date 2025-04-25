import React, { useState,useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { MdLocalGroceryStore } from "react-icons/md";
import { AuthContext } from '../../AuthProvider';

const LifeStorePage = () => {
  const {backendUrl}=useContext(AuthContext);
  const navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart]=useState(false);
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

    // Fetch data from the server
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = localStorage.getItem('lifeStoreCart');
          const parsedCart = response ? JSON.parse(response) : []; // fallback to empty array
          setCart(parsedCart);
        } catch (err) {
          console.log("error :", err);
        }
      };
      fetchData();
    }, []);


 

  const addToCart = (product) => {
    const productAlreadyExist=cart.find((item)=>item._id===product._id);
    if(!productAlreadyExist){
      localStorage.setItem('lifeStoreCart', JSON.stringify([...cart, product]));
      const response = localStorage.getItem('lifeStoreCart');
      const parsedCart = response ? JSON.parse(response) : []; // fallback to empty array
      setCart(parsedCart);
    }
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

  const handleRemove=(product)=>{
    localStorage.setItem('lifeStoreCart', JSON.stringify(cart.filter(item=>item._id!==product._id)));
      const response = localStorage.getItem('lifeStoreCart');
      const parsedCart = response ? JSON.parse(response) : []; // fallback to empty array
      setCart(parsedCart);
  }

  return (
    <div className="container mt-2">
      
      <div className='d-flex justify-content-between mt-4'>
      <h2 className="text-centermb-4" onClick={()=>setShowCart(false)}>Life Store</h2>
      <div><MdLocalGroceryStore className='fs-1' onClick={()=>{setShowCart(true)}}/><span className='text-white text-center rounded-circle bg-black d-block position-relative' style={{width:"18px", height:"18px", fontSize:"12px", bottom:"53px", left:"12px"}}>{cart.length}</span></div>
      </div>
      {!showCart && 
        <>
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
        </>
      }

      {showCart && 
        <div className="mt-5">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item._id} className="list-group-item d-flex align-item-center justify-content-between">
                <span>{item.name} - &#8377;{item.price.toFixed(2)}</span>
                <div>
                <button
                    className="btn btn-success"
                    style={{width:"150px"}}
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn btn-danger ms-3"
                    style={{width:"150px"}}
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        </div>
      }
    </div>
  );
};

export default LifeStorePage;