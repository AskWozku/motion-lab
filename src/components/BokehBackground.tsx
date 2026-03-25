import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { BackgroundConfig } from '../types';

interface BokehBackgroundProps {
  config: BackgroundConfig;
  theme: 'light' | 'dark';
}

export const BokehBackground: React.FC<BokehBackgroundProps> = ({ config, theme }) => {
  const { colors, speed, density, opacity, customSettings, interactive } = config;
  const focusPlane = customSettings?.focusPlane ?? 0.5;
  const aperture = customSettings?.aperture ?? 0.2;
  const shape = customSettings?.shape ?? 'circle';
  const glow = customSettings?.glow ?? 0.8;
  const minSize = customSettings?.minSize ?? 40;
  const maxSize = customSettings?.maxSize ?? 200;

  const elements = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      // Depth z from 0 (far) to 1 (near)
      const z = Math.random();
      
      // Size increases with proximity (z)
      const size = minSize + (maxSize - minSize) * z;
      
      // Calculate blur based on distance from focus plane
      // Focus plane is where things are sharpest (blur = 0)
      const distFromFocus = Math.abs(z - focusPlane);
      // Aperture controls how quickly things blur away from the focus plane
      const blur = distFromFocus * aperture * 150; 
      
      return {
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        z,
        size,
        blur,
        color: colors[i % colors.length],
        // Farther objects move slower
        duration: (20 + Math.random() * 30) / (speed * (0.5 + z)),
        delay: Math.random() * -40,
        // Nearer objects are slightly more opaque
        opacity: (0.05 + z * 0.25) * glow * opacity,
        // Parallax factor: near objects move more with mouse
        parallaxFactor: z * 40,
      };
    });
  }, [density, colors, speed, focusPlane, aperture, glow, minSize, maxSize, opacity]);

  // Hexagon clip path
  const getClipPath = (s: string) => {
    if (s === 'hexagon') return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
    if (s === 'square') return 'none';
    return 'none';
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-neutral-950">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ 
            left: `${el.left}%`, 
            top: `${el.top}%`, 
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            left: [`${el.left}%`, `${(el.left + 5) % 100}%`, `${(el.left - 5 + 100) % 100}%`, `${el.left}%`],
            top: [`${el.top}%`, `${(el.top - 8 + 100) % 100}%`, `${(el.top + 5) % 100}%`, `${el.top}%`],
            opacity: [0, el.opacity, el.opacity, 0],
            scale: [0.8, 1, 1.1, 0.9],
            // Parallax effect using mouse variables if interactive
            x: interactive ? `calc(var(--mouse-x-pct, 0) * ${el.parallaxFactor}px)` : 0,
            y: interactive ? `calc(var(--mouse-y-pct, 0) * ${el.parallaxFactor}px)` : 0,
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: el.delay,
          }}
          style={{
            position: 'absolute',
            width: el.size,
            height: el.size,
            backgroundColor: el.color,
            filter: `blur(${el.blur}px)`,
            borderRadius: shape === 'circle' ? '50%' : '0%',
            clipPath: getClipPath(shape),
            zIndex: Math.floor(el.z * 100),
            mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
          }}
        />
      ))}

      {/* Vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
};
