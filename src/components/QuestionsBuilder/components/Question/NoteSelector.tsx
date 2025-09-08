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
  FIRST_NOTE_OPTIONS,
  INCOME_STATEMENT_NOTES,
  OTHER_NOTES,
} from "./constants/noteConstants";

type Props = {
  question: Question;
  onQuestionNoteOptionsChanged: (newNoteOptions: NoteOption[]) => void;
};

// Component for individual note items in the dropdown
function NoteDropdownItem({
  note,
  isChecked,
  onToggle,
}: {
  note: NoteOption;
  isChecked: boolean;
  onToggle: () => void;
}) {
  return (
    <DropdownMenuCheckboxItem checked={isChecked} onCheckedChange={onToggle}>
      {note.name}
    </DropdownMenuCheckboxItem>
  );
}

// Component for a category of notes (e.g., Balance Sheet, Income Statement)
function NoteCategory({
  title,
  notes,
  isChecked,
  onToggle,
}: {
  title: string;
  notes: NoteOption[];
  isChecked: (noteId: string) => boolean;
  onToggle: (noteId: string) => void;
}) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span>{title}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {/* Direct notes in this category */}
          {notes.map((note) => (
            <NoteDropdownItem
              key={note.id}
              note={note}
              isChecked={isChecked(note.id)}
              onToggle={() => onToggle(note.id)}
            />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

// Component for the main dropdown menu
function NoteDropdownMenu({
  isChecked,
  onToggle,
}: {
  isChecked: (noteId: string) => boolean;
  onToggle: (noteId: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Add a note</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Available notes</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* First Note */}
        <NoteCategory
          title={FIRST_NOTE.name}
          notes={FIRST_NOTE_OPTIONS}
          isChecked={isChecked}
          onToggle={onToggle}
        />

        {/* Balance Sheet Notes */}
        <NoteCategory
          title="Balance sheet"
          notes={BALANCE_SHEET_NOTES}
          isChecked={isChecked}
          onToggle={onToggle}
        />

        {/* Income Statement Notes */}
        <NoteCategory
          title="Income statement"
          notes={INCOME_STATEMENT_NOTES}
          isChecked={isChecked}
          onToggle={onToggle}
        />

        {/* Other Notes */}
        <NoteCategory
          title="Other"
          notes={OTHER_NOTES}
          isChecked={isChecked}
          onToggle={onToggle}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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

  const handleToggleNote = (noteId: string) => {
    console.log({ noteId, isChecked: isChecked(noteId) });

    if (isChecked(noteId)) {
      handleOnRemoveNoteOption(noteId);
    } else {
      handleOnAddNoteOption(noteId);
    }
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
                {note.name}
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

      <NoteDropdownMenu isChecked={isChecked} onToggle={handleToggleNote} />
      <br />
    </>
  );
}
