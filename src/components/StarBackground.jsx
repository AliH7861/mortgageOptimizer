import React, { useEffect, useState } from 'react';

// AI Vibe: Adaptive StarBackground that switches colors based on light/dark mode
export const StarBackground = () => {
  const [neurons, setNeurons] = useState([]);
  const [links, setLinks] = useState([]);
  const [pulseTime, setPulseTime] = useState(Date.now());
  const [isDarkMode, setIsDarkMode] = useState(
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  // Watch for class changes on <html> to detect theme toggle
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const updateMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    const observer = new MutationObserver(updateMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    updateMode();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    generateNeuronsAndLinks();
    window.addEventListener('resize', generateNeuronsAndLinks);
    return () => window.removeEventListener('resize', generateNeuronsAndLinks);
  }, []);

  useEffect(() => {
    let running = true;
    const tick = () => {
      setPulseTime(Date.now());
      if (running) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { running = false; };
  }, []);

  const generateNeuronsAndLinks = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // full-screen distribution of neurons
    const count = Math.max(50, Math.floor((w * h) / 300000));
    const newNeurons = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 1,
      pulse: Math.random() * 2 + 1,
    }));
    setNeurons(newNeurons);

    // create links between nearest neighbors
    const newLinks = [];
    newNeurons.forEach(n => {
      const neighbors = newNeurons
        .map(m => ({ ...m, dist: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
        .sort((a, b) => a.dist - b.dist)
        .slice(1, 4);
      neighbors.forEach(tgt => {
        newLinks.push({
          from: n,
          to: tgt,
          dashDuration: Math.random() * 3 + 2,
          pulseSpeed: Math.random() * 2 + 1.5,
          phase: Math.random(),
        });
      });
    });
    setLinks(newLinks);
  };

  // Choose colors based on theme
  const linkColor = isDarkMode ? 'rgba(0, 229, 255, 0.2)' : 'rgba(20, 20, 188, 0.2)';
  const neuronColor = isDarkMode ? 'rgba(0, 229, 255, 0.4)' : 'rgba(18, 18, 255, 0.4)';
  const pulseColor = isDarkMode ? 'rgba(255, 51, 0, 0.9)' : 'rgba(128, 0, 0, 0.9)';

  return (
    <svg
      className="fixed inset-0 pointer-events-none z-0"
      width="100%"
      height="100%"
    >
      {/* Dashed Synaptic Links */}
      {links.map((link, i) => (
        <line
          key={`link-${i}`}
          x1={link.from.x}
          y1={link.from.y}
          x2={link.to.x}
          y2={link.to.y}
          stroke={linkColor}
          strokeWidth={1}
          style={{
            strokeDasharray: '4 4',
            animation: `shift-dash ${link.dashDuration}s linear infinite`,
          }}
        />
      ))}

      {/* Pulsing Neurons */}
      {neurons.map(neuron => (
        <circle
          key={`neuron-${neuron.id}`}
          cx={neuron.x}
          cy={neuron.y}
          r={neuron.size}
          fill={neuronColor}
          style={{
            transformOrigin: `${neuron.x}px ${neuron.y}px`,
            animation: `pulse ${neuron.pulse}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* Traveling Data Pulses */}
      {links.map((link, i) => {
        const now = pulseTime / 1000;
        const t = (now / link.pulseSpeed + link.phase) % 1;
        const x = link.from.x + (link.to.x - link.from.x) * t;
        const y = link.from.y + (link.to.y - link.from.y) * t;
        return (
          <circle
            key={`pulse-${i}`}
            cx={x}
            cy={y}
            r={1.5}
            fill={pulseColor}
            style={{ filter: 'drop-shadow(0 0 4px #00e5ff)' }}
          />
        );
      })}
    </svg>
  );
};

export default StarBackground;
