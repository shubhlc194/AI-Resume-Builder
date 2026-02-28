import React from "react";

function SkillsPreview({ resumeInfo }) {
  if (!resumeInfo?.skills?.length) return null;

  return (
    <div className="my-6">
      {/* TITLE */}
      <h2
        className="text-center font-bold text-sm mb-2 uppercase tracking-wide"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>

      {/* DIVIDER */}
      <hr
        className="border-t-2 mb-3"
        style={{ borderColor: resumeInfo?.themeColor }}
      />

      {/* SKILLS */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {resumeInfo.skills.map((skill, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span>{skill.name}</span>
              <span>{skill.rating}%</span>
            </div>

            {/* progress bar */}
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 rounded transition-all duration-500"
                style={{
                  width: skill.rating + "%",
                  backgroundColor: resumeInfo.themeColor,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;