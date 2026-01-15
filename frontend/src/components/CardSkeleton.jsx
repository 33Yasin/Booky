import React from "react";

// CardSkeleton Component
// Provides a loading placeholder (skeleton) for the BookCard while data is being fetched.
const CardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl p-4 rounded-xl w-full">
      {/* Image Placeholder */}
      <div className="skeleton w-full h-60 rounded-lg" />

      {/* Text/Content Placeholders */}
      <div className="mt-4 space-y-2">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/3" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-11/12" />
        <div className="skeleton h-4 w-10/12" />

        {/* Footer/Button Placeholder */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-9 w-24 rounded-btn" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
