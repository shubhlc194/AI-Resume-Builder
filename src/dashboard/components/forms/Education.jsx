import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useState } from 'react';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

const emptyEntry = {
  UniversityName: '',
  degree: '',
  Major: '',
  startDate: '',
  endDate: '',
  Description: '',
}

export default function Education({ enableNext }) {
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()

  const [educationalList, setEducationalList] = useState([{ ...emptyEntry }])

  const handleChange = (e, index) => {
    const { name, value } = e.target
    const newList = [...educationalList]
    newList[index] = { ...newList[index], [name]: value }
    setEducationalList(newList)
    setResumeInfo({ ...resumeInfo, education: newList })
    enableNext(false)
  }

  const addEntry = () =>
    setEducationalList([...educationalList, { ...emptyEntry }]) // ✅ consistent

  const removeEntry = (index) => {
    const newList = educationalList.filter((_, i) => i !== index)
    setEducationalList(newList)
    setResumeInfo({ ...resumeInfo, education: newList })
    enableNext(false)
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest) // ✅ lowercase
      }
    }
    GlobalApi.updateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        setLoading(false)
        enableNext(true)
        toast.success('Education saved!')
      },
      (error) => {
        setLoading(false)
        enableNext(false)
        console.log("Error:", error?.response?.data?.error)
        toast.error('Failed to save')
      }
    )
  }

  const fields = [
    { label: 'University Name', name: 'UniversityName', type: 'text',  colSpan: 2 },
    { label: 'Degree',          name: 'degree',         type: 'text',  colSpan: 1 },
    { label: 'Major',           name: 'Major',          type: 'text',  colSpan: 1 },
    { label: 'Start Date',      name: 'startDate',      type: 'month', colSpan: 1 },
    { label: 'End Date',        name: 'endDate',        type: 'month', colSpan: 1 },
  ]

  return (
    <div className="bg-white rounded-xl shadow-md border-t-4 border-purple-500 p-6 mt-6 hover:shadow-lg transition">
      <h2 className="font-semibold text-lg text-gray-800">Education</h2>
      <p className="text-sm text-gray-500 mt-1">Add Your Educational Details</p>

      <div className="mt-4 space-y-6">
        {educationalList.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
            {educationalList.length > 1 && (
              <button
                onClick={() => removeEntry(index)}
                className="absolute top-3 right-3 text-xs text-red-400 hover:text-red-600"
              >
                Remove
              </button>
            )}
            <div className="grid grid-cols-2 gap-4">
              {fields.map(({ label, name, type, colSpan }) => (
                <div key={name} className={colSpan === 2 ? 'col-span-2' : 'col-span-1'}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={item[name]}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea
                  name="Description"
                  value={item.Description}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Describe your studies, achievements, activities..."
                  className="w-full text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-between mt-4'>
        <button type='button' onClick={addEntry}
          className='text-purple-600 border border-purple-400 px-4 py-1 rounded text-sm hover:bg-purple-50'>
          + Add Another Education
        </button>
        <button type='button' onClick={onSave} disabled={loading}
          className='bg-purple-600 text-white px-4 py-1 rounded text-sm hover:bg-purple-700 flex items-center gap-2'>
          {loading ? <LoaderCircle className='animate-spin h-4 w-4' /> : 'Save'}
        </button>
      </div>
    </div>
  )
}