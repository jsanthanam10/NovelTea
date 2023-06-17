import Link from "next/link";

const Title = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-36 bg-beige border-b-2 border-dark-brown">
      <div className="absolute left-0 ml-[-2rem] mt-6">
        <Link href="/">
          <img
            src="/images/noveltea.png" // Replace with the actual path to your logo
            alt="Noveltea Logo"
            className="h-auto max-h-24 md:max-h-48" // Added rounded-full class
          />
        </Link>
      </div>
      <div className="flex items-center justify-center w-full">
        <Link href="/">
          <p className="font-title text-6xl text-dark-brown">NOVELTEA</p>
        </Link>
      </div>
    </div>
  );
};

export default Title;



