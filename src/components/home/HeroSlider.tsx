import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setCurrentSlide } from '../../store/slices/uiSlice';
import { RootState } from '../../store';


interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Military Diving',
    subtitle: 'Advanced tactical solutions for military underwater operations',
    image: '/assets/images/psl3.png',
    buttonText: 'DISCOVER MORE',
    buttonLink: '/military-diving',
  },
  {
    id: 2,
    title: 'Commercial Diving',
    subtitle: 'Professional-grade equipment for the most demanding underwater tasks',
    image: '/assets/images/psl2.png',
    buttonText: 'VIEW EQUIPMENT',
    buttonLink: '/commercial-diving',
  },
  {
    id: 3,
    title: 'Sports Diving',
    subtitle: 'The safest rebreathers packed with innovation for diving from near surface to 350m',
    image: '/assets/images/psl1.png',
    buttonText: 'EXPLORE NOW',
    buttonLink: '/sports-diving',
  },
  {
    id: 4,
    title: 'Respiratory Validation',
    subtitle: 'Submersible breathing machines for measuring work of breathing in real time at any depth',
    image: '/assets/images/psl4.jpg',
    buttonText: 'EXPLORE NOW',
    buttonLink: '/respiratory-validation',
  },
];

const HeroSlider: React.FC = () => {
  const dispatch = useDispatch();
  const currentSlide = useSelector((state: RootState) => state.ui.currentSlide);
  
  const nextSlide = () => {
    dispatch(setCurrentSlide((currentSlide + 1) % slides.length));
  };
  
  const prevSlide = () => {
    dispatch(setCurrentSlide((currentSlide - 1 + slides.length) % slides.length));
  };
  
  const goToSlide = (index: number) => {
    dispatch(setCurrentSlide(index));
  };
  
  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentSlide]);
  
  return (
  <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
    {/* Slides */}
    {slides.map((slide, index) => (
      <div 
        key={slide.id}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
      >
        <div  
          className="absolute inset-0 bg-cover bg-[position:80%_50%] sm:bg-[position:center] bg-no-repeat"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        
        <div className="container mx-auto relative z-20 h-full flex flex-col justify-center px-4 md:px-6">
          <div className="max-w-xl text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 break-words">
              {slide.title}
            </h2>
            <p className="text md:text-xl opacity-90 mb-8 break-words">
              {slide.subtitle}
            </p>
            <Link
              to={slide.buttonLink}
              className="inline-block px-3 py-1.5 sm:px-5 sm:py-2.5 md:px-6 md:py-3 border-2 border-white 
hover:bg-white hover:text-navy-900 text-sm sm:text font-medium transition-colors duration-300"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      </div>
    ))}
    
    {/* Navigation Arrows */}
    <button
      onClick={prevSlide}
      className="hidden sm:flex absolute top-1/2 left-4 z-30 transform -translate-y-1/2 p-2 text-white 
      bg-black/30 hover:bg-black/50 rounded-full transition-colors"
    >
      <ChevronLeft size={24} />
    </button>

    <button
      onClick={nextSlide}
      className="hidden sm:flex absolute top-1/2 right-4 z-30 transform -translate-y-1/2 p-2 text-white 
      bg-black/30 hover:bg-black/50 rounded-full transition-colors"
    >
      <ChevronRight size={24} />
    </button>
    
    {/* Indicators */}
    <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
            index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
          }`}
        />
      ))}
    </div>
  </div>
);

};

export default HeroSlider;