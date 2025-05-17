"use client";

import { useState, useEffect } from "react";

interface TypingEffectProps {
  texts: string[];
  speed?: number;
  eraseSpeed?: number;
  pause?: number;
  className?: string;
  cursorClassName?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  texts,
  speed = 120,
  eraseSpeed = 80,
  pause = 2000,
  className = "",
  cursorClassName = "text-brand-green-light",
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentDisplay, setCurrentDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const handleTyping = () => {
      const currentFullText = texts[textIndex];
      const delay = isDeleting ? eraseSpeed : speed;

      if (!isDeleting && charIndex < currentFullText.length) {
        setCurrentDisplay((prev) => currentFullText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (!isDeleting && charIndex === currentFullText.length) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && charIndex > 0) {
        setCurrentDisplay((prev) => currentFullText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? eraseSpeed : speed);
    return () => clearTimeout(timer);
  }, [texts, textIndex, charIndex, isDeleting, speed, eraseSpeed, pause]);

  return (
    <span className={className}>
      {currentDisplay}
      <span className={`${cursorClassName} animate-pulse`}>|</span>
    </span>
  );
};

export default TypingEffect;
