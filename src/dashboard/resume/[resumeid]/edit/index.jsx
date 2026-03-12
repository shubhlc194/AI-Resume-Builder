import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";

import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";

function EditResume() {

  const { resumeId } = useParams(); // this is documentId from URL

  const [resumeInfo, setResumeInfo] = useState(null);

  useEffect(() => {
    if (resumeId) {
      getResumeInfo();
    }
  }, [resumeId]);

  const getResumeInfo = () => {

    GlobalApi.GetResumeById(resumeId).then((resp) => {

      const data = resp.data.data[0]; // because we used filter

      console.log("Loaded Resume:", data);

      setResumeInfo(data);

    });

  };

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