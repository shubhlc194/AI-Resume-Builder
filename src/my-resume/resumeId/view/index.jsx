import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState()
  const { resumeId } = useParams()

  useEffect(() => {
    GetResumeInfo()
  }, [])

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      setResumeInfo(resp.data.data[0])
    })
  }

  const handleDownload = () => {
    window.print()
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { margin: 0; padding: 0; }
          #resume-preview { box-shadow: none !important; }
        }
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>

      <div className='no-print'>
        <Header />
      </div>

      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>

        <div className='no-print'>
          <h2 className='text-center text-2xl font-medium'>
            Congrats! Your Ultimate AI-Generated Resume is Ready 🎉
          </h2>
          <p className='text-center text-gray-400 mt-2'>
            Now you are ready to download your resume and share the unique URL with friends and recruiters
          </p>

          <div className='flex justify-center gap-6 my-8'>
            <Button
              onClick={handleDownload}
              className='bg-purple-600 hover:bg-purple-700 text-white px-6'
            >
              Download PDF
            </Button>

            <RWebShare
              data={{
                text: `Check out ${resumeInfo?.firstName} ${resumeInfo?.lastName}'s Resume`,
                url: window.location.href,
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} - Resume`,
              }}
              onClick={() => console.log("Shared successfully!")}
            >
              <Button
                variant="outline"
                className='border-purple-400 text-purple-600 hover:bg-purple-50 px-6'
              >
                Share Link 🔗
              </Button>
            </RWebShare>

          </div>
        </div>

        <div id="resume-preview">
          <ResumePreview />
        </div>

      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume