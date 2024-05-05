import { useState } from "react";
import { Small } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { badgeVariants } from "@/components/ui/badge";
import { IoClose } from "react-icons/io5";
import { Question } from "../../types";

type Props = {
  question: Question;
  onAdd: (label: string, url: string) => void;
  onRemove: (label: string, url: string) => void;
};

export function AddExternalLinkForm(props: Props) {
  const [link, setLink] = useState({ label: "", url: "" });
  const { onAdd, onRemove, question } = props;

  const handleAddLink = () => {
    onAdd(link.label, link.url);
    setLink({ label: "", url: "" });
  };

  return (
    <>
      <Small>External links</Small>
      <div className="mt-4 flex flex-row">
        {question.externalLinks.map((link) => (
          <div key={link.url} className="flex flex-row mr-4 group">
            <a
              href={link.url}
              target="_blank"
              className={`${badgeVariants({
                variant: "outline",
              })} h-[40px] min-w-[100px] justify-center items-center`}
            >
              {link.label}
            </a>
            <IoClose
              size={20}
              className="mt-2"
              onClick={() => onRemove(link.label, link.url)}
            />
          </div>
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-5 mb-5">
            Add external link
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>External link</DialogTitle>
            <DialogDescription>
              External links are resources that can help answer the question
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">
                Label
              </Label>
              <Input
                id="label"
                defaultValue={link.label}
                value={link.label}
                onChange={(e) => setLink({ ...link, label: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                Url
              </Label>
              <Input
                id="url"
                defaultValue={link.url}
                value={link.url}
                onChange={(e) => setLink({ ...link, url: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={handleAddLink}>
                Add
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
