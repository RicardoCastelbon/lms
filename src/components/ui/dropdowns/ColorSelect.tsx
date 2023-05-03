import React, { useState, useEffect } from "react";

const colors = [
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

const ColorSelect = ({ field }: any) => {
  const [selectedColor, setSelectedColor] = useState<string>("");

  const colorSelectHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);

    const col = e.target.value;
    setSelectedColor(col);
  };

  useEffect(() => {
    console.log(selectedColor);
  }, [selectedColor]);

  return (
    <>
      <select
        name="color"
        id="color"
        className={`focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-md ${
          selectedColor !== "" ? `${selectedColor}` : "bg-muted"
        }`}
        onChange={(e) => {
          console.log(e);
        }}
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
  );
};
export default ColorSelect;
