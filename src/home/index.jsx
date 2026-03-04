import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, FileText, LayoutTemplate } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 pt-20 text-center">

        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Build Your Resume with{" "}
          <span className="text-indigo-600">AI Power</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Create ATS-friendly resumes in minutes using intelligent AI suggestions,
          modern templates, and real-time editing.
        </p>

        {/* ✅ Only Get Started Button */}
        <div className="mt-10 flex justify-center">
          <Link to="/dashboard">
            <button className="px-10 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg">
              Get Started
            </button>
          </Link>
        </div>

        {/* HERO IMAGE PLACEHOLDER */}
        <div className="mt-16">
          <div className="h-64 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 shadow-inner flex items-center justify-center text-indigo-700 font-semibold">
            Resume Preview Area
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8 text-center">

        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
          <Sparkles className="mx-auto text-indigo-600" size={36} />
          <h3 className="mt-4 font-semibold text-lg">AI Content Assistant</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Generate professional bullet points and improve wording instantly.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
          <FileText className="mx-auto text-indigo-600" size={36} />
          <h3 className="mt-4 font-semibold text-lg">ATS Optimized</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Ensure your resume passes applicant tracking systems easily.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
          <LayoutTemplate className="mx-auto text-indigo-600" size={36} />
          <h3 className="mt-4 font-semibold text-lg">Modern Templates</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Choose from clean, recruiter-approved resume layouts.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Home;