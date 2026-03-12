import { Plus, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle,
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
      await GlobalApi.CreateNewResume(data);
      setOpenDialog(false);
      setResumeTitle("");
      refreshData && refreshData();
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Add Card */}
      <div
        onClick={() => setOpenDialog(true)}
        className="
          group cursor-pointer
          w-full aspect-[3/4]
          rounded-2xl
          border-2 border-dashed border-purple-200
          bg-white
          flex flex-col items-center justify-center gap-3
          transition-all duration-300
          hover:border-purple-400
          hover:bg-purple-50/50
          hover:shadow-lg
          hover:-translate-y-1
        "
      >
        <div className="w-12 h-12 rounded-2xl bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <Plus size={24} className="text-purple-600" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-purple-600">New Resume</p>
          <p className="text-xs text-gray-400 mt-0.5">Start from scratch</p>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Sparkles size={18} className="text-purple-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold">Create New Resume</DialogTitle>
                <DialogDescription className="text-xs text-gray-400">
                  AI will help you build it
                </DialogDescription>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-sm font-medium text-gray-700">Resume Title</label>
              <Input
                placeholder="e.g. Software Engineer Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onCreate()}
                autoFocus
                className="rounded-xl border-purple-200 focus:ring-purple-400"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <Button variant="ghost" onClick={() => setOpenDialog(false)} disabled={loading}
                className="rounded-xl">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle.trim() || loading}
                onClick={onCreate}
                className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles size={14} />
                    Create Resume
                  </span>
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;