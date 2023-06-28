"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing the useRouter hook from next/router
import BookCard from '@components/BookCard';
import Select from 'react-select';

const options = [
    { value: '0', label: 'All categories' },
    { value: 'My Favorites', label: 'My Favorites' },
    { value: 'Philosophical', label: 'Philosophical' },
    { value: 'Found Family', label: 'Found Family' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Fiction', label: 'Fiction' }
];


const ratingOptions = [ // Add rating options
    { value: '0', label: 'All ratings' },
    { value: '5', label: '5 stars' },
    { value: '4', label: '4 stars' },
    { value: '3', label: '3 stars' },
    { value: '2', label: '2 stars' },
    { value: '1', label: '1 star' }
];

const sortOptions = [
    { value: 'ratingDesc', label: 'Rating (High to Low)' },
    { value: 'ratingAsc', label: 'Rating (Low to High)' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'author', label: 'Author (A-Z)' },
];
 // Update the path as per your directory structure


export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRatings, setSelectedRatings] = useState([ratingOptions[0]]);
    const [selectedCategories, setSelectedCategories] = useState([options[0]]);
    const [sortBy, setSortBy] = useState(sortOptions[0]);
    const [titleFilter, setTitleFilter] = useState(""); 
    const [authorFilter, setAuthorFilter] = useState("");
    
    const router = useRouter();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/api/getBook/');
            const booksData = await response.json();
            setBooks(booksData);
            setIsLoading(false);
        };

        fetchBooks();
    }, []);

    const handleBookClick = (book) => {
        console.log('Book ID: ', book._id);
        router.push(`/browse/${book._id}`);
    };

    const handleTitleChange = event => {
        setTitleFilter(event.target.value);
    };

    const handleAuthorChange = event => {
        setAuthorFilter(event.target.value);
    };

    const handleSortChange = selectedOption => {
        setSortBy(selectedOption);
    };

    const handleCategoryChange = selectedOption => {
        let updatedSelection = selectedOption || [];
        // If 'All categories' is not the only selected option, filter it out
        if (updatedSelection.length > 1 && updatedSelection.some(option => option.value === '0')) {
            updatedSelection = updatedSelection.filter(option => option.value !== '0');
        }
        // If no option is selected, add 'All categories' back in
        else if (updatedSelection.length === 0) {
            updatedSelection = [options.find(option => option.value === '0')];
        }
        setSelectedCategories(updatedSelection);
    };

    const handleRatingChange = selectedOption => {
        let updatedSelection = selectedOption || [];
        // If 'All ratings' is not the only selected option, filter it out
        if (updatedSelection.length > 1 && updatedSelection.some(option => option.value === '0')) {
            updatedSelection = updatedSelection.filter(option => option.value !== '0');
        }
        // If no option is selected, add 'All ratings' back in
        else if (updatedSelection.length === 0) {
            updatedSelection = [ratingOptions.find(option => option.value === '0')];
        }
        setSelectedRatings(updatedSelection);
    };
    

    const filteredBooks = books.filter(book => 
        (selectedRatings.length === 0 || selectedRatings.some(rating => rating.value === '0' || book.rating == rating.value)) && 
        (selectedCategories.length === 0 || selectedCategories.some(category => category.value === '0' || book.categories.includes(category.value))) &&
        (book.title.toLowerCase().includes(titleFilter.toLowerCase())) &&
        (book.author.toLowerCase().includes(authorFilter.toLowerCase()))
    );
    
    filteredBooks.sort((a, b) => {
        switch (sortBy.value) {
            case 'ratingDesc':
                return b.rating - a.rating;
            case 'ratingAsc':
                return a.rating - b.rating;
            case 'title':
                return a.title.localeCompare(b.title);
            case 'author':
                return a.author.localeCompare(b.author);
            default:
                return 0;
        }
    });
    
    

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
        <section className="w-full min-h-screen relative flex flex-col">
            <div
                className="absolute inset-0 bg-no-repeat bg-fixed bg-cover opacity-50"
                style={{
                    backgroundImage: `url('/images/window.jpeg')`,
                }}
            />
            <div className="flex flex-col justify-start items-center w-full relative z-10 h-full mt-10">
                <div className="flex space-x-4 mb-10">
                <Select
                    name="sort"
                    options={sortOptions}
                    className="basic-select"
                    classNamePrefix="select"
                    onChange={handleSortChange}
                    value={sortBy}
                    placeholder="Sort by"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: '#F9F5EC',
                            border: '2px solid #4b371c',
                        }),
                    }}
                />
                <Select
                    isMulti
                    name="rating"
                    options={ratingOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleRatingChange}
                    value={selectedRatings}
                    placeholder="Filter by rating"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: '#F9F5EC',
                            border: '2px solid #4b371c',
                        }),
                    }}
                />
                <Select
                    isMulti
                    name="categories"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleCategoryChange}
                    value={selectedCategories}
                    placeholder="Filter by category"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: '#F9F5EC',
                            border: '2px solid #4b371c',
                        }),
                    }}
                />
                <input 
                    type="text"
                    placeholder="Filter by title"
                    value={titleFilter}
                    onChange={handleTitleChange}
                    className="p-1 border-2 border-dark-brown bg-[#F9F5EC] rounded-md font-review"
                />
                <input 
                    type="text"
                    placeholder="Filter by author"
                    value={authorFilter}
                    onChange={handleAuthorChange}
                    className="p-1 border-2 border-dark-brown bg-[#F9F5EC] rounded-md font-review"
                />
                </div>
                <div className="grid grid-cols-5 gap-8 mb-10 overflow-auto flex-grow">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                            <BookCard 
                                key={book._id}
                                cover={book.cover}
                                title={book.title}
                                author={book.author}
                                onClick={() => handleBookClick(book)}
                            />
                        ))
                    ) : (
                        <p className='text-lg'>No books found for the selected filters.</p>
                    )}
                </div>
            </div>
        </section>  
    );
    
    
}