import React, { useEffect, useRef, useState } from "react";

// Simple CountUp Component: Counts from 0 to a target number with a smooth animation
// The 'delay' prop allows for staggering animations across multiple stats
const CountUp = ({ to, duration = 1200, suffix = "", delay = 0 }) => {
  const [val, setVal] = useState(0);
  const startRef = useRef(null);
  const from = 0;

  useEffect(() => {
    let rafId;
    let timeoutId;
    // Cubic easing out function for smooth deceleration at the end
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // Animation loop using requestAnimationFrame
    const animate = (ts) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);

      // Calculate current value based on progress
      const current = Math.round(from + (to - from) * eased);
      setVal(current);

      // Continue animation if not finished
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    // Start animation after the specified delay
    timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, Math.max(0, delay));

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [to, duration, delay]);

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <div className="w-full">
      <div className="stats stats-vertical bg-base-100 border border-base-300 rounded-xl w-full shadow-sm">
        {/* Total Books Stat */}
        <div className="stat px-4 sm:px-5 py-3">
          <div className="stat-figure text-primary/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 sm:h-7 sm:w-7 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>
          <div className="stat-title text-xs sm:text-sm">Total Books</div>
          <div className="stat-value text-2xl sm:text-3xl">
            <CountUp to={12000} suffix="+" duration={1200} delay={0} />
          </div>
          <div className="stat-desc text-xs text-base-content/70">
            In our library
          </div>
        </div>

        {/* Favorite Authors Stat */}
        <div className="stat px-4 sm:px-5 py-3">
          <div className="stat-figure text-secondary/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 sm:h-7 sm:w-7 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5V4H2v16h5m10 0V10m0 10H7m10 0H7m0 0V10m0 10"
              />
            </svg>
          </div>
          <div className="stat-title text-xs sm:text-sm">Favorite Authors</div>
          <div className="stat-value text-2xl sm:text-3xl">
            <CountUp to={1500} suffix="+" duration={1200} delay={1200} />
          </div>
          <div className="stat-desc text-xs text-base-content/70">
            Followed by users
          </div>
        </div>

        {/* Monthly Orders Stat */}
        <div className="stat px-4 sm:px-5 py-3">
          <div className="stat-figure text-accent/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 sm:h-7 sm:w-7 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M7 15h10M5 7h14"
              />
            </svg>
          </div>
          <div className="stat-title text-xs sm:text-sm">Monthly Orders</div>
          <div className="stat-value text-2xl sm:text-3xl">
            <CountUp to={3200} duration={1200} delay={2400} />
          </div>
          <div className="stat-desc text-xs text-base-content/70">
            Last 30 days
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
