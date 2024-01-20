import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed z-2 w-full border-b border-gray-300 py-2 backdrop-blur-2xl shadow-lg bg-blue-500 text-white md:py-4 xl:py-3">
      <div className="container flex items-center justify-between">
        <nav className="flex items-center gap-4 md:gap-8 xl:gap-16 xxl:gap-24">
          <Link
            className="inline-block px-4 py-2 text-base font-bold text-center no-underline rounded-md bg-white text-gray-700 transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white"
            href="/"
          >
            Home
          </Link>

          <Link
            className="inline-block px-4 py-2 text-base font-bold text-center no-underline rounded-md bg-white text-gray-700 transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white"
            href="/events"
          >
            Events
          </Link>
          <Link
            className="inline-block px-4 py-2 text-base font-bold text-center no-underline rounded-md bg-white text-gray-700 transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white"
            href="/register"
          >
            Sign up
          </Link>
          <Link
            className="inline-block px-4 py-2 text-base font-bold text-center no-underline rounded-md bg-white text-gray-700 transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white"
            href="/login"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};
