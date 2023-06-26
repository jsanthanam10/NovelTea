import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex-between w-full h-16 bg-beige">
      <div className="flex justify-center items-center px-8 gap-20 ml-24">
          <Link href="/" className="font-nav text-dark-brown hover:text-brown mt-1 mr-4 p-5">
            Home
          </Link>
          <Link href="/addpost" className="font-nav text-dark-brown hover:text-brown mt-1 mr-4 p-5">
            Add Post
          </Link>
          <Link href="/browse" className="font-nav text-dark-brown hover:text-brown mt-1 mr-4 p-5">
            Browse
          </Link>
          <Link href="/all" className="font-nav text-dark-brown hover:text-brown mt-1 mr-4 p-5">
            All Reviews
          </Link>
          <Link href="/recommendations" className="font-nav text-dark-brown hover:text-brown mt-1 mr-4 p-5">
            Recommendations
          </Link>
      </div>
    </nav>
  );
};

export default Nav;



