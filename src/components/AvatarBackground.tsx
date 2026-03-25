import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { User, Heart, Star, Zap, Ghost, Smile, Coffee, Camera } from 'lucide-react';
import { BackgroundConfig } from '../types';
import { cn } from '../lib/utils';

interface AvatarBackgroundProps {
  config: BackgroundConfig;
  theme: 'light' | 'dark';
}

const ICONS = {
  user: User,
  heart: Heart,
  star: Star,
  zap: Zap,
  ghost: Ghost,
  smile: Smile,
  coffee: Coffee,
  camera: Camera,
};

export const AvatarBackground: React.FC<AvatarBackgroundProps> = ({ config, theme }) => {
  const { colors, speed, density, opacity, customSettings, interactive } = config;
  const blur = customSettings?.blur ?? 10;
  const frost = customSettings?.frost ?? 0.2;
  const shape = customSettings?.shape ?? 'circle';
  const iconType = (customSettings?.iconType as keyof typeof ICONS) ?? 'user';
  const minSize = customSettings?.minSize ?? 60;
  const maxSize = customSettings?.maxSize ?? 120;
  const floatIntensity = customSettings?.floatIntensity ?? 0.5;

  const IconComponent = ICONS[iconType] || User;

  const elements = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const z = Math.random();
      const size = minSize + (maxSize - minSize) * z;
      
      return {
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        z,
        size,
        color: colors[i % colors.length],
        duration: (15 + Math.random() * 20) / speed,
        delay: Math.random() * -30,
        rotation: Math.random() * 360,
        parallaxFactor: z * 50,
        floatX: (Math.random() - 0.5) * 200 * floatIntensity,
        floatY: (Math.random() - 0.5) * 200 * floatIntensity,
      };
    });
  }, [density, colors, speed, minSize, maxSize, floatIntensity]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-neutral-50 dark:bg-neutral-950">
      {/* Background Mesh Layer */}
      <div className="absolute inset-0 opacity-20 blur-[120px]">
        {colors.map((color, i) => (
          <motion.div
            key={`mesh-${i}`}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
            }}
            transition={{
              duration: 20 / speed,
              repeat: Infinity,
              ease: "linear",
              delay: i * -2,
            }}
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              backgroundColor: color,
              left: `${(i * 30) % 100}%`,
              top: `${(i * 40) % 100}%`,
            }}
          />
        ))}
      </div>

      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ 
            left: `${el.left}%`, 
            top: `${el.top}%`, 
            opacity: 0,
            rotate: el.rotation,
            scale: 0.5
          }}
          animate={{
            left: [`${el.left}%`, `${(el.left + 10) % 100}%`, `${el.left}%`],
            top: [`${el.top}%`, `${(el.top - 15 + 100) % 100}%`, `${el.top}%`],
            opacity: [0, opacity, opacity, 0],
            rotate: [el.rotation, el.rotation + 45, el.rotation],
            scale: [0.9, 1, 0.9],
            x: interactive ? `calc(var(--mouse-x-pct, 0) * ${el.parallaxFactor}px)` : 0,
            y: interactive ? `calc(var(--mouse-y-pct, 0) * ${el.parallaxFactor}px)` : 0,
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: el.delay,
          }}
          className={cn(
            "absolute flex items-center justify-center border border-white/20 dark:border-white/10 shadow-xl overflow-hidden"
          )}
          style={{
            width: el.size,
            height: el.size,
            backgroundColor: theme === 'dark' ? `rgba(255, 255, 255, ${frost})` : `rgba(255, 255, 255, ${frost + 0.4})`,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            zIndex: Math.floor(el.z * 100),
            borderRadius: shape === 'circle' ? '50%' : '1rem',
            WebkitMaskImage: shape === 'circle' ? '-webkit-radial-gradient(white, black)' : 'none', // Fix for some browser clipping bugs
            transform: 'translateZ(0)', // Force new stacking context for better clipping
          }}
        >
          <IconComponent 
            size={el.size * 0.4} 
            className="text-neutral-900/40 dark:text-white/40 drop-shadow-sm"
            style={{ color: el.color }}
          />
          
          {/* Internal Glow */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" 
            style={{ borderRadius: 'inherit' }}
          />
        </motion.div>
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]" />
    </div>
  );
};
