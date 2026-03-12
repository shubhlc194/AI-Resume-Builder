import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import PersonalDetailPreview from "@/dashboard/components/preview/PersonalDetailPreview";
import SummaryPreview from "@/dashboard/components/preview/SummaryPreview";
import ProfessionalExperiencePreview from "@/dashboard/components/preview/ProfessionalExperiencePreview";
import EducationalPreview from "@/dashboard/components/preview/EducationalPreview";
import SkillPreview from "@/dashboard/components/preview/SkillPreview";

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      id="resume-preview"
      className="shadow-lg bg-white border-t-[20px] w-full"
      style={{
        borderColor: resumeInfo?.themeColor,
        minHeight: '297mm',
        padding: '10mm 14mm',
        boxSizing: 'border-box',
        fontSize: '12px',
      }}
    >
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo} />
      <ProfessionalExperiencePreview resumeInfo={resumeInfo} />
      <EducationalPreview resumeInfo={resumeInfo} />
      <SkillPreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;