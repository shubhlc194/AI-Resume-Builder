import React from 'react'

function ProfessionalExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeInfo?.themeColor
        }}
        >Professional Experience</h2>
    
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }}/>
    {resumeInfo?.experience.map((experience, index) => (
      <div key={index} className='my-5'>
        <h2 className='text-sm font-bold'>{experience?.title}</h2>
        <h2 className='text-xs flex justify-between'>{experience?.companyName}
            ,{experience?.state}
            {experience?.city},
            <span>{experience?.startDate},{experience?.currentlyWorking?"present":experience?.endDate}</span>
            
            </h2>
            <p className='text-xs my-2'>{experience?.workSummery}</p>
      </div>
    ))}
    </div>
  )
}

export default ProfessionalExperiencePreview
