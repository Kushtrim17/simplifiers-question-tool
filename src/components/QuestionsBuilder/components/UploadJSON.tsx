import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Small } from "@/components/ui/Typography";
import { When } from "@/components/ui/When/When";
import { isValidJSON } from "@/lib/utils";
import { Structure, isStructureType } from "../types";

type Props = {
  onUpload: (structure: Structure) => void;
};

export function UploadJSON(props: Props) {
  const { onUpload } = props;
  const [json, setJSON] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isValidJSON(json)) {
      setErrorMessage("The JSON structure is not valid");
      return e.preventDefault();
    }

    if (!isStructureType(JSON.parse(json))) {
      setErrorMessage("Valid JSON but not the correct structure");
      return e.preventDefault();
    }

    onUpload(JSON.parse(json));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-4 mt-4">
          Upload JSON structure
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Questionnaire JSON</DialogTitle>
          <DialogDescription>
            Copy and paste the JSON structure of the questionnaire
          </DialogDescription>
          <When isTrue={errorMessage.length > 0}>
            <Small className="text-red-500 pt-4">{errorMessage}</Small>
          </When>
        </DialogHeader>

        <Textarea
          value={json}
          onChange={(e) => setJSON(e.currentTarget.value)}
          className="mt-2 mb-5 min-h-[300px]"
          cols={130}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleUpload(e)
              }
            >
              Upload
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
