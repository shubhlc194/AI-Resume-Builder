import React from "react";

function SkillsPreview({ resumeInfo }) {
  if (!resumeInfo?.skills?.length) return null;

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2 uppercase tracking-wide"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>

      <hr
        className="border-t-2 mb-3"
        style={{ borderColor: resumeInfo?.themeColor }}
      />

      <div className="grid grid-cols-2 gap-4 mt-4">
        {resumeInfo.skills.map((skill, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span>{skill.name}</span>
              <span>{skill.rating * 20}%</span> {/* ✅ 0-5 → 0-100% */}
            </div>

            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 rounded transition-all duration-500"
                style={{
                  width: `${skill.rating * 20}%`, // ✅ 0-5 → 0-100%
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