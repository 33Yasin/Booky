import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// Chart Component (Cart Button)
// Displays a shopping cart icon with a badge showing the number of items in the cart.
// Props:
// - count: Number of items in the cart
// - onClick: Function to handle button click
const Chart = ({ count = 0, onClick = () => {} }) => {
  // Format the count display (e.g., show "99+" if count exceeds 99)
  const display =
    typeof count === "number" && count > 0
      ? count > 99
        ? "99+"
        : count
      : null;

  return (
    <div className="relative">
      {/* Badge for item count */}
      {display !== null && (
        <span className="absolute -top-1 -right-1 bg-lime-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-base-100">
          {display}
        </span>
      )}
      {/* Cart Icon Button */}
      <button
        className="btn btn-ghost btn-circle"
        onClick={onClick}
        aria-label="Cart"
      >
        <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
      </button>
    </div>
  );
};

export default Chart;
