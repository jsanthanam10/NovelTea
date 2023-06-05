import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex-between w-full h-16 bg-beige">
      <div className="flex justify-center items-center px-8 gap-12">
          <Link href="/" className="font-nav text-dark-brown hover:text-brown mt-5 mr-4">
            Home
          </Link>
          <Link href="/favorites" className="font-nav text-dark-brown hover:text-brown mt-5 mr-4">
            My Favorites
          </Link>
          <Link href="/" className="font-nav text-dark-brown hover:text-brown mt-5 mr-4">
            Ratings
          </Link>
          <Link href="/" className="font-nav text-dark-brown hover:text-brown mt-5 mr-4">
            Reviews
          </Link>
          <Link href="/" className="font-nav text-dark-brown hover:text-brown mt-5 mr-4">
            Recommendations
          </Link>
      </div>
    </nav>
  );
};

export default Nav;



