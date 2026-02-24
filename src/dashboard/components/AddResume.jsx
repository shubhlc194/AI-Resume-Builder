import { PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
console.log(import.meta.env.VITE_STRAPI_API_KEY);
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();

 const onCreate = () => {
  const data = {
    data: {
      title: resumeTitle,
      Resumeid: uuidv4(),   // ⚠️ exact match
      userEmail: user?.primaryEmailAddress?.emailAddress,
      UserName: user?.fullName,  // ⚠️ exact match
    },
  };

  GlobalApi.CreateNewResume(data)
    .then((resp) => {
      console.log("SUCCESS:", resp.data);
      setOpenDialog(false);
      setResumeTitle("");
    })
    .catch((err) => {
      console.log(err.response?.data);
    });
};
  return (
    <div>
      <div
        className="p-14 py-24 border items-center justify-center bg-secondary
        rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed flex"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare size={40} />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>

            <DialogDescription className="space-y-3 pt-2">
              <p className="text-sm text-muted-foreground">
                Add a title for your new resume
              </p>

              <Input
                placeholder="e.g. Software Engineer Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>

              <Button disabled={!resumeTitle} onClick={onCreate}>
                Create Resume
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;