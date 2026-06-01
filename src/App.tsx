import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface DecodedParams {
  name: string;
  designation: string;
  myname: string;
}

export default function App(): React.JSX.Element {
  // 1. URL Parameters Extraction & Safe Decoding
  const getDecodedParams = (): DecodedParams => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const name = searchParams.get('name');
      const designation = searchParams.get('designation');
      const myname = searchParams.get('myname');

      return {
        name: name ? decodeURIComponent(name.trim()) : 'Friend',
        designation: designation ? decodeURIComponent(designation.trim()) : 'Rockstar',
        myname: myname ? decodeURIComponent(myname.trim()) : 'Your Bestie',
      };
    } catch (error) {
      console.error('Error parsing URL parameters:', error);
      return {
        name: 'Friend',
        designation: 'Rockstar',
        myname: 'Your Bestie',
      };
    }
  };

  const { name, designation, myname } = getDecodedParams();

  // 2. Confetti & Balloon Burst Celebration Effects
  const triggerCelebration = (): void => {
    // Custom confetti defaults for balloons/confetti feel
    const defaults = {
      spread: 65,
      ticks: 120,
      gravity: 1.1,
      decay: 0.94,
      startVelocity: 40,
      zIndex: 50,
    };

    // Burst from bottom left
    confetti({
      ...defaults,
      particleCount: 70,
      angle: 55,
      origin: { x: 0, y: 0.9 },
      colors: ['#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#f43f5e'],
    });

    // Burst from bottom right
    confetti({
      ...defaults,
      particleCount: 70,
      angle: 125,
      origin: { x: 1, y: 0.9 },
      colors: ['#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#f43f5e'],
    });

    // Launch secondary lighter bursts for a floating effect
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 80,
        origin: { x: 0.15, y: 0.8 },
        colors: ['#f472b6', '#c084fc', '#60a5fa'],
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 80,
        origin: { x: 0.85, y: 0.8 },
        colors: ['#f472b6', '#c084fc', '#60a5fa'],
      });
    }, 450);
  };

  // Trigger celebration on load
  useEffect(() => {
    // Wait briefly for page to load and layout to stabilize
    const timer = setTimeout(() => {
      triggerCelebration();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any, // Custom cubic-bezier for premium feel
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const dividerVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut' as any,
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 bg-gradient-animate animate-gradient-bg overflow-hidden">
      
      {/* Decorative Parallax Background Objects */}
      <div className="absolute top-1/4 left-1/10 w-64 h-64 md:w-96 md:h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-72 h-72 md:w-108 md:h-108 bg-violet-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float-medium pointer-events-none" />
      <div className="absolute top-1/10 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-slow pointer-events-none" />

      {/* Greeting Card Container */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-xl glassmorphism card-glow rounded-3xl p-8 md:p-12 text-center border border-white/10"
      >
        {/* Top Decorative Floating Elements in Card */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-tr from-pink-500 to-violet-500 rounded-2xl shadow-xl flex items-center justify-center border border-white/20 rotate-12 hover:rotate-0 transition-transform duration-300">
          <span className="text-4xl select-none" role="img" aria-label="birthday cake">🎂</span>
        </div>

        <div className="mt-6 md:mt-8 flex flex-col space-y-6">
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-1">
            <span className="text-pink-400 font-semibold tracking-widest text-xs uppercase font-sans">
              A Special Wish For You
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200 bg-clip-text text-transparent text-glow leading-tight select-none">
              Happy Birthday!
            </h1>
          </motion.div>

          {/* Main Greeting Body */}
          <motion.p 
            variants={itemVariants} 
            className="text-lg md:text-xl text-purple-100/90 font-light leading-relaxed px-2 select-text"
          >
            Happy Birthday, <span className="text-pink-300 font-semibold text-glow">{name}</span>! 
            Wishing my favorite <span className="text-indigo-300 font-semibold text-glow">{designation}</span> an incredible year ahead filled with joy, success, and laughter.
          </motion.p>

          {/* Decorative Divider */}
          <motion.div 
            variants={dividerVariants}
            className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent mx-auto my-2" 
          />

          {/* Closing & Signature */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col items-end self-end pr-2 md:pr-4"
          >
            <span className="text-purple-300/60 text-sm italic font-light font-sans">
              Your friend,
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent font-sans mt-1">
              {myname}
            </span>
          </motion.div>

          {/* Interactive Spark Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 25px rgba(236, 72, 153, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerCelebration}
              className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg border border-white/20 text-sm tracking-wider uppercase flex items-center justify-center gap-2 mx-auto transition-all duration-300"
              aria-label="Launch Confetti celebration"
            >
              <span className="text-base select-none">🎉</span>
              <span>Spark Joy</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Small Ambient Glittering Dots in Card */}
        <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-30 blur-[0.5px] animate-pulse" />
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-indigo-400 rounded-full opacity-35 blur-[0.5px] animate-pulse" />
        <div className="absolute top-1/2 right-6 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-25 blur-[0.5px] animate-pulse" />
      </motion.main>
    </div>
  );
}
