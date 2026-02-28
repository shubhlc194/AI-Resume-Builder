import React from "react";

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div>
      {/* NAME */}
      <h2
        className="font-bold text-xl text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>

      {/* JOB TITLE */}
      <h2
        className="text-center text-sm font-medium"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.jobTitle}
      </h2>

      {/* ADDRESS */}
      <h2
        className="text-center font-normal text-xs"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.address}
      </h2>

      {/* PHONE & EMAIL */}
      <div
        className="flex justify-between text-xs mt-1"
        style={{ color: resumeInfo?.themeColor }}
      >
        <h2>{resumeInfo?.phone}</h2>
        <h2>{resumeInfo?.email}</h2>
      </div>

      {/* DIVIDER */}
      <hr
        className="my-2 border-t-2"
        style={{ borderColor: resumeInfo?.themeColor }}
      />
    </div>
  );
}

export default PersonalDetailPreview;