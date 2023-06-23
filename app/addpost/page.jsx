"use client"
import { useState } from 'react';

const Home = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [categories, setCategories] = useState('');
  const [submitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError(false);

    try {
      const categoriesArray = categories.split(',').map(category => category.trim());
      const response = await fetch("/api/addBook/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, cover, review, rating, categories: categoriesArray })
      });
      if(response.ok){
        setSuccess(true);
        setTitle('');
        setAuthor('');
        setCover('');
        setReview('');
        setRating('');
        setCategories('');
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full h-screen relative flex">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-60"
        style={{
          backgroundImage: `url('/images/waves.jpeg')`,
        }}
      />
  
      <h1 className="absolute top-12 left-1/2 transform -translate-x-1/2 text-4xl font-addpost text-dark-brown">
        Add Post
      </h1>
      {success && <div className="absolute top-0 right-0 m-4 bg-green-400 text-white p-2 rounded">Book has been successfully added!</div>}
      {error && <div className="absolute top-0 right-0 m-4 bg-red-500 text-white p-2 rounded">Failed to add book. Please try again!</div>}
      <form onSubmit={handleSubmit}>
        <div className="absolute inset-x-0 bottom-20 top-5 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <div className="flex flex-col space-y-4">
            <input className="border-2 border-dark-brown p-4 w-full bg-off-white" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input className="border-2 border-dark-brown p-4 w-full bg-off-white" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
            <input className="border-2 border-dark-brown p-4 w-full bg-off-white" type="text" value={cover} onChange={(e) => setCover(e.target.value)} placeholder="Cover URL" required />
            <textarea className="border-2 border-dark-brown p-4 h-60 w-full resize-y bg-off-white" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Review" required></textarea>
            <input className="border-2 border-dark-brown p-4 w-full bg-off-white" type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" required />
            <input className="border-2 border-dark-brown p-4 w-full bg-off-white" type="text" value={categories} onChange={(e) => setCategories(e.target.value)} placeholder="Categories" required />
            <button className="border-2 border-dark-brown bg-beige p-4 w-full bg-beige" type="submit">Add Post</button>
          </div>
        </div>
      </div>
      </form>
    </section>
  );

  
}

export default Home;