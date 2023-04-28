import React, { useEffect, useState } from "react";
import { useIcon } from "@/src/lib/hooks/iconHook";
import { IconType } from "react-icons";
type Icon = {
  id: number;
  name: string;
  icon: IconType;
};
type Props = {};

const IconSelect = (props: Props) => {
  const [icon, setIcon] = useState<any>(null);
  const { selectIcon, icons } = useIcon();

  useEffect(() => {
    setIcon(selectIcon("javascript"));
    console.log(icons);
  }, []);
  //   console.log(icon);

  const handleIconSelect = () => {};
  return (
    <div className="mt-20">
      <div className="flex justify-between items-center">
        <p>Välj ikon för kursen</p>
        {icon !== null && <>{icon}</>}
      </div>
      {/* Icon select wrapper */}
      <div className="w-full flex flex-wrap gap-2">
        {icons.map((icon, index) => (
          <div key={index} className="hover:text-indigo-50">
            <>{icon.icon}</>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSelect;
