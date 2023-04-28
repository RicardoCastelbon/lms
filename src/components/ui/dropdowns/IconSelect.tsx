import React, { ReactNode, useEffect, useState } from "react";
import { useIcon } from "@/src/lib/hooks/iconHook";
import { IconType } from "react-icons";
type Icon = {
  id: number;
  name: string;
  icon: ReactNode;
};
type Props = {
  setIconName: React.Dispatch<React.SetStateAction<string>>;
};

const IconSelect = ({ setIconName }: Props) => {
  const [icon, setIcon] = useState<ReactNode>(null);
  const { selectIcon, icons } = useIcon();

  useEffect(() => {
    // setIcon(selectIcon("javascript"));
    // console.log(icons);
  }, []);
  //   console.log(icon);

  const handleIconSelect = (iconName: string) => {
    console.log(iconName);
    if (!iconName) return;
    setIcon(selectIcon(iconName));
    setIconName(iconName);
  };
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <p>Välj ikon för kursen</p>
        {icon !== null && <>{icon}</>}
      </div>
      {/* Icon select wrapper */}
      <div className="w-full flex flex-wrap gap-2">
        {icons.map((icon, index) => (
          <div
            key={index}
            className="hover:text-indigo-50"
            onClick={() => {
              handleIconSelect(icon.name);
            }}
          >
            <>{icon.icon}</>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSelect;
