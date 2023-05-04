"use client";
import { log } from "console";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
type Course = {
  title: string;
  color: string;
  description: string;
  content: string;
};
type Props = {
  // quillRef: React.RefObject<any>;
};

const RichText = forwardRef<HTMLDivElement>(function Editor(props, ref) {
  // const { ...restProps } = props;
  /*   const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      //   [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  }; */

  return (
    <>
      <div className="w-full" ref={ref} />

      {/*     <ReactQuill
      forwardedRef={editorRef}

      // value={}
      onChange={(editor) => {
        // setCourseContent(editor);
        handleSubmit(editor);

        // console.log(editor);
      }}
      placeholder={"Komponera kursinformationen här"}
      modules={modules}
      theme="snow"
    >
      <div ref={editorRef} className="my-editing-area" />
    </ReactQuill> */}
    </>
  );
});

export default RichText;
