import React, { useContext } from "react";
import dummy from "@/data/dummy";
import PersonalDetail from "@/dashboard/components/forms/PersonalDetail";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

function FormSection() {
  const [resumeInfo,setResumeinfo]=useContext(ResumeInfoContext)
  return (
    <div>
      <PersonalDetail/>
    </div>
  );
}

export default FormSection;