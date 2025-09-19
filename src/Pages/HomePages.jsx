import React, { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import BookCard from "../Components/BookCard"; 
import Loader from "../Components/Loader"; 
import  {searchBooks}  from '../openLibrary';

export default function Home() {
  const [query, setQuery] = useState("React"); 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = async (q) => {
    try {
      setError(null);
      setLoading(true);
      const data = await searchBooks(q);
      // data.docs is an array of results
      setBooks(data.docs || []);
    } catch (e) {
      setError(e.message || "Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(query);
  }, []); 

  const onSearch = (term) => {
    setQuery(term);
    fetch(term);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex justify-center pt-5 ">Discover Books</h1>

      <div className="mb-4">
        <SearchBar onSearch={onSearch} initial={query} />
      </div>

      {loading && <Loader />}

      {error }

      {!loading && !error && books.length === 0 && (
        <div className="text-center text-slate-500 py-8">No books found.</div>
      )}

      <div className="grid gap-3">
        {books.map((b) => (
          <BookCard key={b.key} book={b} />
        ))}
      </div>
    </div>
  );
}