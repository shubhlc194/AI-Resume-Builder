import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";

import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";

function EditResume() {
  const params = useParams();

  // ✅ correct state
  const [resumeInfo, setResumeInfo] = useState(dummy);

  useEffect(() => {
    // later you will load resume using params.resumeid
    console.log("Resume ID:", params.resumeid);
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-14">

        {/* LEFT */}
        <FormSection />

        {/* RIGHT */}
        <ResumePreview />

      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;