import { useRef, useEffect, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({ children, className = '', threshold = 0.15 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
}
