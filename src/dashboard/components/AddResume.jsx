import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";

function AddResume({ refreshData }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const onCreate = async () => {
    if (!resumeTitle.trim()) return;

    setLoading(true);

    const data = {
      data: {
        title: resumeTitle.trim(),
        Resumeid: uuidv4(),
        userEmail: user?.primaryEmailAddress?.emailAddress,
        UserName: user?.fullName,
      },
    };

    try {
      const resp = await GlobalApi.CreateNewResume(data);
      console.log("SUCCESS:", resp.data);

      setOpenDialog(false);
      setResumeTitle("");
      refreshData && refreshData(); // reload dashboard
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ADD CARD */}
      <div
        onClick={() => setOpenDialog(true)}
        className="
          w-[220px] h-[280px]
          rounded-2xl
          border-2 border-dashed border-gray-300
          bg-gray-50
          flex items-center justify-center
          cursor-pointer
          transition-all duration-300
          hover:scale-[1.03]
          hover:border-indigo-400
          hover:bg-indigo-50
          hover:shadow-md
        "
      >
        <Plus size={44} className="text-gray-500 hover:text-indigo-500 transition" />
      </div>

      {/* MODAL */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>

            <DialogDescription className="space-y-3 pt-2">
              <p className="text-sm text-muted-foreground">
                Give your resume a title
              </p>

              <Input
                placeholder="e.g. Software Engineer Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                autoFocus
              />
            </DialogDescription>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="ghost"
                onClick={() => setOpenDialog(false)}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button
                disabled={!resumeTitle.trim() || loading}
                onClick={onCreate}
              >
                {loading ? "Creating..." : "Create Resume"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;