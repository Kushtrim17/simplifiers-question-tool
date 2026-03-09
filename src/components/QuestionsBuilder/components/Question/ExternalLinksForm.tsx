import { useState } from "react";
import { Medium } from "@/components/ui/Typography";
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
import { ExternalLink } from "../../types";

type Props = {
  title: string;
  links: ExternalLink[];
  onAdd: (label: string, url: string) => void;
  onRemove: (label: string, url: string) => void;
};

const LinkList = ({
  links,
  onRemove,
}: {
  links: ExternalLink[];
  onRemove: (label: string, url: string) => void;
}) => {
  if (links.length === 0) return null;

  return (
    <div className="mt-2 flex flex-row flex-wrap">
      {links.map((link) => (
        <div key={link.url} className="flex flex-row mr-4 mb-2">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${badgeVariants({
              variant: "outline",
            })} h-[40px] min-w-[100px] justify-center items-center`}
          >
            {link.label}
          </a>
          <IoClose
            size={20}
            className="mt-2 cursor-pointer"
            onClick={() => onRemove(link.label, link.url)}
          />
        </div>
      ))}
    </div>
  );
};

const AddLinkDialog = ({
  title,
  onAdd,
}: {
  title: string;
  onAdd: (label: string, url: string) => void;
}) => {
  const [link, setLink] = useState({ label: "", url: "" });

  const handleAdd = () => {
    onAdd(link.label, link.url);
    setLink({ label: "", url: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="mt-3 mb-3" size="sm">
          Add link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Add a title and URL to be displayed in the question
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link-label" className="text-right">
              Title
            </Label>
            <Input
              id="link-label"
              value={link.label}
              onChange={(e) => setLink({ ...link, label: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link-url" className="text-right">
              URL
            </Label>
            <Input
              id="link-url"
              value={link.url}
              onChange={(e) => setLink({ ...link, url: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleAdd}>
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const ExternalLinksForm = ({ title, links, onAdd, onRemove }: Props) => {
  return (
    <>
      <Medium className="font-extrabold">{title}</Medium>
      <LinkList links={links} onRemove={onRemove} />
      <AddLinkDialog title={title} onAdd={onAdd} />
    </>
  );
};
