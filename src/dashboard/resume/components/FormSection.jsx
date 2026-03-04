import React, { useState } from "react";
import PersonalDetail from "@/dashboard/components/forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGridIcon } from "lucide-react";
import Summery from "@/dashboard/components/forms/Summery";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div className="space-y-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center">

        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <LayoutGridIcon size={16} />
          Theme
        </Button>

        <div className="flex items-center gap-2">

          {/* BACK BUTTON */}
          {activeFormIndex > 1 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft size={18} />
            </Button>
          )}

          {/* ✅ NEXT BUTTON (Fixed) */}
          <Button
            size="sm"
            disabled={!enableNext}
            onClick={() => {
              setActiveFormIndex(activeFormIndex + 1);
              setEnableNext(false); // reset for next form
            }}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight size={16} />
          </Button>

        </div>
      </div>

      {/* FORM SWITCHING */}
      {/* FORM SWITCHING */}
{activeFormIndex === 1 && (
  <PersonalDetail enableNext={setEnableNext} />
)}
{activeFormIndex === 2 && (
  <Summery enableNext={setEnableNext} />
)}
     

    </div>
  );
}

export default FormSection;