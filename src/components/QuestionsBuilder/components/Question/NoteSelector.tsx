import { Small } from "@/components/ui/Typography";
import { NoteOption, Question } from "../../types";
import { badgeVariants } from "@/components/ui/badge";
import { IoClose } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ALL_NOTES,
  BALANCE_SHEET_NOTES,
  FIRST_NOTE,
  INCOME_STATEMENT_NOTES,
  OTHER_NOTES,
} from "./constants/noteConstants";

type Props = {
  question: Question;
  onQuestionNoteOptionsChanged: (newNoteOptions: NoteOption[]) => void;
};

export function NoteSelector(props: Props) {
  const { question } = props;

  const handleOnAddNoteOption = (noteId: string) => {
    const selectedNote = ALL_NOTES.find((note) => note.id === noteId);
    if (selectedNote) {
      const options = question.noteOptions || [];
      props.onQuestionNoteOptionsChanged([...options, selectedNote]);
    }
  };

  const handleOnRemoveNoteOption = (noteId: string) => {
    const options = question.noteOptions || [];
    const newOptions = options.filter((note) => note.id !== noteId);
    props.onQuestionNoteOptionsChanged(newOptions);
  };

  const isChecked = (noteId: string) => {
    const options = question.noteOptions || [];
    return options.some((note) => note.id === noteId);
  };

  return (
    <>
      <Small className="font-extrabold">
        Which note options should be available
      </Small>

      <div className="mt-4 flex flex-row flex-wrap gap-x-4 gap-y-2">
        {question.noteOptions && question.noteOptions.length > 0 ? (
          question.noteOptions.map((note) => (
            <div key={note.id} className="flex flex-row mr-4 group">
              <a
                href={note.id}
                target="_blank"
                className={`${badgeVariants({
                  variant: "outline",
                })} h-[40px] min-w-[100px] justify-center items-center`}
              >
                {note.label}
              </a>
              <IoClose
                size={20}
                className="mt-2"
                onClick={() => handleOnRemoveNoteOption(note.id)}
              />
            </div>
          ))
        ) : (
          <Small className="font-extrabold opacity-65">No notes selected</Small>
        )}
      </div>
      <br />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Add a note</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Available notes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>First note</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  checked={isChecked(FIRST_NOTE.id)}
                  onCheckedChange={() =>
                    isChecked(FIRST_NOTE.id)
                      ? handleOnRemoveNoteOption(FIRST_NOTE.id)
                      : handleOnAddNoteOption(FIRST_NOTE.id)
                  }
                >
                  {FIRST_NOTE.label}
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Balance sheet</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {BALANCE_SHEET_NOTES.map((note) => (
                  <DropdownMenuCheckboxItem
                    checked={isChecked(note.id)}
                    onCheckedChange={() =>
                      isChecked(note.id)
                        ? handleOnRemoveNoteOption(note.id)
                        : handleOnAddNoteOption(note.id)
                    }
                  >
                    {note.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Income statement</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {INCOME_STATEMENT_NOTES.map((note) => (
                  <DropdownMenuCheckboxItem
                    checked={isChecked(note.id)}
                    onCheckedChange={() =>
                      isChecked(note.id)
                        ? handleOnRemoveNoteOption(note.id)
                        : handleOnAddNoteOption(note.id)
                    }
                  >
                    {note.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Other</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {OTHER_NOTES.map((note) => (
                  <DropdownMenuCheckboxItem
                    checked={isChecked(note.id)}
                    onCheckedChange={() =>
                      isChecked(note.id)
                        ? handleOnRemoveNoteOption(note.id)
                        : handleOnAddNoteOption(note.id)
                    }
                  >
                    {note.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      <br />
    </>
  );
}
