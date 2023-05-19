import React, { ReactNode, useCallback, useState } from "react";
import { IconType } from "react-icons";
import { FaFontAwesome, FaPython } from "react-icons/fa";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaPhp,
  FaJava,
  FaReact,
  FaAngular,
  FaVuejs,
  FaLaravel,
} from "react-icons/fa";
import {
  SiTypescript,
  SiCplusplus,
  SiC,
  SiCsharp,
  SiDotnet,
  SiExpress,
  SiKoa,
  SiNextdotjs,
  SiMysql,
  SiMongodb,
  SiGit,
  SiDocker,
} from "react-icons/Si";
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
  {
    id: 4,
    name: "php",
    icon: <FaPhp size={"4em"} />,
  },
  {
    id: 5,
    name: "pyton",
    icon: <FaPython size={"4em"} />,
  },
  {
    id: 6,
    name: "typescript",
    icon: <SiTypescript size={"4em"} />,
  },
  {
    id: 7,
    name: "c",
    icon: <SiC size={"4em"} />,
  },
  {
    id: 8,
    name: "cplusplus",
    icon: <SiCplusplus size={"4em"} />,
  },
  {
    id: 9,
    name: "csharp",
    icon: <SiCsharp size={"4em"} />,
  },
  {
    id: 10,
    name: "java",
    icon: <FaJava size={"4em"} />,
  },
  {
    id: 11,
    name: "react",
    icon: <FaReact size={"4em"} />,
  },
  {
    id: 12,
    name: "angular",
    icon: <FaAngular size={"4em"} />,
  },
  {
    id: 13,
    name: "vue",
    icon: <FaVuejs size={"4em"} />,
  },
  {
    id: 14,
    name: "laravel",
    icon: <FaLaravel size={"4em"} />,
  },
  {
    id: 15,
    name: "dotnet",
    icon: <SiDotnet size={"4em"} />,
  },
  {
    id: 16,
    name: "express",
    icon: <SiExpress size={"4em"} />,
  },
  {
    id: 17,
    name: "koa",
    icon: <SiKoa size={"4em"} />,
  },
  {
    id: 18,
    name: "nextjs",
    icon: <SiNextdotjs size={"4em"} />,
  },
  {
    id: 19,
    name: "mysql",
    icon: <SiMysql size={"4em"} />,
  },
  {
    id: 20,
    name: "mongodb",
    icon: <SiMongodb size={"4em"} />,
  },
  {
    id: 21,
    name: "git",
    icon: <SiGit size={"4em"} />,
  },
  {
    id: 22,
    name: "docker",
    icon: <SiDocker size={"4em"} />,
  },
];
export const useIcon = () => {
  // const [icon, setIcon] = useState<string>("");

  // Call this function when selecting an icon from a select menu.
  const selectIcon = useCallback((iconName: string) => {
    if (iconName === "" || !iconName) return;
    const icon = icons.filter((i) => i.name === iconName);

    return icon[0]?.icon;
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
