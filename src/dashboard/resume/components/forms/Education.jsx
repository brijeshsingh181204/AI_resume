import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, GraduationCap, Plus, Minus, Save } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ])

  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.education)
  }, [])

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  }

  const AddNewEducation = () => {
    setEducationalList([...educationalList,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ])
  }

  const RemoveEducation = () => {
    setEducationalList(educationalList => educationalList.slice(0, -1))
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(resp => {
      console.log(resp);
      setLoading(false)
      toast('Details updated successfully!', {
        style: {
          background: '#1e293b',
          color: '#ffffff',
          border: '1px solid #334155'
        },
      })
    }, (error) => {
      setLoading(false);
      toast('Server Error, Please try again!', {
        style: {
          background: '#1e293b',
          color: '#ff5757',
          border: '1px solid #334155'
        },
      })
    })
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList
    })
  }, [educationalList])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='p-6 shadow-xl rounded-xl border-l-4 border-indigo-500 mt-10 bg-slate-900 text-slate-100'
    >
      <div className="flex items-center gap-3 mb-4">
        <GraduationCap className="text-indigo-400 h-6 w-6" />
        <div>
          <h2 className='font-bold text-xl text-white'>Education</h2>
          <p className='text-slate-400 text-sm'>Add your educational background</p>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {educationalList.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className='grid grid-cols-2 gap-4 border border-slate-700 p-4 my-5 rounded-lg bg-slate-800'
                whileHover={{ boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)' }}
              >
                <div className='col-span-2'>
                  <label className="block text-sm font-medium text-slate-300 mb-1">University Name</label>
                  <Input
                    name="universityName"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.universityName}
                    className="bg-slate-700 border-slate-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Degree</label>
                  <Input
                    name="degree"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.degree}
                    className="bg-slate-700 border-slate-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Major</label>
                  <Input
                    name="major"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.major}
                    className="bg-slate-700 border-slate-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.startDate}
                    className="bg-slate-700 border-slate-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.endDate}
                    className="bg-slate-700 border-slate-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className='col-span-2'>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                  <Textarea
                    name="description"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.description}
                    className="bg-slate-700 border-slate-600 text-white focus:border-indigo-500 focus:ring-indigo-500 min-h-24"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className='flex justify-between mt-6'>
        <div className='flex gap-3'>
          <Button 
            variant="outline" 
            onClick={AddNewEducation} 
            className="bg-slate-800 text-indigo-400 border-slate-700 hover:bg-slate-700 hover:text-indigo-300 transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Education
          </Button>
          <Button 
            variant="outline" 
            onClick={RemoveEducation} 
            className="bg-slate-800 text-indigo-400 border-slate-700 hover:bg-slate-700 hover:text-indigo-300 transition-all duration-300"
            disabled={educationalList.length <= 1}
          >
            <Minus className="h-4 w-4 mr-2" /> Remove
          </Button>
        </div>
        <Button 
          disabled={loading} 
          onClick={onSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300"
        >
          {loading ? 
            <div className="flex items-center">
              <LoaderCircle className='animate-spin mr-2 h-4 w-4' />
              <span>Saving...</span>
            </div> 
            : 
            <div className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              <span>Save</span>
            </div>
          }
        </Button>
      </div>
    </motion.div>
  )
}

export default Education