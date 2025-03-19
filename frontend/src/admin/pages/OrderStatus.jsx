import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [remainingOrders, setRemainingOrders] = useState(0);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders');
        setOrders(response.data.orders);
        updateOrderCounts(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Update completed and remaining order counts
  const updateOrderCounts = (orders) => {
    const completed = orders.filter((order) => order.status === 'Delivered').length;
    const remaining = orders.length - completed;
    setCompletedOrders(completed);
    setRemainingOrders(remaining);
  };

  // Mark an order as delivered
  const handleDeliverOrder = async (orderId) => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/orders/${orderId}/deliver`);
      if (response.data.success) {
        // Re-fetch the updated list of orders
        const fetchResponse = await axios.get('http://localhost:4000/api/orders');
        setOrders(fetchResponse.data.orders); // Update the orders state
        updateOrderCounts(fetchResponse.data.orders); // Update the counts
      }
    } catch (error) {
      console.error('Error delivering order:', error);
    }
  };

  // Cancel an order
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/orders/${orderId}`);
      if (response.data.success) {
        // Re-fetch the updated list of orders
        const fetchResponse = await axios.get('http://localhost:4000/api/orders');
        setOrders(fetchResponse.data.orders); // Update the orders state
        updateOrderCounts(fetchResponse.data.orders); // Update the counts
      }
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  // Separate remaining and delivered orders
  const remainingOrdersList = orders.filter((order) => order.status !== 'Delivered');
  const deliveredOrdersList = orders.filter((order) => order.status === 'Delivered');
  const options={
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Kolkata',
}
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Orders Management</h1>

      {/* Order Counts */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">Remaining Orders</h5>
              <p className="card-text">{remainingOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Completed Orders</h5>
              <p className="card-text">{completedOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Remaining Orders */}
      <h2 className="mb-3">Remaining Orders</h2>
      <div className="row mb-5">
        {remainingOrdersList.map((order) => (
          <div key={order._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
              <p className="card-title fs-6"><strong>Order ID:</strong> {order._id}</p>
                <p className="card-text fs-6">
                  <strong>Customer Name:</strong> {order.name}
                </p>
                <p className="card-text fs-6">
                  <strong>Product Name:</strong> {order?.product?.name}
                </p>
                <p className="card-text fs-6">
                  <strong>Quantity:</strong> {order?.quantity}
                </p>
                <p className="card-text fs-6">
                  <strong>Total Price:</strong> &#8377;{order.totalPrice.toFixed(2)}
                </p>
                <p className="card-text fs-6">
                  <strong>Order Date :</strong>{new Date(order.createdAt).toLocaleString('en-IN',options)}
                </p>
                <p className="card-text fs-6">
                  <strong>Status:</strong>{' '}
                  <span className="badge bg-warning">{order.status}</span>
                </p>

                {/* Action Buttons */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleDeliverOrder(order._id)}
                  >
                    Mark as Delivered
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delivered Orders */}
      <h2 className="mb-3">Delivered Orders</h2>
      <div className="row">
        {deliveredOrdersList.slice().reverse().map((order) => (
          <div key={order._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <p className="card-title fs-6"><strong>Order ID:</strong> {order._id}</p>
                <p className="card-text fs-6">
                  <strong>Customer Name:</strong> {order.name}
                </p>
                <p className="card-text fs-6">
                  <strong>Product Name:</strong> {order?.product?.name}
                </p>
                <p className="card-text fs-6">
                  <strong>Quantity:</strong> {order?.quantity}
                </p>
                <p className="card-text fs-6">
                  <strong>Total Price:</strong> &#8377;{order.totalPrice.toFixed(2)}
                </p>
                <p className="card-text fs-6">
                  <strong>Order Date :</strong>{new Date(order.createdAt).toLocaleString('en-IN',options)}
                </p>
                <p className="card-text fs-6">
                  <strong>Delivered Date :</strong> {new Date(order.updatedAt).toLocaleString('en-IN',options)}
                </p>
                <p className="card-text fs-6">
                  <strong>Status:</strong>{' '}
                  <span className="badge bg-success">{order.status}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;