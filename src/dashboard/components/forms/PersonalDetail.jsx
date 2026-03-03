import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";

function PersonalDetail({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Params:", params);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    enableNext(false);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setResumeInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        data: formData,
      };

      const resp = await GlobalApi.updateResumeDetail(
        params.resumeId,
        data
      );

      console.log("Updated:", resp);

      enableNext(true);
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border-t-4 border-purple-500 p-6 mt-6 hover:shadow-lg transition">
      <h2 className="font-semibold text-lg text-gray-800">
        Personal Detail
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Get started with the basic information
      </p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" onChange={handleInput} />
          </div>

          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" onChange={handleInput} />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" onChange={handleInput} />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" onChange={handleInput} />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" onChange={handleInput} />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <Input name="email" onChange={handleInput} />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;