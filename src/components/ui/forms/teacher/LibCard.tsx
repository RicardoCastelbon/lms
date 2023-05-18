import { FileText } from "lucide-react";
import React from "react";
import { FaTrash } from "react-icons/fa";

type Props = {
  setReadInfo: React.Dispatch<React.SetStateAction<boolean>>;
  cardResource: any;
  infoClickHandler: (id: number) => void;
};

const LibCard = ({ setReadInfo, cardResource, infoClickHandler }: Props) => {
  return (
    <div className="relative flex flex-col justify-center items-center gap-2 w-[200px] h-[200px] bg-primary text-white rounded-md shadow-md hover:shadow-xl hover:scale-105 duration-200">
      {/* card header */}
      {/* <FaTrash className="absolute top-2 right-2 hover:cursor-pointer" /> */}
      <FileText size={48} />
      <h3>hej</h3>
      <button
        className="bg-green-500 text-white py-1 px-10 rounded-md hover:bg-green-600"
        onClick={() => infoClickHandler(cardResource.id)}
      >
        Info
      </button>
    </div>
  );
};

export default LibCard;
