import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { imageFor, srcSetFor } from "@/lib/car-image";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  /** Первый кадр виден сразу — грузим его без задержки, остальные лениво */
  priority?: boolean;
}

export function ImageCarousel({ images, alt, priority = false }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  React.useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
  }, [images]);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    const single = images[0] ?? "";
    return (
      <img
        src={single}
        srcSet={srcSetFor(imageFor(single))}
        sizes="(max-width: 1024px) 100vw, 800px"
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="w-full h-full object-cover"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
    );
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  return (
    <div className="relative z-20 w-full h-full overflow-hidden bg-muted group touch-pan-y">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full object-cover cursor-grab active:cursor-grabbing"
          alt={`${alt} - view ${currentIndex + 1}`}
          srcSet={srcSetFor(imageFor(images[currentIndex] ?? ""))}
          sizes="(max-width: 1024px) 100vw, 800px"
          loading={priority && currentIndex === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />

      {/* Navigation arrows */}
      <button
        type="button"
        aria-label="Предыдущая фотография"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 pointer-events-auto p-2 rounded-full bg-black/40 text-white opacity-80 group-hover:opacity-100 transition-opacity hover:bg-black/60 backdrop-blur-md border border-white/10"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Следующая фотография"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 pointer-events-auto p-2 rounded-full bg-black/40 text-white opacity-80 group-hover:opacity-100 transition-opacity hover:bg-black/60 backdrop-blur-md border border-white/10"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={() => paginate(1)}
      >
        <ChevronRight className="size-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Открыть фотографию ${i + 1}`}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`size-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-primary w-6" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
