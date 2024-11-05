import React from 'react';
import { motion } from 'framer-motion';

const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

const Firework = () => {
  const particles = Array.from({ length: 24 });
  const secondaryParticles = Array.from({ length: 12 });
  
  return (
    <div className="relative w-40 h-40">
      {/* Primary particles */}
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const radius = 60 + Math.random() * 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={`primary-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}`,
            }}
            animate={{
              x: [0, Math.cos(angle * Math.PI / 180) * radius],
              y: [0, Math.sin(angle * Math.PI / 180) * radius],
              opacity: [1, 0],
              scale: [1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: Math.random() * 0.5,
              ease: 'easeOut',
            }}
          />
        );
      })}

      {/* Secondary sparkles */}
      {secondaryParticles.map((_, i) => {
        const angle = (i / secondaryParticles.length) * 360;
        const radius = 30;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={`secondary-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              backgroundColor: color,
              boxShadow: `0 0 6px ${color}`,
            }}
            animate={{
              x: [0, Math.cos(angle * Math.PI / 180) * radius],
              y: [0, Math.sin(angle * Math.PI / 180) * radius],
              opacity: [1, 0],
              scale: [1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: Math.random() * 0.5 + 0.5,
              ease: 'easeOut',
            }}
          />
        );
      })}

      {/* Center glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full"
        style={{
          backgroundColor: colors[0],
          boxShadow: `0 0 20px ${colors[0]}`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 0.3, 0.8],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default Firework;