import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../Context/FavoritesContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const entries = Object.values(favorites);

  if (entries.length === 0) {
    return (
      <div className="max-w-4xl  mt-5">
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-12">
          <div className="text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 ">No favorites yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start building your personal library by adding books to your favorites. 
              Discover amazing books and keep track of the ones you love!
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <svg className="w-8 h-8 mr-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Your Favorites
            </h1>
            <p className="text-gray-600 mt-2">
              {entries.length} book{entries.length !== 1 ? 's' : ''} in your collection
            </p>
          </div>
          
          <div className="text-right">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add more books
            </Link>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="space-y-4">
        {entries.map((book, index) => (
          <div 
            key={book.key} 
            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex justify-between items-start gap-6">
              {/* Book Information */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-4">
                  {/* Favorite Star */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/book${book.key}`} 
                      className="block text-gray-900 font-semibold text-lg leading-tight hover:text-blue-600 transition-colors duration-200 mb-3 group-hover:underline decoration-2 underline-offset-2"
                    >
                      {book.title}
                    </Link>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-3 h-3 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{book.author}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500">
                        <svg className="w-3 h-3 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs">First published: {book.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <button
                  onClick={() => removeFavorite(book.key)}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-full hover:bg-red-100 hover:border-red-300 transition-all duration-200 flex items-center gap-2 group/remove"
                >
                  <svg className="w-3 h-3 group-hover/remove:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
                
                <Link 
                  to={`/book${book.key}`} 
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
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <p className="text-gray-600 mb-4">
            Keep discovering amazing books and building your personal library!
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Discover More Books
          </Link>
        </div>
      </div>
    </div>
  );
}