import { linkData1, linkData2 } from "@/data/linkData";
import { LinkNav } from "./LinkNav";

export const Header = () => {
  return (
    <header className="fixed z-10 w-full border-b border-gray-300 py-2 backdrop-blur-2xl shadow-lg bg-blue-500 text-white md:py-4 xl:py-3">
      <div className="container  ">
        <nav className="flex justify-between  gap-4 md:gap-8 xl:gap-16 xxl:gap-24 ">
          <div className="flex gap-2">
            {linkData1.map((el, ind) => (
              <LinkNav key={ind} href={el.href} title={el.title} />
            ))}
          </div>
          <div className="flex gap-2">
            {linkData2.map((el, ind) => (
              <LinkNav key={ind} href={el.href} title={el.title} />
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};
