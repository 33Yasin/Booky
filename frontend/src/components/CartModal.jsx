import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faShoppingCart,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const CartModal = ({
  open, // Controls visibility of the modal
  items = [], // Array of items in the cart
  onClose = () => {}, // Function to close the modal
  onRemove = () => {}, // Function to remove an item from the cart
  onCheckout = () => {}, // Function to proceed to checkout
}) => {
  // Calculate total number of items in the cart
  const totalItems = items.reduce((sum, it) => sum + (it.qty || 1), 0);

  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-xl">
        {/* Header: Title and Close Button */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faShoppingCart} /> Cart ({totalItems})
          </h3>
          <button
            className="btn btn-ghost btn-sm"
            aria-label="Close"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Cart Contents */}
        {items.length === 0 ? (
          <p className="text-base-content/70">Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-base-200 max-h-80 overflow-auto rounded-box">
            {items.map((it) => (
              <li key={it.id} className="py-3 flex items-center gap-3">
                {/* Item Image */}
                {it.coverUrl ? (
                  <img
                    src={it.coverUrl}
                    alt={it.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-16 bg-base-200 rounded" />
                )}

                {/* Item Details */}
                <div className="flex-1">
                  <div className="font-medium line-clamp-1">{it.title}</div>
                  {it.author && (
                    <div className="text-sm text-base-content/70 line-clamp-1">
                      {it.author}
                    </div>
                  )}
                  {it.qty > 1 && (
                    <div className="text-xs text-base-content/60">
                      Qty: {it.qty}
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => onRemove(it.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Actions: Checkout Button */}
        <div className="modal-action">
          <button
            className="btn btn-primary w-full"
            onClick={onCheckout}
            disabled={items.length === 0}
          >
            <FontAwesomeIcon icon={faCheck} className="mr-2" /> Complete Order
          </button>
        </div>
      </div>
      {/* Backdrop to close modal */}
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
};

export default CartModal;
