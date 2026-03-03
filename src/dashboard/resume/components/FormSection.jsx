import React, { useState } from "react";
import PersonalDetail from "@/dashboard/components/forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGridIcon } from "lucide-react";

const SummaryForm = () => (
  <div className="p-6 bg-white rounded-xl shadow">Summary Form</div>
);

const ExperienceForm = () => (
  <div className="p-6 bg-white rounded-xl shadow">Experience Form</div>
);

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const[enableNext,setEnableNext]=useState(false);

  return (
    <div className="space-y-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center">

        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <LayoutGridIcon size={16} />
          Theme
        </Button>

        <div className="flex items-center gap-2">

          {activeFormIndex > 1 && (
            <Button
            disabled={!enableNext}
              variant="outline"
              size="icon"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft size={18} />
            </Button>
          )}

          <Button
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight size={16} />
          </Button>

        </div>
      </div>

      {/* FORM SWITCHING */}
      {activeFormIndex === 1 && <PersonalDetail enableNext={(v)=>{
        setEnableNext(v)
      }} />}
      {/* {activeFormIndex === 2 && <SummaryForm />}
      {activeFormIndex === 3 && <ExperienceForm />} */}

    </div>
  );
}

export default FormSection;