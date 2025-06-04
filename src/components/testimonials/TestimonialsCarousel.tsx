'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

// Testimonial type definition
interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  text: string;
}

// Sample testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah and John Thompson",
    location: "From London, UK",
    image: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?auto=format&fit=crop&q=80",
    text: "Inland Andalucia made our dream of owning a Spanish countryside home a reality. Their knowledge of the local market and assistance throughout the entire process was invaluable. We couldn't be happier with our cortijo in Cordoba."
  },
  {
    id: 2,
    name: "Michael Weber",
    location: "From Munich, Germany",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80",
    text: "The team's expertise in handling international purchases was exceptional. They guided us through every step, from property viewing to legal requirements. Our villa in Granada is everything we hoped for and more."
  },
  {
    id: 3,
    name: "Maria Garcia",
    location: "From Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
    text: "As a Spanish national, I was impressed by their deep understanding of local markets. They helped me find the perfect investment property in Jaén. Their attention to detail and professionalism is outstanding."
  }
];

export default function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentSlide, isAnimating]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative px-20">
      {/* Carousel Container with padding for shadow */}
      <div className="mx-auto max-w-3xl overflow-hidden p-4">
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-8"
          style={{ transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 2}rem))` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-shrink-0 w-full">
              <div className="bg-white rounded-xl p-8 shadow-lg relative">
                <div className="flex flex-col items-center">
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-primary-50">
                    <Image 
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-6 mb-8 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{testimonial.name}</h3>
                    <p className="text-neutral-600">{testimonial.location}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg italic text-neutral-700 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-colors ${
                currentSlide === index 
                  ? 'bg-primary-600' 
                  : 'bg-primary-200 hover:bg-primary-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Moved closer */}
      <button 
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-neutral-50 transition-colors"
        aria-label="Previous testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-primary-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-neutral-50 transition-colors"
        aria-label="Next testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-primary-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Decorative quote elements - Fixed positioning */}
      <div className="absolute -top-10 -left-16 hidden lg:block z-0">
        <svg className="h-32 w-32 text-primary-100/50 transform -scale-x-100" viewBox="0 0 46 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12h2v4H0v20h20V28H6v-4h8c6.627 0 12-5.373 12-12S20.627 0 14 0h-2zm28 0c-6.627 0-12 5.373-12 12s5.373 12 12 12h2v4h-14v20h20V28h-14v-4h8c6.627 0 12-5.373 12-12S46.627 0 40 0h-2z" />
        </svg>
      </div>
      <div className="absolute -bottom-10 -right-16 hidden lg:block z-0">
        <svg className="h-32 w-32 text-primary-100/50" viewBox="0 0 46 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 48c6.627 0 12-5.373 12-12s-5.373-12-12-12h-2v-4h14V0H28v20h14v4h-8c-6.627 0-12 5.373-12 12s5.373 12 12 12h2zm-28 0c6.627 0 12-5.373 12-12s-5.373-12-12-12h-2v-4h14V0H0v20h14v4H6c-6.627 0-12 5.373-12 12s5.373 12 12 12h2z" />
        </svg>
      </div>
    </div>
  );
} 