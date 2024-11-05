import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';

const Theater = ({ children, onVideoEnd }) => {
  const [showScreen, setShowScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setShowScreen(true);
      if (videoRef.current) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.log("Auto-play prevented:", error);
          });
        }
      }
    }, 2000); // Reduced to 2 seconds as requested

    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setIsVideoEnded(true);
    if (typeof onVideoEnd === 'function') {
      onVideoEnd();
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#1a0f0f] overflow-hidden">
      {/* Theater ambient lighting */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#2a1515] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#2a1515] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#2a1515] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#2a1515] to-transparent" />
      </div>

      {/* Theater frame with golden trim */}
      <div className="absolute inset-0 border-[#FFD700] border-8 m-4 pointer-events-none" />

      {/* Decorative top bar with royal pattern */}
      <div className="absolute inset-x-0 top-0 h-24">
        <div className="w-full h-full bg-[#8B0000] border-b-4 border-[#FFD700]">
          <div className="h-full flex items-center justify-center">
            <div className="w-full h-8 bg-[#FFD700]/20" style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139,0,0,0.5) 10px, rgba(139,0,0,0.5) 20px)"
            }} />
          </div>
        </div>
      </div>

      {/* Main curtains */}
      <AnimatePresence>
        {!showScreen && (
          <motion.div
            className="absolute inset-0 z-20 flex"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Left curtain */}
            <motion.div
              className="w-1/2 h-full origin-left"
              initial={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{
                duration: 2,
                ease: [0.45, 0.05, 0.55, 0.95],
              }}
            >
              <div 
                className="w-full h-full bg-[#8B0000]"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 50% 0, rgba(255,215,0,0.3) 0%, transparent 50%),
                    linear-gradient(180deg, #8B0000 0%, #4B0000 100%)
                  `,
                  boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.5)',
                }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-1/8 border-b border-[#FFD700]/20"
                    style={{ top: `${i * 12.5}%` }}
                  >
                    <div className="absolute inset-0 bg-[#4B0000]/20" 
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right curtain */}
            <motion.div
              className="w-1/2 h-full origin-right"
              initial={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{
                duration: 2,
                ease: [0.45, 0.05, 0.55, 0.95],
              }}
            >
              <div 
                className="w-full h-full bg-[#8B0000]"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 50% 0, rgba(255,215,0,0.3) 0%, transparent 50%),
                    linear-gradient(180deg, #8B0000 0%, #4B0000 100%)
                  `,
                  boxShadow: 'inset 10px 0 20px rgba(0,0,0,0.5)',
                }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-1/8 border-b border-[#FFD700]/20"
                    style={{ top: `${i * 12.5}%` }}
                  >
                    <div className="absolute inset-0 bg-[#4B0000]/20" 
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen content */}
      <div className="relative z-10 pt-32 pb-16 flex justify-center items-center h-full">
        <AnimatePresence mode="wait">
          {showScreen && !isVideoEnded && children}
          {isVideoEnded && children}
        </AnimatePresence>
      </div>

      {/* Audience silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a0f0f] to-transparent">
        <div className="relative h-full flex items-end justify-center gap-4 pb-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 2 + i * 0.1 }}
              className="relative"
              style={{
                transform: `scale(${0.8 + Math.random() * 0.4})`,
              }}
            >
              <Users className="w-6 h-6 text-gray-400" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Theater side lights */}
      {Array.from({ length: 6 }).map((_, i) => (
        <React.Fragment key={i}>
          <div
            className="absolute left-8 w-2 h-8 bg-[#FFD700]/20 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              boxShadow: '0 0 20px rgba(255,215,0,0.3)',
            }}
          />
          <div
            className="absolute right-8 w-2 h-8 bg-[#FFD700]/20 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              boxShadow: '0 0 20px rgba(255,215,0,0.3)',
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Theater;