import React from "react";

function SkillsPreview({ resumeInfo }) {
  // ✅ Dono handle karo — lowercase aur capital
  const skills = resumeInfo?.skills || resumeInfo?.Skills || [];
  
  if (!skills.length) return null;

  const getRatingPercent = (rating) => {
    if (!rating) return 0;
    return rating > 5 ? Math.min(rating, 100) : rating * 20;
  };

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
        {skills.map((skill, index) => ( // ✅ skills variable use karo
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span>{skill.name}</span>
              <span>{getRatingPercent(skill.rating)}%</span>
            </div>

            <div className="h-2 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-2 rounded transition-all duration-500"
                style={{
                  width: `${getRatingPercent(skill.rating)}%`,
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