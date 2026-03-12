import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from "../../service/GlobalApi";
import ResumeCardItem from './components/ResumeCardItem';
import { Sparkles, FileText, Clock } from 'lucide-react';

const DashBoard = () => {
  const { user } = useUser();
  const [ResumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) GetResumeList();
  }, [user]);

  const GetResumeList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => setResumeList(resp.data.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-white">

      {/* Hero Header */}
      <div className="bg-white border-b border-purple-100 px-10 md:px-20 lg:px-32 py-10">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Sparkles size={12} />
          AI Powered Resume Builder
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          My Resumes
        </h1>
        <p className="text-gray-400 mt-2 text-base">
          Create and manage your AI-powered resumes
        </p>

        {/* Stats */}
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText size={13} className="text-purple-600" />
            </div>
            <span><strong className="text-gray-800">{ResumeList.length}</strong> Resumes</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock size={13} className="text-purple-600" />
            </div>
            <span>Last edited <strong className="text-gray-800">today</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
              <Sparkles size={13} className="text-purple-600" />
            </div>
            <span>AI <strong className="text-gray-800">enabled</strong></span>
          </div>
        </div>
      </div>

      {/* Resume Grid */}
      <div className="px-10 md:px-20 lg:px-32 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <AddResume refreshData={GetResumeList} />
          {ResumeList.length > 0 &&
            ResumeList.map((resume, index) => (
              <ResumeCardItem resume={resume} key={index} refreshData={GetResumeList} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;