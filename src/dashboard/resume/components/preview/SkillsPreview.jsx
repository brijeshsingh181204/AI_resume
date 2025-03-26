import React from 'react'
import { useEffect } from 'react'

function SkillsPreview({resumeInfo}) {
  // Add print styles when component mounts
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @media print {
        .skill-bar, .skill-progress {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          display: block !important;
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor
        }}
      >
        Skills
      </h2>
      <hr style={{
        borderColor: resumeInfo?.themeColor
      }} />

      <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className='flex items-center justify-between'>
            <h2 className='text-xs'>{skill.name}</h2>
            <div className='h-2 bg-gray-200 w-[120px] skill-bar'>
              <div className='h-2 skill-progress'
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: `${skill?.rating * 20}%`
                }}
              >
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsPreview