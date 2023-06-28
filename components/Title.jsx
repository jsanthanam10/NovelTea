"use client"
import Link from "next/link";
import { useState, useEffect } from "react";


const Title = () => {
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [clearSearchTerm, setClearSearchTerm] = useState(false);


  useEffect(() => {
    const fetchBooks = async () => {
        const response = await fetch('/api/getBook/');
        const booksData = await response.json();
        setBooks(booksData);
    };

    fetchBooks();
}, []);

  useEffect(() => {
    if (searchValue) {
      let results = books.filter(
        book =>
          book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.author.toLowerCase().includes(searchValue.toLowerCase())
      );

      if (results.length > 5) {
        results = results.slice(0, 5);
      }

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchValue, books]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleBlur = () => {
    setClearSearchTerm(true);
    setTimeout(() => {
      if (clearSearchTerm) {
        setSearchValue('');
      }
    }, 100);
  };

  return (
    <div className="relative flex items-center justify-between w-full h-36 bg-beige border-b-2 border-dark-brown">
      <div className="absolute left-0 ml-[-2rem] mt-6">
        <Link href="/">
          <img
            src="/images/noveltea.png" // Replace with the actual path to your logo
            alt="Noveltea Logo"
            className="h-auto max-h-24 md:max-h-48" // Added rounded-full class
          />
        </Link>
      </div>
      <div className="flex items-center justify-center w-full mt-6 ml-64">
        <Link href="/">
          <p className="font-title text-6xl text-dark-brown">NOVELTEA</p>
        </Link>
      </div>
      <div className="absolute right-0 mr-24  mt-6 relative">
        <input 
          type="text" 
          value={searchValue} 
          onBlur={() => handleBlur()}
          onChange={handleSearchChange} 
          className="p-2 border-2 border-dark-brown bg-[#F9F5EC] rounded-md w-40 focus:w-72 transition-width duration-200 ease-in-out" // Add focus:w-96 for expand width when focused, transition-width for animate the width change
          placeholder="Search..."
        />
        {searchResults.length > 0 && (
          <div className="absolute w-full mt-2 border-2 border-dark-brown bg-[#F9F5EC] rounded-md z-20">
            {searchResults.map((book, index) => (
              <Link href={`/browse/${book._id}`} key={index}>
                <div key={index} className="p-2 flex items-center">
                  <img src={book.cover} alt={book.title} className="h-16 w-12 object-cover mr-2"/>
                  <div>
                    <p className="font-bold">{book.title}</p>
                    <p>{book.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );

};

export default Title;