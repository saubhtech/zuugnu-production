'use client';

import { useEffect } from 'react';

export default function FireflyBackground() {
  useEffect(() => {
    const container = document.getElementById('fireflyContainer');
    if (!container) return;

    const fireflyCount = 30;

    for (let i = 0; i < fireflyCount; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      
      // Random positioning
      firefly.style.left = Math.random() * 100 + '%';
      firefly.style.animationDelay = Math.random() * 15 + 's';
      firefly.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      // Random size variation
      const size = Math.random() * 2 + 2;
      firefly.style.width = size + 'px';
      firefly.style.height = size + 'px';
      
      container.appendChild(firefly);
    }

    // Cleanup
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div className="firefly-container" id="fireflyContainer"></div>;
}