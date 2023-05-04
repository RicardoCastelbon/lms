import React, { useState, useEffect } from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import { Color } from "@/src/lib/hooks/colorHook";
import { useColor } from "@/src/lib/hooks/colorHook";
/* const colors = [
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
]; */
/* interface IFormValues {
  color: string;
  Age: number;
  setColor: React.Dispatch<React.SetStateAction<string>>;
} */

type Props = {
  field: any;
  // colors: Color[];
  // color: string;
  // label: string;
  hasSubmitted: boolean;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  // setIconName: React.Dispatch<React.SetStateAction<string>>;
};

const ColorSelect = ({ field, setColor, hasSubmitted }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { colors, selectColor } = useColor();
  // const [icon, setIcon] = useState<ReactNode>(null);
  // const { selectIcon, icons } = useIcon();

  //If form has been submitted, reset selectedColor to = ""
  useEffect(() => {
    if (hasSubmitted) {
      setSelectedColor("");
    }
  }, [hasSubmitted]);
  //   console.log(icon);

  const handleColorSelect = (color: string) => {
    // console.log(color);
    if (!color) return;
    const col = selectColor(color);
    setSelectedColor(col!);
    setColor(color);
  };
  return (
    <div className="py-8">
      {/*  <div {...field} className="flex justify-between items-center">

      </div> */}
      {/* Icon select wrapper */}
      <div {...field} className="w-full flex flex-wrap items-center gap-2 mt-4">
        {colors.map(
          (col, index) => (
            <div
              key={index}
              className={`w-[30px] h-[30px] rounded-full ${
                col.value
              } hover:cursor-pointer transition-all duration-200 ${
                selectedColor === col.value ? "w-[48px]" : "w-[30px]"
              }`}
              onClick={() => {
                handleColorSelect(col.value);
              }}
            ></div>
          )
          /*  selectedColor === col.value ? (
            <div
              key={index}
              className={`w-[30px] h-[30px] rounded-full ${
                col.value
              } hover:cursor-pointer transition-all duration-200 ${
                selectedColor === col.value ? "w-[48px]" : "w-[30px]"
              }`}
              onClick={() => {
                handleColorSelect(col.value);
              }}
            ></div>
          ) : (
            ""
          ) */
        )}
      </div>
    </div>
  );
};

export default ColorSelect;

// eslint-disable-next-line react/display-name
/* export const ColorSelect = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label ,color, setColor }, ref) => (
  <>
    <label>{label}</label>
    <select
      name="color"
      id="color"
      ref={ref}
      onChange={(e) => {
        setColor(e.target.value);
        console.log(e.target.value);
      }}
      className={`focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-md ${
        color !== "" ? `${color}` : "bg-muted"
      }`}
  
    >
      <option value="default">Välj</option>
      {colors.map((col, index) => (
        <option key={index} value={col.value}>
          {" "}
          {col.name}
        </option>
      ))}
    </select>
  </>
)); */

{
  /*  <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
  <option value="20">20</option>
  <option value="30">30</option>
</select> */
}
/*export const ColorSelect = React.forwardRef (({ field }, ref) => (



     <>
      <select
        name="color"
        id="color"
        ref={ref}
        className={`focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-md ${
          selectedColor !== "" ? `${selectedColor}` : "bg-muted"
        }`}
        // onChange={(e) => colorSelectHandle(e)}
         onChange={(e) => {
          colorSelectHandle(e);
        }}
        // value={selectedColor}
        {...field}
      >
        <option value="default">Välj</option>
        {colors.map((col, index) => (
          <option key={index} value={col.value}>
            {" "}
            {col.name}
          </option>
        ))}
      </select>
    </>

)) */
