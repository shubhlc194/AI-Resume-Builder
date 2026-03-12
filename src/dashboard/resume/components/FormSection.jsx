import React, { useState } from "react";
import PersonalDetail from "@/dashboard/components/forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Summery from "@/dashboard/components/forms/Summery";
import Experience from "@/dashboard/components/forms/Experience";
import Education from "@/dashboard/components/forms/Education";
import Skill from "@/dashboard/components/forms/Skill";
import { useParams, useNavigate } from "react-router-dom";
import ThemeColor from "@/dashboard/components/ThemeColour";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [nextEnabled, setNextEnabled] = useState(false);
  const { resumeId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">

        <ThemeColor />

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
            disabled={!nextEnabled}
            onClick={() => {
              if (activeFormIndex === 5) {
                navigate(`/my-resume/${resumeId}/view`);
                return;
              }
              setNextEnabled(false);
              setActiveFormIndex(activeFormIndex + 1);
            }}
            className="flex items-center gap-2"
          >
            {activeFormIndex === 5 ? 'Preview' : 'Next'}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      {activeFormIndex === 1 && <PersonalDetail enableNext={(val) => setNextEnabled(val)} />}
      {activeFormIndex === 2 && <Summery enableNext={(val) => setNextEnabled(val)} />}
      {activeFormIndex === 3 && <Experience enableNext={(val) => setNextEnabled(val)} />}
      {activeFormIndex === 4 && <Education enableNext={(val) => setNextEnabled(val)} />}
      {activeFormIndex === 5 && <Skill enableNext={(val) => setNextEnabled(val)} />}
    </div>
  );
}

export default FormSection;