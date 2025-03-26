import React, { useContext, useState, useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Palette, Check } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

function ThemeColor() {
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
    "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#e3a50b",
    "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
  ]

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || colors[0]);
  const { resumeId } = useParams();

  useEffect(() => {
    // Ensure the initial color is set in the context
    if (!resumeInfo?.themeColor) {
      setResumeInfo({
        ...resumeInfo,
        themeColor: colors[0]
      });
    }
  }, []);

  const onColorSelect = (color) => {
    setSelectedColor(color)
    setResumeInfo({
      ...resumeInfo,
      themeColor: color
    });

    const data = {
      data: {
        themeColor: color
      }
    }

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then(resp => {
        toast.success('Theme Color Updated', {
          description: `Changed to ${color}`,
          icon: <Palette className='text-white' />
        })
      })
      .catch(error => {
        toast.error('Failed to update theme color', {
          description: 'Please try again'
        })
      })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex gap-2  transition-colors duration-300"
        > 
          <Palette className='w-4 h-4' /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-gray-700 shadow-xl rounded-lg p-4'>
        <h2 className='mb-3 text-sm font-semibold text-gray-200'>Select Theme Color</h2>
        <div className='grid grid-cols-5 gap-3'>
          <AnimatePresence>
            {colors.map((color, index) => (
              <motion.div
                key={color}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.2,
                  delay: index * 0.05 
                }}
                onClick={() => onColorSelect(color)}
                className={`
                  h-6 w-6 rounded-full cursor-pointer 
                  hover:scale-110 transition-all duration-300
                  flex items-center justify-center
                  ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : 'hover:ring-1 hover:ring-gray-300'}
                `}
                style={{
                  background: color
                }}
              >
                {selectedColor === color && (
                  <Check className='text-white w-4 h-4' />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeColor