import { FileText, Pencil, Trash2, Eye } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResumeCardItem = ({ resume, refreshData }) => {
  const [hovered, setHovered] = useState(false);

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
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <FileText size={26} className="text-purple-500" />
          </div>

          <div className="text-center px-3">
            <p className="text-xs font-semibold text-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Click to edit
            </p>
          </div>

          {/* Hover overlay actions */}
          <div className="absolute bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="w-8 h-8 bg-white rounded-xl shadow flex items-center justify-center hover:bg-purple-50">
              <Pencil size={13} className="text-purple-600" />
            </div>
            <div className="w-8 h-8 bg-white rounded-xl shadow flex items-center justify-center hover:bg-purple-50">
              <Eye size={13} className="text-purple-600" />
            </div>
          </div>
        </div>
      </Link>

      {/* Title */}
      <div className="mt-3 px-1">
        <p className="text-sm font-semibold text-gray-700 truncate group-hover:text-purple-600 transition">
          {resume.title || 'Untitled'}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">Resume</p>
      </div>
    </div>
  );
};

export default ResumeCardItem;