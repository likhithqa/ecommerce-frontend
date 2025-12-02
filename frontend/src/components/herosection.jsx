import { useState, useEffect } from 'react'
import '../css/herosection.css'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const slides = [
    {
      id: 1,
      title: 'Summer Collection 2024',
      subtitle: 'Discover the latest trends and exclusive deals',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=600&fit=crop',
      buttonText: 'Shop Now',
      color: '#FF6B6B'
    },
    {
      id: 2,
      title: 'Exclusive Offers',
      subtitle: 'Get up to 50% off on selected items',
      image: 'https://images.unsplash.com/photo-1492707892657-8a91a681e3e7?w=1200&h=600&fit=crop',
      buttonText: 'View Deals',
      color: '#4ECDC4'
    },
    {
      id: 3,
      title: 'New Arrivals',
      subtitle: 'Fresh products added every week',
      image: 'https://images.unsplash.com/photo-1441984904556-0ac8d9c0fb77?w=1200&h=600&fit=crop',
      buttonText: 'Explore',
      color: '#45B7D1'
    }
  ]

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, slides.length])

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const handleDotClick = (index) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Slides */}
        <div className="hero-slides">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="slide-image-wrapper">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="slide-image"
                />
                <div className="slide-overlay"></div>
              </div>

              <div className="slide-content">
                <div className="content-wrapper">
                  <h1 className="slide-title">{slide.title}</h1>
                  <p className="slide-subtitle">{slide.subtitle}</p>
                  <button className="slide-button">
                    {slide.buttonText}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="hero-arrow hero-arrow-prev" onClick={handlePrevSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button className="hero-arrow hero-arrow-next" onClick={handleNextSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></button>
          ))}
        </div>

        {/* Auto-play Toggle */}
        <button
          className="autoplay-toggle"
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          title={isAutoPlay ? 'Pause' : 'Play'}
        >
          {isAutoPlay ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3l14 9-14 9V3z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="hero-decoration hero-decoration-1"></div>
      <div className="hero-decoration hero-decoration-2"></div>
    </section>
  )
}

export default HeroSection
