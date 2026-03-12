import { Input } from '@/components/ui/input';
import React, { useContext, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

function Skill({ enableNext }) {
  const [skillList, setSkillList] = useState([{ name: '', rating: 0 }])
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()

  const handleChange = (index, name, value) => {
    const newList = [...skillList]
    newList[index] = { ...newList[index], [name]: value }
    setSkillList(newList)
    setResumeInfo({ ...resumeInfo, skills: newList })
    enableNext(false) // ✅ re-lock on edit
  }

  const addSkill = () => setSkillList([...skillList, { name: '', rating: 0 }])

  const removeSkill = (index) => {
    const newList = skillList.filter((_, i) => i !== index)
    setSkillList(newList)
    setResumeInfo({ ...resumeInfo, skills: newList })
    enableNext(false)
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        skills: skillList.map(({ id, ...rest }) => rest)
      }
    }
    GlobalApi.updateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        setLoading(false)
        enableNext(true) // ✅ unlock on success
        toast.success('Skills saved!')
      },
      (error) => {
        setLoading(false)
        enableNext(false)
        console.log("Error:", error?.response?.data?.error)
        toast.error('Failed to save')
      }
    )
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md border-t-4 border-purple-500 p-6 mt-6 hover:shadow-lg transition">
        <h2 className="font-semibold text-lg text-gray-800">Skills</h2>
        <p className="text-sm text-gray-500 mt-1">Add Your Top Professional Skills</p>

        <div className='mt-4 space-y-3'>
          {skillList.map((item, index) => (
            <div key={index} className='flex items-center gap-4 border p-3 rounded-lg'>
              <div className='flex-1'>
                <label className='text-xs'>Name</label>
                <Input
                  value={item.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)} // ✅ onChange fix
                />
              </div>

              <div>
                <label className='text-xs block mb-1'>Rating</label>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={item.rating}          // ✅ item.rating use karo
                  onChange={(val) => handleChange(index, 'rating', val)} // ✅ per-item rating
                />
              </div>

              {skillList.length > 1 && (
                <button
                  onClick={() => removeSkill(index)}
                  className='text-red-400 text-xs hover:text-red-600 mt-4'
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div className='flex justify-between mt-4'>
          <button
            onClick={addSkill}
            className='text-purple-600 border border-purple-400 px-4 py-1 rounded text-sm hover:bg-purple-50'
          >
            + Add Skill
          </button>

          <button
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

export default Skill