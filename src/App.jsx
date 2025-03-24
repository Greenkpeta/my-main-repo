import React, { useState, useEffect } from "react";
import "./App.css"; // Make sure this file exists

// We'll use Quotable's random quote endpoint
const API_URL = "https://api.quotable.io/random";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  // Fetch a new quote from the API
  const fetchQuote = async () => {
    try {
      console.log("Fetching a new quote...");
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received data:", data); // Debug log
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  // On component mount, fetch the first quote
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="container">
      <div id="quote-box">
        <p id="text">"{quote}"</p>
        <p id="author">- {author}</p>

        <button id="new-quote" onClick={fetchQuote}>
          New Quote
        </button>

        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `"${quote}" - ${author}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet Quote
        </a>
      </div>
    </div>
  );
}

export default App;