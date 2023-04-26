import React from "react";
import ColorSelect from "../../dropdowns/ColorSelect";

type Props = {};

const CreateCourseForm = (props: Props) => {
  return (
    <form className="flex gap-4">
      {/* left side */}
      <section className="flex-1 flex flex-col gap-4">
        {/* form group */}
        <div className="flex flex-col">
          <label htmlFor="title">Titel</label>
          <input
            id="title"
            className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2 text-sm"
            type="text"
            placeholder="Ge kursen ett namn"
          />
        </div>
        <div className="flex flex-col">
          <p>Välj ikon</p>
        </div>
        <div className="flex flex-col">
          {/* <label htmlFor="color">Välj en bakgrundsfärg</label> */}
          <ColorSelect />
        </div>
      </section>
      {/* Right side */}
      <section className="flex-1 bg-primary"></section>
    </form>
  );
};

export default CreateCourseForm;
