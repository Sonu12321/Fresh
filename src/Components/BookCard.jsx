import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../Context/FavoritesContext";

export default function BookCard({ book }) {
  const { isFavorited, addFavorite, removeFavorite } = useFavorites();
  const key = book.key;
  const title = book.title;
  const author = book.author_name ? book.author_name.join(", ") : "Unknown";
  const year = book.first_publish_year || book.first_publish_date || "—";
  const fav = isFavorited(key);
  
  const toggleFav = () => {
    if (fav) removeFavorite(key);
    else addFavorite(key, { key, title, author, year });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 group">
      <div className="flex justify-between items-start gap-6">
        {/* Book Information */}
        <div className="flex-1 min-w-0">
          <Link 
            to={`/book${key}`} 
            className="block text-gray-900 font-semibold text-lg leading-tight hover:text-blue-600 transition-colors duration-200 mb-3 group-hover:underline decoration-2 underline-offset-2"
          >
            {title}
          </Link>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <span className="text-sm font-medium">by</span>
              <span className="text-sm ml-2 text-gray-700">{author}</span>
            </div>
            
            <div className="flex items-center text-gray-500">
              <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">First published: {year}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          <button
            onClick={toggleFav}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 min-w-[110px] justify-center ${
              fav 
                ? "bg-amber-50 text-amber-700 border-2 border-amber-200 hover:bg-amber-100" 
                : "bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-gray-100 hover:border-amber-200"
            }`}
          >
            <span className="text-base">
              {fav ? "★" : "☆"}
            </span>
            <span>{fav ? "Favorited" : "Favorite"}</span>
          </button>
          
          <Link 
            to={`/book${key}`} 
            className="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 group/link"
          >
            <span>View Details</span>
            <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}