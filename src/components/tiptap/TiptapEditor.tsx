import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapEditorProps {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const TiptapEditor = ({ setContent }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>hello world</p>",
    onUpdate: () => {
      if (editor) {
        setContent(editor.getHTML());
      }
    },
  });
  return (
    <EditorContent
      editor={editor}
      className="border border-neutral-500 px-5 outline-none"
    />
  );
};
