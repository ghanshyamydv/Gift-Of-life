import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // For navigation and accessing state
import { BsCashCoin } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {}; // Access order details from state
  
  const handleContinueShopping = () => {
    navigate('/donate-life-store'); // Redirect to the homepage or shopping page
  };

  // Fallback if no order details are found
  if (!order) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <h1 className="display-4 mb-4">Order Not Found</h1>
          <p className="lead mb-4">
            Sorry, we couldn't retrieve your order details.
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-4 mb-4 text-success"><IoMdCheckmarkCircleOutline/> Thank You {order?.name.substring(0,order?.name.indexOf(' '))} for Your Order!</h1>
        <p className="lead mb-4">
          Your order has been confirmed. You will receive an email with the details shortly.
        </p>

        {/* Order Details Section */}
        <div className="card mb-4">
          <div className="card-body text-start">
            <h5 className="card-title">Order Details</h5>
            <div className="card-text">
              <strong>Contact Information:</strong> 
              <p className='fs-6 m-0 p-0'>{order?.email}</p>
              <p className='fs-6'>{order?.mobile}</p>
            </div>
            <div className="card-text">
              <strong>Shipping and Billing Address:</strong> 
              <p className='fs-6 m-0 p-0'>{order?.address}</p>
              <p className='fs-6'>{order?.mobile}</p>
            </div>
              <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString('en-IN',{
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: 'Asia/Kolkata',
            })}
            
            <div className="card-text">
              <strong>Payment Method:</strong> 
              <p className='fs-6 m-0 p-0'><BsCashCoin/> Cash On Delivery (COD) - &#8377;{order?.totalPrice?.toFixed(2)}</p>
            </div>
            <h6 className="mt-3">Item:</h6>
            <ul className="list-group">
              {/* {order?.item?.map((item, index) => ( */}
                <li key={order?.product?._id} className="list-group-item">
                  {order?.product?.name} - &#8377;{order?.product?.price.toFixed(2)} x {order?.quantity} = {}&#8377;{order?.totalPrice?.toFixed(2)}
                </li>
              {/* ))} */}
            </ul>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <button
          className="btn btn-primary btn-lg"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;