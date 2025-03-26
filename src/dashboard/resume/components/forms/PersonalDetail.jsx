import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, User, Briefcase, MapPin, Phone, Mail } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import './PersonalDetail.css'

function PersonalDetail({ enabledNext }) {
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  const [formData, setFormData] = useState()
  const [loading, setLoading] = useState(false)
  const [isFormModified, setIsFormModified] = useState(false)

  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || '',
        lastName: resumeInfo.lastName || '',
        jobTitle: resumeInfo.jobTitle || '',
        address: resumeInfo.address || '',
        phone: resumeInfo.phone || '',
        email: resumeInfo.email || ''
      })
    }
  }, [resumeInfo])

  const handleInputChange = (e) => {
    enabledNext(false)
    setIsFormModified(true)
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
    setResumeInfo({
      ...resumeInfo,
      [name]: value
    })
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      data: formData
    }
    
    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then(
        (resp) => {
          console.log(resp)
          enabledNext(true)
          setLoading(false)
          setIsFormModified(false)
          toast.success("Personal details updated successfully", {
            duration: 3000,
          })
        },
        (error) => {
          setLoading(false)
          toast.error("Failed to update details", {
            duration: 3000,
          })
        }
      )
  }

  return (
    <div className="p-6 shadow-xl rounded-xl border-l-4 border-indigo-500 mt-10 bg-slate-900 text-slate-100">
      <div className="pb-4 border-b border-slate-700">
        <h2 className="text-xl font-bold flex items-center gap-2 text-blue-300">
          <User size={20} className="text-blue-400" />
          Personal Details
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Start building your resume with your basic information
        </p>
      </div>

      <form onSubmit={onSave} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              First Name
            </label>
            <div className="relative">
              <Input
                name="firstName"
                value={formData?.firstName || ''}
                required
                onChange={handleInputChange}
                className="transition-all duration-300 bg-slate-800 border-slate-700 hover:border-blue-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white w-full placeholder-slate-500"
                placeholder="Enter your first name"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              Last Name
            </label>
            <div className="relative">
              <Input
                name="lastName"
                value={formData?.lastName || ''}
                required
                onChange={handleInputChange}
                className="transition-all duration-300 bg-slate-800 border-slate-700 hover:border-blue-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white w-full placeholder-slate-500"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-400" />
              Job Title
            </label>
            <div className="relative">
              <Input
                name="jobTitle"
                value={formData?.jobTitle || ''}
                required
                onChange={handleInputChange}
                className="transition-all duration-300 bg-slate-800 border-slate-700 hover:border-blue-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white w-full placeholder-slate-500"
                placeholder="e.g. Frontend Developer"
              />
            </div>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <MapPin size={16} className="text-blue-400" />
              Address
            </label>
            <div className="relative">
              <Input
                name="address"
                value={formData?.address || ''}
                required
                onChange={handleInputChange}
                className="transition-all duration-300 bg-slate-800 border-slate-700 hover:border-blue-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white w-full placeholder-slate-500"
                placeholder="Enter your address"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Phone size={16} className="text-blue-400" />
              Phone
            </label>
            <div className="relative">
              <Input
                name="phone"
                value={formData?.phone || ''}
                required
                onChange={handleInputChange}
                className="transition-all duration-300 bg-slate-800 border-slate-700 hover:border-blue-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white w-full placeholder-slate-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Mail size={16} className="text-blue-400" />
              Email
            </label>
            <div className="relative">
              <Input
                name="email"
                value={formData?.email || ''}
                required
                onChange={handleInputChange}
                className="transition-all duration-300 bg-slate-800 border-slate-700 hover:border-blue-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white w-full placeholder-slate-500"
                placeholder="Enter your email address"
                type="email"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
        <Button type="submit"
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                    </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail