import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Balloon from './components/Balloon';
import Firework from './components/Firework';
import Theater from './components/Theater';

function App() {
  const [phase, setPhase] = useState<number>(1);
  const [count, setCount] = useState<number>(5);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [showQuote, setShowQuote] = useState<boolean>(false);

  // Audio references
  useEffect(() => {
    // Create and configure audio elements
    const countdownSound = new Audio('/sounds/countdown.mp3');
    const balloonSound = new Audio('/sounds/balloon-pop.mp3');
    const fireworkSound = new Audio('/sounds/firework.mp3');
    const celebrationSound = new Audio('/sounds/celebration.mp3');
    
    // Set volume
    countdownSound.volume = 0.5;
    balloonSound.volume = 0.3;
    fireworkSound.volume = 0.4;
    celebrationSound.volume = 0.4;

    if (count > 0 && phase === 1) {
      countdownSound.currentTime = 0;
      countdownSound.play();
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => {
        clearTimeout(timer);
        countdownSound.pause();
      };
    } else if (count === 0 && phase === 1) {
      celebrationSound.play();
      setTimeout(() => setPhase(2), 1000);
    }
  }, [count, phase]);

  useEffect(() => {
    const balloonSound = new Audio('/sounds/balloon-pop.mp3');
    const fireworkSound = new Audio('/sounds/firework.mp3');
    
    if (phase === 2) {
      setTimeout(() => setPhase(3), 3000);
    } else if (phase === 3) {
      balloonSound.play();
      setTimeout(() => setPhase(4), 3000);
    } else if (phase === 4) {
      fireworkSound.play();
      setTimeout(() => setPhase(5), 5000);
    } else if (phase === 5) {
      setTimeout(() => setPhase(6), 1000);
    } else if (phase === 6) {
      setTimeout(() => setShowVideo(true), 1000);
    }
  }, [phase]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setTimeout(() => {
      setShowQuote(true);
      setTimeout(() => {
        setPhase(7);
        const finalSound = new Audio('/sounds/final-celebration.mp3');
        finalSound.play();
      }, 10000);
    }, 1000);
  };

  const renderContent = () => {
    switch (phase) {
      case 1:
        return (
          <motion.div
            key="countdown"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-9xl font-bold text-pink-600"
          >
            {count}
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            key="opening"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-4xl text-center font-dancing text-purple-700"
          >
            The Curtain Is About to Rise on an Epic Moment
          </motion.div>
        );

      case 3:
        return (
          <div className="relative w-full h-full">
            {[...Array(30)].map((_, i) => (
              <Balloon key={i} />
            ))}
          </div>
        );

      case 4:
        return (
          <motion.div
            key="greeting"
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute -left-20 top-1/2 transform -translate-y-1/2">
              <Firework />
            </div>
            <div className="absolute -right-20 top-1/2 transform -translate-y-1/2">
              <Firework />
            </div>
            <div className="absolute left-40 top-0">
              <Firework />
            </div>
            <div className="absolute right-40 top-0">
              <Firework />
            </div>
            <motion.h1
              className="text-6xl font-dancing font-bold text-purple-600 mb-8"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              Happy Birthday Saritha!
            </motion.h1>
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <img
                src="/Img/Sari.jpg"
                alt="Celebration"
                className="rounded-lg shadow-2xl w-96 h-96 object-cover"
              />
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="blank"
            className="w-full h-full bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        );

      case 6:
        return (
          <Theater onVideoEnd={handleVideoEnd}>
            <AnimatePresence>
              {showVideo && !showQuote && (
                <motion.div
                  key="video"
                  className="w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="relative pt-[56.25%]">
                    <video
                      className="absolute top-0 left-0 w-full h-full"
                      src="/video/Saritha_bdy_video.mp4"
                      controls
                      autoPlay
                      onEnded={handleVideoEnd}
                    />
                  </div>
                </motion.div>
              )}
              {videoEnded && showQuote && (
                <motion.div
                  key="quote"
                  className="flex flex-col items-center justify-center gap-8 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
                >
                  <div className="text-3xl text-center font-dancing text-purple-700 max-w-2xl">
                    "May your journey ahead be filled with endless possibilities and achievements. Keep shining bright, just as you always do!"
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Theater>
        );

      case 7:
        return (
          <motion.div
            key="final-scene"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className="text-6xl font-dancing text-purple-600 mb-8">
              Thank You for Watching!
            </h1>
            <div className="flex justify-center space-x-8">
              <Firework />
              <Firework />
              <Firework />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-8">
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </div>
  );
}

export default App;