import React, { useContext, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import GlobalApi from '../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Palette } from 'lucide-react'

const colors = [
  // Classic & Professional
  "#000000", "#1F2937", "#374151", "#4B5563", "#6B7280",
  // Navy & Blue tones
  "#1E3A5F", "#1E40AF", "#2563EB", "#3B82F6", "#60A5FA",
  // Green tones
  "#14532D", "#15803D", "#16A34A", "#22C55E", "#4ADE80",
  // Purple tones
  "#3B0764", "#6D28D9", "#7C3AED", "#8B5CF6", "#A78BFA",
  // Warm tones
  "#7C2D12", "#B45309", "#B91C1C", "#DC2626", "#EA580C",
]
function ThemeColor() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || colors[0])
  const [loading, setLoading] = useState(false)
  const { resumeId } = useParams()

  const handleColorSelect = (color) => {
    setSelectedColor(color)
    setResumeInfo({ ...resumeInfo, themeColor: color })
    setLoading(true)
    GlobalApi.updateResumeDetail(resumeId, {
      data: { themeColor: color }
    }).then(() => {
      setLoading(false)
      toast.success('Theme color updated!')
    }).catch(() => {
      setLoading(false)
      toast.error('Failed to update color')
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-300 hover:bg-purple-50 transition text-sm font-medium text-purple-700"
        >
          <div
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: selectedColor }}
          />
          <Palette size={15} />
          Theme
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => handleColorSelect(color)}
              className="w-8 h-8 rounded-full cursor-pointer border-2 transition-all hover:scale-110"
              style={{
                backgroundColor: color,
                borderColor: selectedColor === color ? '#7c3aed' : 'transparent'
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeColor