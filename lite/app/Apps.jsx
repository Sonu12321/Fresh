// import React, { useState, useEffect, useRef } from "react";
// import New from "./new.Jsx";


// const Apps = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Cache object stored in ref (doesn't trigger re-renders)
//   const cache = useRef({});

//   // Debounce timer
//   const debounceRef = useRef(null);

//   // Simulated API fetch function
//   const fetchData = async (searchTerm) => {
//     setLoading(true);
//     try {
//       // Fake API for demo (replace with your real API)
//       const response = await fetch(
//         `https://api.datamuse.com/words?ml=${searchTerm}`
//       );
//       const data = await response.json();
//       return data.map((item) => item.word);
//     } catch (error) {
//       console.error("Error fetching:", error);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle input change with debouncing
//   const handleChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     // Clear previous timer
//     if (debounceRef.current) clearTimeout(debounceRef.current);

//     // Set new debounce timer
//     debounceRef.current = setTimeout(async () => {
//       if (value.trim() === "") {
//         setResults([]);
//         return;
//       }

//       // Check cache first
//       if (cache.current[value]) {
//         console.log("Cache Hit ✅");
//         setResults(cache.current[value]);
//       } else {
//         console.log("API Call 🔄");
//         const data = await fetchData(value);
//         cache.current[value] = data; // Save in cache
//         setResults(data);
//       }
//     }, 500); // 500ms debounce
//   };

//   return (
//     <div style={{ margin: "20px" }}>
//       <New/>
//       <h2>Optimized Search Box</h2>
//       <input
//         type="text"
//         placeholder="Search something..."
//         value={query}
//         onChange={handleChange}
//         style={{ padding: "8px", width: "300px" }}
//       />
//       {loading && <p>Loading...</p>}
//       <ul>
//         {results.map((word, index) => (
//           <li key={index}>{word}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Apps;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addtodo, removetodo, updatetodo } from './Features/todo/todoSlice'

const Apps = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = () => {
    if (!text.trim()) return;

    if (editId) {
      dispatch(updatetodo({ id: editId, text }));
      setEditId(null);
    } else {
      dispatch(addtodo(text));
    }
    setText("");
  };

  const handleEdit = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Redux Toolkit Todo App
        </h2>

        {/* Input Section */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddOrUpdate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg shadow-sm"
            >
              <span className="text-gray-800">{todo.text}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(todo)}
                  className="px-2 py-1 text-sm bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(removetodo(todo.id))}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Apps;

