import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle, Plus, Minus, Briefcase, Save } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
}

function Experience() {
  const [experinceList, setExperinceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo && setExperinceList(resumeInfo?.Experience)
  }, [])

  const handleChange = (index, event) => {
    const newEntries = experinceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperinceList(newEntries);
  }

  const AddNewExperience = () => {
    setExperinceList([...experinceList, {
      title: '',
      companyName: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      workSummery: '',
    }])
  }

  const RemoveExperience = () => {
    setExperinceList(experinceList => experinceList.slice(0, -1))
  }

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experinceList.slice();
    newEntries[index][name] = e.target.value;
    setExperinceList(newEntries);
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Experience: experinceList
    });
  }, [experinceList]);

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        Experience: experinceList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
      setLoading(false);
      toast('Details updated successfully!', {
        style: {
          background: '#1e293b',
          color: '#fff',
          border: '1px solid #0f172a'
        }
      })
    }, (error) => {
      setLoading(false);
      toast('Failed to update details', {
        style: {
          background: '#1e293b',
          color: '#fff',
          border: '1px solid #0f172a'
        }
      })
    })
  }

  return (
    <div className="">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 shadow-xl rounded-xl border-l-4 border-indigo-500 mt-10 bg-slate-900 text-slate-100"
      >
        <div className="flex items-center mb-6 border-b border-slate-700 pb-4">
          <Briefcase className="text-blue-400 mr-3" size={24} />
          <div>
            <h2 className="font-bold text-xl text-blue-400">Professional Experience</h2>
            <p className="text-slate-400 text-sm mt-1">Add your previous job experience</p>
          </div>
        </div>
        
        <AnimatePresence>
          {experinceList.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-700 p-5 my-5 rounded-lg bg-slate-850 hover:bg-slate-700 transition-all duration-300"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Position Title</label>
                  <Input 
                    name="title" 
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                    className="bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Company Name</label>
                  <Input 
                    name="companyName" 
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                    className="bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">City</label>
                  <Input 
                    name="city" 
                    onChange={(event) => handleChange(index, event)} 
                    defaultValue={item?.city}
                    className="bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">State</label>
                  <Input 
                    name="state" 
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                    className="bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Start Date</label>
                  <Input 
                    type="date"  
                    name="startDate" 
                    onChange={(event) => handleChange(index, event)} 
                    defaultValue={item?.startDate}
                    className="bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">End Date</label>
                  <Input 
                    type="date" 
                    name="endDate" 
                    onChange={(event) => handleChange(index, event)} 
                    defaultValue={item?.endDate}
                    className="bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 mt-2">
                  <label className="text-xs text-slate-400 mb-1 block">Work Summary</label>
                  <div className="bg-slate-900 rounded-lg border border-slate-700 p-1">
                    <RichTextEditor
                      index={index}
                      defaultValue={item?.workSummery}
                      onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)} 
                      className="bg-slate-900 text-slate-200"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={AddNewExperience} 
              className="bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-900 hover:text-blue-100 transition-all duration-300"
            >
              <Plus size={18} className="mr-1" /> Add Experience
            </Button>
            <Button 
              variant="outline" 
              onClick={RemoveExperience} 
              className="bg-transparent border border-red-500 text-red-400 hover:bg-red-900 hover:text-red-100 transition-all duration-300"
              disabled={experinceList.length <= 0}
            >
              <Minus size={18} className="mr-1" /> Remove
            </Button>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              disabled={loading} 
              onClick={() => onSave()}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 w-full sm:w-auto"
            >
              {loading ? 
                <LoaderCircle className="animate-spin mr-2" size={18} /> : 
                <Save className="mr-2" size={18} />} 
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Experience