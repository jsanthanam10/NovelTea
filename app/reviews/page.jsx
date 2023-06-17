"use client"
import { useEffect, useState } from 'react';
import BookCard from '@components/BookCard'; // Update the path as per your directory structure

export default function BooksPage() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/api/getBook/'); // Update this URL to your GET route
            const booksData = await response.json();
            setBooks(booksData);
        };

        fetchBooks();
    }, []);

   return (
    <section className="w-full min-h-screen relative flex">
    <div
      className="absolute inset-0 bg-no-repeat bg-fixed bg-cover opacity-50"
      style={{
        backgroundImage: `url('/images/fantasy_world.jpeg')`,
      }}
    />
    <div className="flex flex-col justify-center items-center w-full relative z-10">
      <div className="grid grid-cols-5 gap-8 mt-20 mb-10">
      {books.map(book => (
          <BookCard 
              key={book._id} // or another unique key from your book data
              cover={book.cover}
              title={book.title}
              author={book.author}
          />
          ))}
      </div>
    </div>
  </section>  

);

    
}


