import React from "react";

const BookCard = ({ coverUrl, title, author, publishYear, description, onBuy, onClick }) => {
  return (
    <div className="card bg-base-100 shadow-xl p-4 rounded-xl cursor-pointer hover:shadow-2xl transition-shadow" onClick={onClick}>
      <figure>
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-60 object-cover rounded-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-2" title={title}>{title}</h2>
        <p className="text-sm text-gray-600">Yazar: {author || "-"}</p>
        {description && (
          <p
            className="text-sm mt-2 text-base-content/80"
            style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            title={description}
          >
            {description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-600 m-0">Basım Yılı: {publishYear || "-"}</p>
          <button onClick={(e) => { e.stopPropagation(); onBuy && onBuy(); }} className="btn btn-primary btn-sm sm:btn-md">Satın Al</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;