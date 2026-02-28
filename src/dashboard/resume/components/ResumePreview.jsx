import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import PersonalDetailPreview from "@/dashboard/components/preview/PersonalDetailPreview";
import SummaryPreview from "@/dashboard/components/preview/SummaryPreview";
import ProfessionalExperiencePreview from "@/dashboard/components/preview/ProfessionalExperiencePreview";
import EducationalPreview from "@/dashboard/components/preview/EducationalPreview";
import SkillPreview from "@/dashboard/components/preview/SkillPreview";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px] bg-white"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* personal details */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo}/>
      <ProfessionalExperiencePreview resumeInfo={resumeInfo}/>
      <EducationalPreview resumeInfo={resumeInfo}/>
      <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  );
}

export default ResumePreview;