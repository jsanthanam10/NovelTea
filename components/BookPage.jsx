import React, { useState, useEffect } from 'react';

export default function BookPage({ bookId }) {
    const [book, setBook] = useState({});

    useEffect(() => {
        const fetchBookID = async () => {
            const response = await fetch('/api/getBookId/'); // Update this URL to your GET route
            const bookData = await response.json();
            setBook(bookData);
        };
        fetchBookID();
    }, [bookId]);



    return (
        <div>
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            <img src={book.cover} alt={book.title} /> {/* assuming book.cover is an image URL */}
            <p>{book.review}</p>
            <p>{book.rating}</p>
        </div>
    )
}
