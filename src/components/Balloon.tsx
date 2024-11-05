import React from 'react';
import { motion } from 'framer-motion';

const colors = [
  'bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500', 
  'bg-pink-500', 'bg-orange-500', 'bg-indigo-500', 'bg-teal-500'
];

const Balloon = () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 2;
  const randomDuration = 2 + Math.random() * 2;
  const randomSize = 50 + Math.floor(Math.random() * 8);
  const randomSwing = 50 - Math.random() * 100;

  return (
    <motion.div
      className={`absolute ${randomColor} rounded-full`}
      style={{
        width: `${randomSize}px`,
        height: `${randomSize * 1.2}px`,
        left: `${randomX}%`,
        bottom: '-100px',
      }}
      initial={{ y: 0, opacity: 0, x: 0 }}
      animate={{
        y: -window.innerHeight - 100,
        opacity: [0, 1, 1, 0],
        x: randomSwing,
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        ease: 'easeOut',
        x: {
          duration: randomDuration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      }}
    >
      <div 
        className="w-px h-16 bg-gray-400 absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full"
        style={{ opacity: 0.6 }}
      />
      <motion.div
        className="absolute inset-0 rounded-full bg-white"
        animate={{
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ clipPath: 'circle(25% at 70% 20%)' }}
      />
    </motion.div>
  );
};

export default Balloon;