import { useEffect, useRef } from 'react';

interface UseLoopedSoundProps {
  soundPath: string;
  volume?: number;
  isPlaying: boolean;
}

export const useLoopedSound = ({ soundPath, volume = 0.5, isPlaying }: UseLoopedSoundProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundPath);
      audioRef.current.volume = volume;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      const playSound = () => {
        audio.currentTime = 0;
        audio.play().catch(error => console.log("Playback prevented:", error));
      };

      // Play immediately
      playSound();

      // Set up interval to replay the sound
      intervalRef.current = window.setInterval(playSound, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [soundPath, volume, isPlaying]);

  return {
    stop: () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };
};