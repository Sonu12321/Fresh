import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { fetchWorkByKey } from "../openLibrary";
import { useFavorites } from "../Context/FavoritesContext";

export default function BookDetails() {
  const raw = window.location.pathname.replace("/book", ""); 
  const workKey = raw || null;
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isFavorited, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!workKey) {
        setError("Invalid book id");
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWorkByKey(workKey);
        setWork(data);
      } catch (e) {
        setError(e.message || "Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [workKey]);

  if (loading) return <Loader />;
  if (!work) return null;

  const title = work.title;
  let description = "";
  if (work.description) {
    description = typeof work.description === "string" ? work.description : work.description.value;
  } else if (work.excerpts && work.excerpts.length) {
    description = work.excerpts[0].comment || work.excerpts[0].excerpt || "";
  }

  const authors = work.authors ? work.authors : [];
  const authorNames = authors.map(a => a.name || a.author?.key || "").filter(Boolean).join(", ") || "Unknown";
  const key = work.key;
  const fav = isFavorited(key);

  const toggleFav = () => {
    if (fav) removeFavorite(key);
    else addFavorite(key, { key, title, author: authorNames, year: work.first_publish_date || "—" });
  };

  return (
    <div className="max-w-4xl mx-auto">
 
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back to search</span>
        </Link>
      </div>

     
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8">
     
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {title}
            </h1>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium mr-2">Author(s):</span>
                <span className="text-sm text-gray-700">{authorNames}</span>
              </div>
              
              <div className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">First published: {work.first_publish_date || "—"}</span>
              </div>
            </div>
          </div>

          {/* Favorite Button */}
          <div className="flex-shrink-0">
            <button
              onClick={toggleFav}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 min-w-[130px] justify-center shadow-sm ${
                fav 
                  ? "bg-amber-50 text-amber-700 border-2 border-amber-200 hover:bg-amber-100 hover:shadow-md" 
                  : "bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-gray-100 hover:border-amber-200 hover:shadow-md"
              }`}
            >
              <span className="text-lg">
                {fav ? "★" : "☆"}
              </span>
              <span>{fav ? "Favorited" : "Add to Favorites"}</span>
            </button>
          </div>
        </div>

        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Description
          </h3>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
            {description ? (
              <p className="text-gray-700 leading-relaxed text-base">
                {description}
              </p>
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-400 text-sm">No description available for this book.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Subjects Section */}
        {work.subjects && work.subjects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Subjects & Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {work.subjects.slice(0, 12).map((subject, index) => (
                <span 
                  key={subject} 
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                >
                  {subject}
                </span>
              ))}
              {work.subjects.length > 12 && (
                <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
                  +{work.subjects.length - 12} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}