// components/SearchResults.js
"use client";

function SearchResults({ results }) {
    return (
      <div>
        {results.map((result) => (
          <div key={result.id}>
            {/* Display result details here */}
          </div>
        ))}
      </div>
    );
  }
  
  export default SearchResults;
  