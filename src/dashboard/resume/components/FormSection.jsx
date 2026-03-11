import React, { useState } from "react";
import PersonalDetail from "@/dashboard/components/forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGridIcon } from "lucide-react";
import Summery from "@/dashboard/components/forms/Summery";
import Experience from "@/dashboard/components/forms/Experience";
import Education from "@/dashboard/components/forms/Education";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [nextEnabled, setNextEnabled] = useState(false); // ✅ track save state

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <LayoutGridIcon size={16} />
          Theme
        </Button>

        <div className="flex items-center gap-2">
          {activeFormIndex > 1 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft size={18} />
            </Button>
          )}

          <Button
            size="sm"
            disabled={!nextEnabled} // ✅ disabled until saved
            onClick={() => {
              setNextEnabled(false); // ✅ reset for next step
              setActiveFormIndex(activeFormIndex + 1);
            }}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      {activeFormIndex === 1 && (
        <PersonalDetail enableNext={(val) => setNextEnabled(val)} />
      )}
      {activeFormIndex === 2 && (
        <Summery enableNext={(val) => setNextEnabled(val)} />
      )}
      {activeFormIndex === 3 && (
        <Experience enableNext={(val) => setNextEnabled(val)} />
      )}
      {activeFormIndex === 4 && (
        <Education enableNext={(val) => setNextEnabled(val)} />
      )}
    </div>
  );
}

export default FormSection;