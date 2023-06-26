"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BookCard from '@components/BookCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [booksByCategory, setBooksByCategory] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Add this line
    const router = useRouter(); // Declaring the router

    const categories = ["My Favorites", "Philosophical", "Found Family", "Adventure", "Romance", "Fiction"];

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/api/getBook/');
            const booksData = await response.json();
            setBooks(booksData);
            organizeBooksByCategory(booksData);
            setIsLoading(false);
        };

        fetchBooks();
    }, []);

    const organizeBooksByCategory = (books) => {
        const organizedBooks = {};
        categories.forEach((category) => {
            organizedBooks[category] = books.filter(book => book.categories.includes(category));
        });
        setBooksByCategory(organizedBooks);
    };

    const handleBookClick = (book) => {
        console.log('Book ID: ', book._id);
        router.push(`/browse/${book._id}`);
    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

        // Return the loading spinner if isLoading is true
    if (isLoading) {
        return (
            <section className="w-full min-h-screen relative flex flex-col justify-center items-center">
                <div
                    className="absolute inset-0 bg-no-repeat bg-fixed bg-cover opacity-30"
                    style={{
                        backgroundImage: `url('/images/fantasy_world.jpeg')`,
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
        <section className="w-full min-h-screen relative flex flex-col justify-center items-center">
            <div
                className="absolute inset-0 bg-no-repeat bg-fixed bg-cover opacity-50"
                style={{
                    backgroundImage: `url('/images/fantasy_world.jpeg')`,
                }}
            />
            <div className="w-full relative z-10 py-8 ml-20">
                {categories.map(category => (
                    <div className="mb-6 text-darker-brown font-categories font-semi-bold" key={category}>
                        <h2 className="text-2xl mb-3">{category}</h2>
                        {booksByCategory[category] && (
                            <Carousel responsive={responsive} key={category} >
                                {booksByCategory[category].map(book => (
                                    <BookCard 
                                        key={book._id}
                                        cover={book.cover}
                                        title={book.title}
                                        author={book.author}
                                        onClick={() => handleBookClick(book)}
                                    />
                                ))}
                            </Carousel>
                        )}
                    </div>
                ))}
            </div>
        </section>  
    );
}
