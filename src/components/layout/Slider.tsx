import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

interface HeroSliderProps {
  slides: Slide[];
  height?: string; 
  autoPlayInterval?: number; 
}

const Slider: React.FC<HeroSliderProps> = ({
  slides,
  height = 'h-[300px]',
  autoPlayInterval = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentSlide, autoPlayInterval]);

  return (
    <div className={`relative overflow-hidden ${height}`}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          </div>

          <div className="mx-20 relative z-20 h-full flex flex-col justify-center">
            <div className="max-w-xl text-white">
              <h2 className="text-xl md:text-4xl lg:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl md:text-md opacity-90 mb-8">{slide.subtitle}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2 p-2 text-white 
        bg-black/30 hover:bg-black/50 rounded-full transition-colors"
      >
        <ChevronLeft size={14} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2 p-2 text-white 
        bg-black/30 hover:bg-black/50 rounded-full transition-colors"
      >
        <ChevronRight size={14} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
