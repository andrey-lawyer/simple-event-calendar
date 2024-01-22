import { PuffLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div
      className={`flex items-center justify-center fixed top-0 left-0 w-full h-full bg-opacity-50 bg-gray-500`}
    >
      <div className="text-center">
        <PuffLoader size={70} color={"blue"} />
      </div>
    </div>
  );
};
