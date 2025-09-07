import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShoppingCart, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

const CartModal = ({ open, items = [], onClose = () => {}, onRemove = () => {}, onCheckout = () => {} }) => {
  const totalItems = items.reduce((sum, it) => sum + (it.qty || 1), 0);
  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faShoppingCart} /> Sepet ({totalItems})
          </h3>
          <button className="btn btn-ghost btn-sm" aria-label="Kapat" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-base-content/70">Sepetiniz boş.</p>
        ) : (
          <ul className="divide-y divide-base-200 max-h-80 overflow-auto rounded-box">
            {items.map((it) => (
              <li key={it.id} className="py-3 flex items-center gap-3">
                {it.coverUrl ? (
                  <img src={it.coverUrl} alt={it.title} className="w-12 h-16 object-cover rounded" />
                ) : (
                  <div className="w-12 h-16 bg-base-200 rounded" />
                )}
                <div className="flex-1">
                  <div className="font-medium line-clamp-1">{it.title}</div>
                  {it.author && <div className="text-sm text-base-content/70 line-clamp-1">{it.author}</div>}
                  {it.qty > 1 && <div className="text-xs text-base-content/60">Adet: {it.qty}</div>}
                </div>
                <button className="btn btn-ghost btn-sm text-error" onClick={() => onRemove(it.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="modal-action">
          <button className="btn btn-primary w-full" onClick={onCheckout} disabled={items.length === 0}>
            <FontAwesomeIcon icon={faCheck} className="mr-2" /> Siparişi Tamamla
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
};

export default CartModal;
