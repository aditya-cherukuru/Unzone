import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingCarouselProps {
  onComplete: () => void;
}

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Welcome to UnZone",
      description: "Break free from your comfort zone with daily challenges that nurture personal growth and build lasting courage.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      title: "Watch Your Garden Grow",
      description: "Every challenge you complete nurtures your virtual courage garden, creating a beautiful reflection of your personal growth journey.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      title: "Join the Community",
      description: "Share your achievements, support others, and celebrate growth together in a supportive community of courage builders.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-40 garden-bg">
      <div className="h-full flex flex-col justify-center items-center p-8">
        <div 
          className="w-80 h-64 rounded-2xl mb-8 overflow-hidden shadow-lg"
          style={{
            backgroundImage: `url('${pages[currentPage].image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        
        <h2 className="font-display text-3xl font-bold text-white text-center mb-4">
          {pages[currentPage].title}
        </h2>
        
        <p className="text-white/90 text-center text-lg leading-relaxed mb-8 max-w-sm">
          {pages[currentPage].description}
        </p>
        
        <div className="flex space-x-2 mb-8">
          {pages.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentPage ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
        
        <div className="flex space-x-4">
          {currentPage > 0 && (
            <Button
              variant="ghost"
              size="lg"
              onClick={handlePrev}
              className="text-white border border-white/20 hover:bg-white/10"
            >
              <ChevronLeft className="mr-2" size={20} />
              Back
            </Button>
          )}
          
          <Button
            size="lg"
            onClick={handleNext}
            className="bg-white text-primary-400 hover:bg-white/90 px-8"
          >
            {currentPage === pages.length - 1 ? "Let's Begin" : "Next"}
            {currentPage < pages.length - 1 && <ChevronRight className="ml-2" size={20} />}
          </Button>
        </div>
      </div>
    </div>
  );
}
