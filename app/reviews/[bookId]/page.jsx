"use client"
// import BookPage from '@components/Bookpage';
import React, { useState, useEffect } from 'react';

export default function BookPost({params}) {


    if (!params.bookId) {
        return <div>Loading...</div>; // or some other loading state
    }

    const [book, setBook] = useState({});
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');  // default color
    const [closestFrame, setClosestFrame] = useState('white.jpeg');  // default color
    const [loading, setLoading] = useState(true);
    const frames = ["pink.jpeg", "blue.jpeg", "lavender.jpeg", "white.jpeg"];
    const frameColors = [];

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
            
                // Use Promise.all to calculate the average color of each frame
                const frameColorsPromises = frames.map((frame) => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = `/images/${frame}`;
                        img.crossOrigin = 'Anonymous';
                        img.onload = () => {
                            const color = fac.getColor(img);
                            resolve({ frame, color: color.rgba });
                        };
                        img.onerror = reject;
                    });
                });
            
                // Wait for all promises to resolve
                Promise.all([bookImageColor, ...frameColorsPromises]).then((values) => {
                    const bookColor = values[0];
                    const frameColors = values.slice(1);
                    
                    // Get the closest frame
                    const closest = frameColors.sort((a, b) => colorDifference(bookColor, a.color) - colorDifference(bookColor, b.color))[0].frame;
                    setClosestFrame(closest);
                });
            };
            
            document.body.appendChild(script);

            function rgbToHsl(r, g, b) {
                r /= 255, g /= 255, b /= 255;
                let max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;
            
                if(max == min){
                    h = s = 0; // achromatic
                } else {
                    let d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch(max){
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
            
                return [ h, s, l ];
            }
            
            function colorDifference(color1, color2) {
                // The color looks like 'rgba(255, 255, 255, 1)'
                // We need to extract the red, green, and blue values
                const [r1, g1, b1] = color1.substring(5, color1.length - 1).split(',').map((c) => parseInt(c.trim()));
                const [r2, g2, b2] = color2.substring(5, color2.length - 1).split(',').map((c) => parseInt(c.trim()));
            
                const [h1, s1, l1] = rgbToHsl(r1, g1, b1);
                const [h2, s2, l2] = rgbToHsl(r2, g2, b2);
            
                return Math.abs(h1 - h2) + Math.abs(s1 - s2) + Math.abs(l1 - l2);
            }
            
            

            // Check if all frame colors are loaded
            const checkFrameColors = setInterval(() => {
                if (frameColors.length === frames.length) {
                    clearInterval(checkFrameColors);
                    // Get the closest frame
                    const closest = frameColors.sort((a, b) => colorDifference(backgroundColor, a.color) - colorDifference(backgroundColor, b.color))[0].frame;
                    setClosestFrame(closest);
                }
            }, 100);
        };
        fetchBookID();
    }, [params.bookId]);

    return (
        <section className="w-full h-screen relative flex flex-col justify-start">
            <div 
                className="absolute inset-0 w-full h-screen opacity-20"
                style={{ 
                    backgroundColor: backgroundColor
                }}
            />
            <div 
                className="absolute inset-0 w-full h-screen opacity-20"
                style={{ 
                    backgroundImage: `url('/images/river.jpeg')`,
                    backgroundBlendMode: 'overlay',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <div className="relative z-10 flex mt-40">
                <div className="flex items-start ml-40"> {/* The main container flex */}
                    <div className="flex flex-col items-center"> {/* Added a new container for the image and rating */}
                        <div className="relative">
                            <div className='shadow-2xl border-2 border-book-border rounded-lg' 
                                style={{ 
                                    backgroundImage: `url('/images/${closestFrame}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '300px',
                                    height: '450px',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: -1
                                }}
                            />
                            <img src={book.cover} alt={book.title} className="relative w-48 h-auto shadow-2xl border-2 border-dark-brown rounded-lg bg-blend-darken" />
                        </div>
                        <div className="flex flex-col items-center font-review mt-8"> {/* Rating below the image */}
                            <p className="text-dark-brown">{book.rating}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start ml-20"> {/* Other book details */}
                        <p className="text-dark-brown font-review">{book.title}</p>
                        <p className="text-dark-brown font-review">{book.author}</p>
                        <p className="text-dark-brown font-review">{book.review}</p>
                    </div>
                </div>
            </div>
        </section>
    );
    
    
    
    
}
