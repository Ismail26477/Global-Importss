import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "New Year Sale",
    subtitle: "Up to 50% Off",
    description: "Start the year with incredible savings on top brands",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=600&fit=crop",
    cta: "Shop Now",
    link: "/deals",
    gradient: "from-primary/90 to-primary/40",
  },
  {
    id: 2,
    title: "Premium Electronics",
    subtitle: "Latest Tech Arrivals",
    description: "Discover cutting-edge gadgets and devices",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1920&h=600&fit=crop",
    cta: "Explore",
    link: "/category/electronics",
    gradient: "from-blue-900/90 to-blue-900/40",
  },
  {
    id: 3,
    title: "Fashion Forward",
    subtitle: "New Collection",
    description: "Elevate your style with our curated selection",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=600&fit=crop",
    cta: "Shop Fashion",
    link: "/category/fashion",
    gradient: "from-purple-900/90 to-purple-900/40",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-lg text-white animate-fade-in">
                <p className="text-sm sm:text-base font-medium mb-2 text-primary-foreground/80">
                  {slide.subtitle}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base mb-6 text-primary-foreground/90">
                  {slide.description}
                </p>
                <Button asChild size="lg" className="font-semibold">
                  <Link to={slide.link}>{slide.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
