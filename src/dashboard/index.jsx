import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from "../../service/GlobalApi";
import ResumeCardItem from './components/ResumeCardItem';

const DashBoard = () => {
  const { user } = useUser();
  const [ResumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) GetResumeList();
  }, [user]);

  const GetResumeList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        console.log(resp.data.data);
        setResumeList(resp.data.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI-Resume to Your Next Job Role</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />

        {ResumeList.length > 0 &&
          ResumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} />
          ))}
          
      </div>
    </div>
  ); 
};

export default DashBoard;