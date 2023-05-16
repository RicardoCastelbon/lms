import React, { ReactNode, useEffect, useState } from "react";
import { useIcon } from "@/src/lib/hooks/iconHook";
import { IconType } from "react-icons";
import { ControllerRenderProps } from "react-hook-form";
type Icon = {
  id: number;
  name: string;
  icon: ReactNode;
};
type Props = {
  hasSubmitted: boolean;
  value: string;
  onChange?: () => void;
  onBlur?: () => void;
  setValue: any;
  field?: ControllerRenderProps<
    {
      educationId: number;
      color: string;
      title: string;
      icon: string;
      content: string;
      points: string;
      published: boolean;
    },
    "icon"
  >;
  setIconName: React.Dispatch<React.SetStateAction<string>>;
};

const IconSelect = ({
  field,
  value,
  onBlur,
  onChange,
  setValue,
  hasSubmitted,
  setIconName,
}: Props) => {
  const [icon, setIcon] = useState<ReactNode>(null);
  const { selectIcon, icons } = useIcon();

  useEffect(() => {
    // console.log("icon", hasSubmitted);
    console.log(value);
    if (value.length > 0) {
      setIcon(selectIcon(value));
    }
    if (hasSubmitted) {
      setIcon(null);
    }
  }, [hasSubmitted]);

  //   console.log(icon);

  const handleIconSelect = (iconName: string) => {
    console.log(iconName);
    if (!iconName) return;
    setIcon(selectIcon(iconName));
    setIconName(iconName);
    setValue("icon", iconName);
  };
  return (
    <div className="">
      <div {...field} className="flex justify-between items-center">
        <div></div>
        {icon !== null && <>{icon}</>}
      </div>
      {/* Icon select wrapper */}
      <div className="w-full flex flex-wrap gap-2">
        {icons.map((icon, index) => (
          <div
            {...field}
            onChange={onChange}
            onBlur={onBlur}
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
