'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export default function AnimatedText({ text, className = '', delay = 0, tag = 'h2' }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const Tag = tag;

  return (
    <div ref={ref}>
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={`flex flex-wrap ${className}`}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="mr-[0.35em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
