import { FileText, Info } from "lucide-react";
import React from "react";

type Props = {
  infoClickHandler: () => void;
  title: string;
};

const ExerciseLibCard = ({ infoClickHandler, title }: Props) => {
  return (
    <div className="relative flex flex-col justify-center items-center gap-2 w-[200px] h-[200px] bg-primary text-white rounded-md shadow-md hover:shadow-xl hover:scale-105 duration-200">
      <Info
        className="absolute top-2 right-2 hover:cursor-pointer"
        onClick={infoClickHandler}
      />
      <FileText size={48} />
      <h3>{title}</h3>
    </div>
  );
};

export default ExerciseLibCard;
