import Link from "next/link";

const Title = () => {
  return (
    <nav className="flex-between w-full h-24 bg-beige border-b-2 border-dark-brown">
      <Link href="/" className="flex gap-2 flex-center h-full">
        <div className="flex items-center justify-center w-full">
          <p className="font-title text-5xl text-dark-brown">NOVELTEA</p>
        </div>
      </Link>
    </nav>
  );
};

export default Title;
