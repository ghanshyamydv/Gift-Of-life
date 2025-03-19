import React from "react";
import { Link } from "react-router";
const PageNotFound = () => {
  return (
    <div
      className="d-flex flex-column mt-5 align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="text-center">
        {/* 404 Heading */}
        <h1
          className="display-1 fw-bold"
          style={{ color: "#343a40", fontSize: "6rem" }}
        >
          404
        </h1>

        {/* Page Not Found Message */}
        <p
          className="fs-3"
          style={{ color: "#6c757d", marginBottom: "1.5rem" }}
        >
          Oops! Page not found.
        </p>

        {/* Description */}
        <p className="lead" style={{ color: "#495057", marginBottom: "2rem" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#0d6efd",
            border: "none",
            padding: "0.75rem 2rem",
            fontSize: "1.1rem",
          }}
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;