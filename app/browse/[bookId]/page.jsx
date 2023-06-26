"use client"
// import BookPage from '@components/Bookpage';
import React, { useState, useEffect } from 'react';

export default function BookPost({params}) {


    if (!params.bookId) {
        return <div>Loading...</div>; // or some other loading state
    }

    const [book, setBook] = useState({});
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');  // default color
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookID = async () => {
            const response = await fetch(`/api/getBookId/${params.bookId}`); // Update this URL to your GET route
            const bookData = await response.json();
            setBook(bookData);

            // Load the FastAverageColor library
            const script = document.createElement('script');
            script.src = "https://unpkg.com/fast-average-color/dist/index.browser.min.js";  // replace with the actual path
            script.onload = () => {
                const fac = new window.FastAverageColor();
            
                // Image loading
                const bookImageColor = new Promise((resolve, reject) => {
                    const bookImage = new Image();
                    bookImage.src = bookData.cover;
                    bookImage.crossOrigin = 'Anonymous';
                    bookImage.onload = () => {
                        const color = fac.getColor(bookImage);
                        setBackgroundColor(color.rgba);
                        setLoading(false);
                        resolve(color.rgba);
                    };
                    bookImage.onerror = reject;
                });

            };
            
            document.body.appendChild(script);
            setIsLoading(false);
     
        };
        fetchBookID();
    }, [params.bookId]);


    if (isLoading) {
        return (
            <section className="w-full min-h-screen relative flex flex-col justify-center items-center">
                <div
                    className="absolute inset-0 bg-no-repeat bg-fixed bg-cover opacity-30"
                    style={{
                        backgroundImage: `url('/images/river.jpeg')`,
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
                className="absolute inset-0 bg-no-repeat bg-fixed bg-cover opacity-30"
                style={{ 
                    backgroundColor: backgroundColor
                }}
            />
            <div
                className="absolute inset-0 bg-no-repeat bg-fixed bg-cover opacity-20"
                style={{
                    backgroundImage: `url('/images/river.jpeg')`,
                }}
            />
            <div className="relative z-10 mt-10 ml-30 mb-10 px-20 py-4"> {/* The main container */}
                <div className="content flex" style={{ shapeOutside: 'content-box', float: 'left', width: '325px', height: '475px' }}> {/* Container for the image and rating */}
                    <div className="relative">
                        <img src={book.cover} alt={book.title} className="relative w-72 h-auto shadow-2xl border-2 border-dark-brown rounded-lg bg-blend-darken" />
                        <div className="text-dark-brown mt-2  mr-5 font-review">
                            <img src={`/images/${book.rating}_stars.png`} alt={`${book.rating} stars`} />
                        </div>
                    </div>
                </div>
                <div> {/* Separate container for other book details */}
                    {book.review && book.review.replace(/\\n/g, '\n').split('\n').map((paragraph, index) => (
                        <p key={index} className="text-darker-brown font-review text-lg mb-4">{paragraph}</p>
                    ))}
                </div>
            </div>
        </section>
    );
    
    
    
}
