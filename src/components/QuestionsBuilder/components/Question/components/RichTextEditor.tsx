import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Small } from "@/components/ui/Typography";

type Props = {
  title: string;
  value: string;
  onChange: (value: string) => void;
};

export function RichTextEditor(props: Props) {
  const { title, value, onChange } = props;
  const editorRef = useRef<HTMLDivElement>(null);
  const defaultValue = useRef(value);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);

  const handleBoldClick = () => {
    document.execCommand("bold", false, "");
    setIsBold(!isBold);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleItalicClick = () => {
    document.execCommand("italic", false, "");
    setIsItalic(!isItalic);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleUnorderedListClick = () => {
    document.execCommand("insertUnorderedList", false, "");
    setIsUnorderedList(!isUnorderedList);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  // Function to check and update the formatting state
  const updateFormattingState = () => {
    // Only update the formatting state if the selection is inside the current editor
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (
      editorRef.current &&
      editorRef.current.contains(range.commonAncestorContainer)
    ) {
      // If the selection is inside this editor, update the formatting state
      const isTextBold = document.queryCommandState("bold");
      const isTextItalic = document.queryCommandState("italic");
      const isTextUnorderedList = document.queryCommandState("insertUnorderedList");

      setIsBold(isTextBold);
      setIsItalic(isTextItalic);
      setIsUnorderedList(isTextUnorderedList);
    }
  };

  useEffect(() => {
    // Listen to the selectionchange event to detect when the user moves the caret
    const handleSelectionChange = () => {
      updateFormattingState();
    };

    // Add event listener for selection change
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      // Cleanup listener on unmount
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <>
      <Small className="font-extrabold mb-4">{title}</Small>
      <div>
        <Button
          className="mr-1 w-[40px]"
          variant={isBold ? "default" : "outline"}
          onClick={handleBoldClick}
        >
          B
        </Button>
        <Button
          className="mr-1 w-[40px]"
          variant={isItalic ? "default" : "outline"}
          onClick={handleItalicClick}
        >
          I
        </Button>
        <Button
          className="mr-1 w-[40px]"
          variant={isUnorderedList ? "default" : "outline"}
          onClick={handleUnorderedListClick}
        >
          •
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable="true"
        className="mt-2 mb-5 min-h-[100px] border p-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onPaste={handlePaste}
        dangerouslySetInnerHTML={{ __html: defaultValue.current }}
      />
    </>
  );
}
