import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenu from "./EditorMenu";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      /*    StarterKit.configure({
        // Disable an included extension
        // history: false,

        // Configure an included extension
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }), */
    ],
    content: "<p>Hello World! 🌎️</p>",
    autofocus: true,
    editable: false,
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
