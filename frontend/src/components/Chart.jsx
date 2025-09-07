import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Chart = ({ count = 0, onClick = () => {} }) => {
    const display = typeof count === 'number' && count > 0 ? (count > 99 ? '99+' : count) : null;
    return (
        <div className="relative">
            {display !== null && (
                <span className="absolute -top-1 -right-1 bg-lime-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-base-100">
                    {display}
                </span>
            )}
            <button className="btn btn-ghost btn-circle" onClick={onClick} aria-label="Sepet">
                <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
            </button>
        </div>
    )
}

export default Chart