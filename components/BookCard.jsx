const BookCard = ({ cover, title, author, onClick }) => {
  return (
      <div className="w-56 flex flex-col items-center relative p-8 justify-center shadow hover:shadow-2xl hover:opacity-60" onClick={onClick}>
          <div
              className="w-56 h-82 absolute inset-0 bg-beige rounded-md"
              style={{ zIndex: -1, marginTop: "5px", opacity: "0.40" }}
          ></div>
          <div className="w-full h-54 aspect-w-2 aspect-h-3 border-2 border-dark-brown rounded-md overflow-hidden">
              <img 
                  src={cover}
                  alt={title}
                  className="w-full h-full object-cover" 
              />
          </div>
          <div className="p-1 text-center mt-1 h-16">
              <h2 className="font-bookcard text-darker-brown text-md">{title}</h2>
              <p className="font-bookcard text-darker-brown text-sm mt-1">{author}</p>
          </div>
      </div>
  );
};

export default BookCard;
