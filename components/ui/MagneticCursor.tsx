'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticCursorProps {
  isHovering?: boolean;
  isGrabbing?: boolean;
  cursorText?: string;
}

export function MagneticCursor({
  isHovering = false,
  isGrabbing = false,
  cursorText = '',
}: MagneticCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  // Magnetic effect for interactive elements
  useEffect(() => {
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    const handleMagneticMove = (e: MouseEvent, element: Element) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 100;

      if (distance < maxDistance) {
        const strength = 1 - distance / maxDistance;
        const moveX = deltaX * strength * 0.3;
        const moveY = deltaY * strength * 0.3;

        (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    const handleMagneticLeave = (element: Element) => {
      (element as HTMLElement).style.transform = 'translate(0, 0)';
    };

    magneticElements.forEach((element) => {
      element.addEventListener('mousemove', (e) =>
        handleMagneticMove(e as MouseEvent, element)
      );
      element.addEventListener('mouseleave', () => handleMagneticLeave(element));
    });

    return () => {
      magneticElements.forEach((element) => {
        element.removeEventListener('mousemove', (e) =>
          handleMagneticMove(e as MouseEvent, element)
        );
        element.removeEventListener('mouseleave', () =>
          handleMagneticLeave(element)
        );
      });
    };
  }, []);

  const cursorSize = isHovering ? 60 : isGrabbing ? 40 : 20;
  const dotSize = isHovering ? 8 : isGrabbing ? 12 : 6;

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="absolute rounded-full border-2 border-white"
          style={{
            width: '100%',
            height: '100%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: isGrabbing ? 0.8 : 1,
            borderWidth: isHovering ? 3 : 2,
          }}
        />

        {/* Cursor text */}
        {cursorText && (
          <motion.span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs font-medium whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Center dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Trailing particles */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500"
              style={{
                width: 4 - i,
                height: 4 - i,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                x: Math.sin(Date.now() / 200 + i) * 20,
                y: Math.cos(Date.now() / 200 + i) * 20,
                opacity: 0.5 - i * 0.15,
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.05,
              }}
            />
          ))}
        </motion.div>
      )}
    </>
  );
}
