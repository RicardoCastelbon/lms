import React, { ReactNode, useCallback, useState } from "react";
import { IconType } from "react-icons";
import { FaFontAwesome } from "react-icons/fa";
import { FaHtml5, FaCss3Alt, FaJsSquare } from "react-icons/fa";
type Icon = {
  id: number;
  name: string;
  icon: ReactNode;
};
const icons: Icon[] = [
  {
    id: 1,
    name: "html",
    icon: <FaHtml5 size={"4em"} />,
  },
  {
    id: 2,
    name: "css",
    icon: <FaCss3Alt size={"4em"} />,
  },
  {
    id: 3,
    name: "javascript",
    icon: <FaJsSquare size={"4em"} />,
  },
];
export const useIcon = () => {
  // const [icon, setIcon] = useState<string>("");

  // Call this function when selecting an icon from a select menu.
  const selectIcon = useCallback((iconName: string) => {
    if (iconName === "" || !iconName) return;
    const icon = icons.filter((i) => i.name === iconName);

    return icon[0].icon;
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
    selectIcon,
    icons,
  };
};
