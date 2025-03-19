import React from 'react';

const Contribute = () => {
  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-4 text-center">
            <h1 className="mb-4">Contribute to Gift of Life</h1>
            <p className="lead">
              We are dedicated to managing the Gift of Life website, helping to save lives and make a difference. Your contribution will help us continue our great work.
            </p>
            <div className="mt-2">
              <p className="mb-3">Scan the QR code below to donate:</p>
              <img
                src="/images/phonepay-scanner.jpg"
                alt="Donation QR Code"
                className="img-fluid"
              />
              <p className="mt-3 text-muted">
                Thank you for your support!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribute;