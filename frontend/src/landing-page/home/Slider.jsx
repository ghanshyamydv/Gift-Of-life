import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Track the current slide
  const slideContainerRef = useRef(null); // Reference to the slide container
  const intervalRef = useRef(null); // Reference to the auto-slide interval
  const slideWidth = 100; // Slide width in %

  const slides = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ];

  // Clone first and last slides for infinite loop effect
  const clonedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const startSlide = (index) => {
    if (slideContainerRef.current) {
      slideContainerRef.current.style.transition = "transform 0.6s ease-in-out";
      slideContainerRef.current.style.transform = `translateX(-${slideWidth * index}%)`;
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      // If at the last clone (left of first real slide)
      setCurrentIndex(slides.length);
      slideContainerRef.current.style.transition = "none";
      slideContainerRef.current.style.transform = `translateX(-${slideWidth * slides.length}%)`;
    } else if (currentIndex === slides.length + 1) {
      // If at the first clone (right of last real slide)
      setCurrentIndex(1);
      slideContainerRef.current.style.transition = "none";
      slideContainerRef.current.style.transform = `translateX(-${slideWidth}%)`;
    }
  };

  useEffect(() => {
    startSlide(currentIndex);
  }, [currentIndex]);

  // Auto-slide functionality
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(intervalRef.current); // Clear interval on unmount
  }, []);

  const handleMouseOver = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseOut = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);
  };

  return (
    <div
      className="custom-slider-container"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div
        className="slide-container"
        ref={slideContainerRef}
        onTransitionEnd={handleTransitionEnd}
        style={{
          display: "flex",
          transform: `translateX(-${slideWidth * currentIndex}%)`,
        }}
      >
        {clonedSlides.map((src, index) => (
          <div className="slide" key={index}>
            <img src={src} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button className="prev slide-btn" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className="next slide-btn" onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Slider;
