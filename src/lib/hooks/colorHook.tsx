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
    value: "bg-blue-100",
    name: "Blå",
  },
  {
    value: "bg-cyan-100",
    name: "Turkos",
  },
  {
    value: "bg-green-100",
    name: "Grön",
  },
  {
    value: "bg-red-100",
    name: "Röd",
  },
  {
    value: "bg-yellow-100",
    name: "Gul",
  },
  {
    value: "bg-purple-100",
    name: "Lila",
  },
  {
    value: "bg-pink-100",
    name: "Rosa",
  },
  {
    value: "bg-orange-100",
    name: "Orange",
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
