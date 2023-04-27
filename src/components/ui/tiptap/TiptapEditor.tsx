import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenu from "./EditorMenu";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <>
      <div className="border">
        <EditorMenu editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default Tiptap;
