import React from "react";

// BookCard Component
// Displays a summary of a book including cover, title, author, and description.
// Props:
// - coverUrl: URL of the book cover image
// - title: Title of the book
// - author: Author's name
// - publishYear: Year of publication
// - description: Short description or summary of the book
// - onBuy: Function to handle the "Buy" button click
// - onClick: Function to handle clicking on the card itself (e.g., to open details)
const BookCard = ({
  coverUrl,
  title,
  author,
  publishYear,
  description,
  onBuy,
  onClick,
}) => {
  return (
    // Card container with hover effects and click handler
    <div
      className="card bg-base-100 shadow-xl p-4 rounded-xl cursor-pointer hover:shadow-2xl transition-shadow"
      onClick={onClick}
    >
      <figure>
        {/* Book cover image */}
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-60 object-cover rounded-lg"
        />
      </figure>
      <div className="card-body">
        {/* Book Title */}
        <h2 className="card-title line-clamp-2" title={title}>
          {title}
        </h2>

        {/* Author Name */}
        <p className="text-sm text-gray-600">Author: {author || "-"}</p>

        {/* Book Description (truncated to 3 lines) */}
        {description && (
          <p
            className="text-sm mt-2 text-base-content/80"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            title={description}
          >
            {description}
          </p>
        )}

        {/* Footer section with Publish Year and Buy Button */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-600 m-0">
            Year: {publishYear || "-"}
          </p>
          {/* Stop propagation to prevent triggering the card's onClick */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuy && onBuy();
            }}
            className="btn btn-primary btn-sm sm:btn-md"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
