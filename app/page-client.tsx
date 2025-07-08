'use client';

import { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fadeInUp');
              entry.target.classList.remove('opacity-0', 'translate-y-8');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={elementRef}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

export function StaggeredGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.children;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Array.from(cards).forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-slideInUp');
                card.classList.remove('opacity-0', 'translate-y-12');
              }, index * 150); // Stagger by 150ms
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(grid);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={className}>
      {children}
    </div>
  );
}

export function CountingNumber({ 
  end, 
  duration = 2000, 
  className = '' 
}: { 
  end: number; 
  duration?: number; 
  className?: string; 
}) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let start = 0;
            const increment = end / (duration / 16); // 60fps
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                element.textContent = end.toString();
                clearInterval(timer);
              } else {
                element.textContent = Math.floor(start).toString();
              }
            }, 16);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={numberRef} className={className}>0</span>;
}

// Enhanced button with click feedback
export function EnhancedButton({ 
  children, 
  className = '', 
  onClick,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (button) {
      button.classList.add('animate-bounce-click');
      setTimeout(() => {
        button.classList.remove('animate-bounce-click');
      }, 200);
    }
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={buttonRef}
      className={`transition-all duration-200 active:scale-95 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Floating icons animation
export function FloatingIcon({ 
  icon, 
  delay = 0, 
  className = '' 
}: { 
  icon: React.ReactNode; 
  delay?: number; 
  className?: string; 
}) {
  return (
    <div 
      className={`animate-float-gentle ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {icon}
    </div>
  );
}