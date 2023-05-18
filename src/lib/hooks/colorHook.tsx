import React, { ReactNode, useCallback, useState } from "react";
import { IconType } from "react-icons";
import { FaFontAwesome } from "react-icons/fa";
import { FaHtml5, FaCss3Alt, FaJsSquare } from "react-icons/fa";

export type Color = {
  name: string;
  value: string;
};
const colors: Color[] = [
  {
    value: "bg-blue-500",
    name: "Blå",
  },
  {
    value: "bg-cyan-500",
    name: "Turkos",
  },
  {
    value: "bg-green-500",
    name: "Grön",
  },
  {
    value: "bg-red-500",
    name: "Röd",
  },
  {
    value: "bg-yellow-500",
    name: "Gul",
  },
  {
    value: "bg-purple-500",
    name: "Lila",
  },
  {
    value: "bg-pink-500",
    name: "Rosa",
  },
  {
    value: "bg-orange-500",
    name: "Orange",
  },
  {
    value: "bg-slate-500",
    name: "Gray",
  },
];
export const useColor = () => {
  // const [icon, setIcon] = useState<string>("");

  // Call this function when selecting an icon from a select menu.
  const selectColor = useCallback((color: string) => {
    if (color === "" || !color) return;
    const col = colors.filter((c) => c.value === color);
    // console.log(col[0].value);

    return col[0].value;
  }, []);

  /*  const Icon = React.useMemo(() => {
    const IconComponent: React.FC = ({ ...props }: any) => {
      const SelectedIcon = arr[props.logo.icon];
      return (
        div
      );
    };
    return IconComponent;
  }, [icon]); */

  return {
    selectColor,
    colors,
  };
};
