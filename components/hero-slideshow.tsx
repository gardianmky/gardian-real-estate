"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface HeroSlideshowProps {
  images: string[]
  interval?: number
}

export default function HeroSlideshow({ images, interval = 5000 }: HeroSlideshowProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Function to handle image transition
    const transitionToNextImage = () => {
      setIsTransitioning(true)

      // After animation starts, schedule the actual image change
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)

        // Reset transition state after image changes
        setTimeout(() => {
          setIsTransitioning(false)
        }, 500) // Half of the transition duration
      }, 500) // Half of the transition duration
    }

    // Set up interval for slideshow
    const slideshowInterval = setInterval(transitionToNextImage, interval)

    // Clean up interval on component unmount
    return () => clearInterval(slideshowInterval)
  }, [images.length, interval])

  return (
    <div className="absolute top-0 right-0 w-full md:w-1/2 lg:w-2/5 h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 right-0 w-full h-full transition-all duration-1000 ease-in-out
            ${currentImageIndex === index ? "opacity-50 translate-x-0" : "opacity-0 translate-x-full"}
            ${isTransitioning && currentImageIndex === index ? "animate-slide-out" : ""}
            ${isTransitioning && (currentImageIndex + 1) % images.length === index ? "animate-slide-in" : ""}
          `}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`Teal Mackay Photography ${index + 1}`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Slideshow indicators */}
      <div className="absolute bottom-6 right-6 flex space-x-2 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 
              ${currentImageIndex === index ? "bg-white scale-125" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}
