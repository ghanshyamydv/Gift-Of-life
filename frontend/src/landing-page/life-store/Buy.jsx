import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const BuyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [showAnimation, setShowAnimation] = useState(false); // Animation state

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/admin/product/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        console.log("error :", err);
      }
    };
    fetchData();
  }, [id]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    quantity: 1,
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderConfirmed(true); // Show order confirmation
  };

  const totalPrice = formData.quantity * product.price;

  const handleConfirmOrder = async () => {
    setLoading(true); // Start loading
    setShowAnimation(true); // Show animation

    // Simulate a 2-second delay
    setTimeout(async () => {
      try {
        const newFormData = { ...formData, totalPrice };
        const response = await axios.post(`http://localhost:4000/api/${id}/buy`, newFormData);
        if (response.data.success) {
          // Navigate to the Thank You page with formData as state
          navigate('/thank-you', { state: { order: response.data.order } });
        } else {
          toast.warning("Order confirmation failed. Please try again.",{onClose:5000})
        }
      } catch (error) {
        console.error("Error confirming order:", error);
        alert('An error occurred. Please try again.');
      } finally {
        setLoading(false); // Stop loading
        setShowAnimation(false); // Hide animation
      }
    }, 2000); // 2-second delay
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {/* Product Image */}
          <div className="text-center mb-4">
            <img
              src={product?.image?.url}
              alt={product?.name}
              className="img-fluid rounded"
              style={{ maxWidth: '50%', height: 'auto' }}
            />
          </div>

          <h2 className="text-center mb-4">{product?.name}</h2>
          <p className="text-center mb-4">{product?.description}</p>
          <p className="text-center mb-4">Price: &#8377;{product?.price}</p>

          {!orderConfirmed ? (
            // Buy Form
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address:
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Proceed to Cash on Delivery
              </button>
            </form>
          ) : (
            // Order Confirmation
            <div className="order-confirmation">
              <h3 className="text-center mb-4">Order Summary</h3>
              <div className="card">
                <div className="card-body">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Mobile Number:</strong> {formData.mobile}</p>
                  <p><strong>Address:</strong> {formData.address}</p>
                  <p><strong>Quantity:</strong> {formData.quantity}</p>
                  <p><strong>Total Price:</strong> &#8377;{totalPrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="payment-method mt-4">
                <h4>Payment Method: Cash on Delivery</h4>
                <p>
                  Your order will be delivered to the provided address. Please keep the exact amount
                  ready for payment upon delivery.
                </p>
              </div>

              <button
                className="btn btn-success w-100 mt-4"
                onClick={handleConfirmOrder}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  // Loading spinner and animation
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="ms-2">Processing...</span>
                  </div>
                ) : (
                  'Confirm Order'
                )}
              </button>

              {/* Animation Section */}
              {showAnimation && (
                <div className="text-center mt-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Your order is being processed...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyPage;