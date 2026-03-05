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
import { ExternalLink, ExternalResources } from "../../types";

type LinkCategory = "reportLinks" | "readMoreLinks";

const CATEGORY_LABELS: Record<LinkCategory, string> = {
  reportLinks: "Report links",
  readMoreLinks: "Read more links",
};

type Props = {
  externalResources: ExternalResources;
  onUpdate: (updated: ExternalResources) => void;
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
}

const AddLinkDialog = ({
  category,
  onAdd,
}: {
  category: LinkCategory;
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
          Add {CATEGORY_LABELS[category].toLowerCase().replace(" links", "")} link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{CATEGORY_LABELS[category]}</DialogTitle>
          <DialogDescription>
            Add a title and URL to be displayed in the question
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${category}-label`} className="text-right">
              Title
            </Label>
            <Input
              id={`${category}-label`}
              value={link.label}
              onChange={(e) => setLink({ ...link, label: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${category}-url`} className="text-right">
              URL
            </Label>
            <Input
              id={`${category}-url`}
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
}

export const ExternalResourcesForm = ({ externalResources, onUpdate }: Props) => {
  const handleAdd = (category: LinkCategory, label: string, url: string) => {
    onUpdate({
      ...externalResources,
      [category]: [...externalResources[category], { label, url }],
    });
  };

  const handleRemove = (
    category: LinkCategory,
    label: string,
    url: string
  ) => {
    onUpdate({
      ...externalResources,
      [category]: externalResources[category].filter(
        (link) => link.label !== label || link.url !== url
      ),
    });
  };

  return (
    <>
      <Medium className="font-extrabold">External resources</Medium>

      {(["reportLinks", "readMoreLinks"] as const).map((category) => (
        <div key={category} className="mt-3">
          <p className="text-sm font-semibold text-slate-600">
            {CATEGORY_LABELS[category]}
          </p>
          <LinkList
            links={externalResources[category]}
            onRemove={(label, url) => handleRemove(category, label, url)}
          />
          <AddLinkDialog
            category={category}
            onAdd={(label, url) => handleAdd(category, label, url)}
          />
        </div>
      ))}
    </>
  );
}
