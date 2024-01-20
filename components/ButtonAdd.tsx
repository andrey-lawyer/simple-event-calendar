import Link from "next/link";

export const ButtonAdd = () => {
  return (
    <Link
      className="block w-full text-center px-4 py-2 text-base font-bold no-underline rounded-md bg-blue-500 text-white transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white"
      href="/new-event"
    >
      Add Event
    </Link>
  );
};
