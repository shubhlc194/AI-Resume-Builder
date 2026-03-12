import { FileText, Pencil, Trash2, Eye, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../../../service/GlobalApi";
import { toast } from "sonner";

const ResumeCardItem = ({ resume, refreshData }) => {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return
    try {
      await GlobalApi.DeleteResume(resume.documentId)
      toast.success("Resume deleted!")
      refreshData()
    } catch (err) {
      toast.error("Failed to delete")
    }
  }

  return (
    <div
      className="group relative flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card */}
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className="
          w-full aspect-[3/4]
          rounded-2xl
          bg-gradient-to-br from-purple-50 to-violet-100
          border border-purple-100
          shadow-sm
          flex flex-col items-center justify-center gap-3
          transition-all duration-300
          group-hover:shadow-xl
          group-hover:-translate-y-2
          group-hover:border-purple-300
          overflow-hidden
          relative
        ">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <FileText size={26} className="text-purple-500" />
          </div>

          <div className="text-center px-3">
            <p className="text-xs font-semibold text-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Click to edit
            </p>
          </div>
        </div>
      </Link>

      {/* Title + Dropdown */}
      <div className="mt-3 px-1 flex items-center justify-between">
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-gray-700 truncate group-hover:text-purple-600 transition">
            {resume.title || 'Untitled'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Resume</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-lg hover:bg-purple-50 transition">
              <MoreVertical size={16} className="text-gray-400 hover:text-purple-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}
              className="gap-2 cursor-pointer"
            >
              <Pencil size={14} /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
              className="gap-2 cursor-pointer"
            >
              <Eye size={14} /> View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="gap-2 cursor-pointer text-red-500 focus:text-red-500"
            >
              <Trash2 size={14} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default ResumeCardItem