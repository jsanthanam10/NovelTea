"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing the useRouter hook from next/router
import BookCard from '@components/BookCard'; // Update the path as per your directory structure

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    // is loading
    const [isLoading, setIsLoading] = useState(true); // Add this line
    const router = useRouter(); // Declaring the router

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/api/getBook/'); // Update this URL to your GET route
            const booksData = await response.json();
            setBooks(booksData);
            setIsLoading(false); // Set isLoading to false when the data is fetched
        };

        fetchBooks();
    }, []);

    const handleBookClick = (book) => {
        // Navigating to the book's reviews page when book cover is clicked
        console.log('Book ID: ', book._id);
        router.push(`/browse/${book._id}`);
    };


    if (isLoading) {
      return (
          <section className="w-full min-h-screen relative flex flex-col justify-center items-center">
              <div
                  className="absolute inset-0 bg-no-repeat bg-fixed bg-cover opacity-30"
                  style={{
                      backgroundImage: `url('/images/window.jpeg')`,
                  }}
              />
              <div className="w-screen h-screen flex items-center justify-center relative">
                  <div className="absolute w-80 h-80">
                      <img src="/images/noveltea.png" alt="logo" className="absolute z-10 left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto"/> 
                  </div>
                  <div className="absolute w-48 h-48 top-1/3" >
                      <div className="w-full h-full border-t-4 border-dark-brown absolute animate-spin rounded-full"></div>
                  </div>
              </div>
          </section>
      )
      
  } 

    return (
        <section className="w-full min-h-screen relative flex">
            <div
                className="absolute inset-0 bg-no-repeat bg-fixed bg-cover opacity-50"
                style={{
                    backgroundImage: `url('/images/window.jpeg')`,
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
                            onClick={() => handleBookClick(book)} // Adding the onClick event
                        />
                    ))}
                </div>
            </div>
        </section>  
    );
}