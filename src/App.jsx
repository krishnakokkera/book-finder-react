import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query) {
      setError("Please enter a book name");
      return;
    }

    setError("");
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await response.json();

      if (data.docs.length === 0) {
        setError("No books found");
      } else {
        setBooks(data.docs.slice(0, 10));
      }
    } catch (e) {
      setError("Failed to fetch data");
    }
  };

  return (
    <div className="container">
      <h1 className="title">
  <span className="icon">📚</span> Book Finder
</h1>
<p className="subtitle">Search books by title using Open Library</p>


      <div className="search">
        <input
          type="text"
          placeholder="Enter book name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="books">
        {books.map((book, index) => (
          <div className="card" key={index}>
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt="cover"
              />
            ) : (
              <div className="noimg">No Image</div>
            )}
            <h3>{book.title}</h3>
            <p>{book.author_name?.[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
