import React from "react";
import BookCard from "@components/BookCard";

const Favorites = () => {
  // Replace the favorites state with favoriteBooks array
  const favoriteBooks = [
    { id: 1, cover: "/images/brave_new_world.jpeg", title: "Brave New World", author: "Huxley, Aldous" },
    { id: 2, cover: "/images/anxious_people.jpeg", title: "Anxious People", author: "Backman, Fredrik" },
    { id: 3, cover: "/images/the_housekeeper.jpeg", title: "The Housekeeper and the Professor", author: "Ogawa, Yoko" },
  ]; 

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
      {favoriteBooks.map((book) => (
                <BookCard
                  key={book.id}
                  cover={book.cover}
                  title={book.title}
                  author={book.author}
                />
              ))}
      </div>
    </div>
  </section>  
  );
};

export default Favorites;
