import RichTextEditor from '@/components/RichTextEditor'
import React, { useContext, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

const formfield = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: ''
}

function Experience() {
  const [experienceList, setExperienceList] = useState([formfield])
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false)
  const params = useParams()

  const handleChange = (index, e) => {
    const { name, value } = e.target
    const newList = [...experienceList]
    newList[index] = {
      ...newList[index],
      [name]: value
    }
    setExperienceList(newList)
    setResumeInfo({
      ...resumeInfo,
      experience: newList
    })
  }

  const handleRichTextEditor = (value, name, index) => {
    const newList = [...experienceList]
    newList[index] = {
      ...newList[index],
      [name]: value
    }
    setExperienceList(newList)
    setResumeInfo({
      ...resumeInfo,
      experience: newList
    })
  }

  const addNewExperience = () => {
    setExperienceList([...experienceList, { ...formfield }])
  }

  const removeExperience = (index) => {
    const newList = experienceList.filter((_, i) => i !== index)
    setExperienceList(newList)
    setResumeInfo({
      ...resumeInfo,
      experience: newList
    })
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest)
      }
    }
    GlobalApi.updateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        setLoading(false)
        toast.success('Experience saved!')
      },
      (error) => {
        setLoading(false)
        toast.error('Failed to save')
      }
    )
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md border-t-4 border-purple-500 p-6 mt-6 hover:shadow-lg transition">
        <h2 className="font-semibold text-lg text-gray-800">Professional Experience</h2>
        <p className="text-sm text-gray-500 mt-1">Add Your Previous Job Experience</p>

        {experienceList.map((item, index) => (
          <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>

            <div>
              <label className='mt-2 text-xs'>Position Title</label>
              <input
                className='w-full border rounded p-1 text-sm mt-1'
                name='title'
                value={item.title}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className='mt-2 text-xs'>Company Name</label>
              <input
                className='w-full border rounded p-1 text-sm mt-1'
                name='companyName'
                value={item.companyName}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className='mt-2 text-xs'>City</label>
              <input
                className='w-full border rounded p-1 text-sm mt-1'
                name='city'
                value={item.city}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className='mt-2 text-xs'>State</label>
              <input
                className='w-full border rounded p-1 text-sm mt-1'
                name='state'
                value={item.state}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className='mt-2 text-xs'>Start Date</label>
              <input
                type='date'
                className='w-full border rounded p-1 text-sm mt-1'
                name='startDate'
                value={item.startDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div>
              <label className='mt-2 text-xs'>End Date</label>
              <input
                type='date'
                className='w-full border rounded p-1 text-sm mt-1'
                name='endDate'
                value={item.endDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>

            <div className='col-span-2'>
              {/* ✅ positionTitle prop added */}
              <RichTextEditor
                index={index}
                defaultValue={item?.workSummery}
                positionTitle={item?.title}
                onRichTextEditorChange={(value) =>
                  handleRichTextEditor(value, 'workSummery', index)
                }
              />
            </div>

            <div className='col-span-2 flex justify-end'>
              <button
                type='button'
                onClick={() => removeExperience(index)}
                className='text-red-500 text-sm border border-red-400 px-3 py-1 rounded hover:bg-red-50'
              >
                Remove
              </button>
            </div>

          </div>
        ))}

        <div className='flex justify-between mt-4'>
          <button
            type='button'
            onClick={addNewExperience}
            className='text-purple-600 border border-purple-400 px-4 py-1 rounded text-sm hover:bg-purple-50'
          >
            + Add More Experience
          </button>

          <button
            type='button'
            onClick={onSave}
            disabled={loading}
            className='bg-purple-600 text-white px-4 py-1 rounded text-sm hover:bg-purple-700 flex items-center gap-2'
          >
            {loading ? <LoaderCircle className='animate-spin h-4 w-4' /> : 'Save'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Experience