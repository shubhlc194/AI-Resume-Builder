import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ResumeCardItem = ({ resume }) => {
  return (
    <Link to={`/resume/${resume.id}`}>
      <div className="flex flex-col items-center group cursor-pointer">

        {/* CARD */}
        <div className="
          w-[220px] h-[280px]
          rounded-2xl
          bg-white
          border border-gray-200
          shadow-sm
          flex items-center justify-center
          transition-all duration-300
          group-hover:shadow-xl
          group-hover:-translate-y-2
          group-hover:border-indigo-300
        ">
          <Notebook
            size={46}
            className="text-gray-500 group-hover:text-indigo-500 transition"
          />
        </div>

        {/* TITLE */}
        <p className="
          mt-3
          text-sm
          font-medium
          text-gray-700
          text-center
          w-[220px]
          truncate
          group-hover:text-indigo-600
          transition
        ">
          {resume.title}
        </p>

      </div>
    </Link>
  );
};

export default ResumeCardItem;