"use client";

import React, { useEffect, useRef, useState } from "react";

export function LazyMounted({ children, minHeight = "300px" }: { children: React.ReactNode; minHeight?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Trigger load 200px before entering viewport
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} className="w-full h-full" style={{ minHeight: isMounted ? undefined : minHeight }}>
      {isMounted ? children : null}
    </div>
  );
}
