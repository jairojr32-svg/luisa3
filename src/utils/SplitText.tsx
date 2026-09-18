import React, { useRef } from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({ 
  children, 
  className = '', 
  wordClassName = 'inline-block overflow-hidden pb-1', 
  charClassName = 'inline-block' 
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  // Divide o texto em palavras e depois em caracteres, preservando espaços
  const words = children.split(' ');

  return (
    <div ref={textRef} className={className} aria-label={children}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className={wordClassName}>
          {word.split('').map((char, charIndex) => (
            <span 
              key={charIndex} 
              className={`split-char ${charClassName}`}
              style={{ transform: 'translateY(100%)', opacity: 0 }} // Estado inicial para o GSAP animar
            >
              {char}
            </span>
          ))}
          {/* Adiciona o espaço de volta, exceto após a última palavra */}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </div>
  );
};
