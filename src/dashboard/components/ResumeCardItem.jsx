import { Loader2Icon, MoreVertical, Notebook, FileEdit, Eye, Download, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      toast('Resume Deleted!', {
        description: 'Your resume has been permanently removed',
        icon: <Trash2 className="h-4 w-4" />,
      });
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      toast('Failed to delete resume', {
        description: 'Please try again later',
        variant: 'destructive',
      });
      setLoading(false);
    });
  };

  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <motion.div 
          className="p-8 rounded-t-lg flex items-center justify-center h-[280px] overflow-hidden relative"
          style={{ 
            background: `linear-gradient(135deg, ${resume?.themeColor || '#6366F1'} 0%, ${lightenColor(resume?.themeColor || '#6366F1', 70)} 100%)`,
          }}
        >
          <motion.div
            animate={{ 
              y: isHovered ? -10 : 0,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: isHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative shadow-2xl rounded-md bg-white p-4"
            >
              <img src="/cv.png" width={100} height={100} alt="Resume template" className="mb-2" />
              <motion.div 
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                style={{ backgroundColor: resume?.themeColor || '#6366F1' }}
                animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatType: "loop" }}
              />
            </motion.div>
            <p className="mt-4 text-white font-medium text-sm opacity-80">Last updated: {formatDate(resume?.updatedAt || new Date())}</p>
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0"
            animate={{ opacity: isHovered ? 0.3 : 0 }}
          />
        </motion.div>
      </Link>

      <motion.div 
        className="border p-4 flex justify-between items-center rounded-b-lg shadow-lg backdrop-blur-sm"
        style={{ 
          background: resume?.themeColor || '#6366F1',
          color: getContrastColor(resume?.themeColor || '#6366F1')
        }}
        whileHover={{ y: 0 }}
      >
        <h2 className="font-medium truncate flex-1">{resume.title}</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <motion.div 
                whileHover={{ rotate: 90 }} 
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MoreVertical className="h-5 w-5 cursor-pointer" />
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem 
                onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}
                className="flex items-center gap-2"
              >
                <FileEdit className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" /> View
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setOpenAlert(true)}
                className="text-red-500 flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500 flex items-center gap-2">
              <Trash2 className="h-5 w-5" /> Delete Resume
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setOpenAlert(false)}
              className="transition-all duration-200 hover:bg-gray-100"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={onDelete} 
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Deleting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </div>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

// Helper functions
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric' 
  }).format(new Date(date));
}

function lightenColor(color, percent) {
  // Default fallback color if parsing fails
  if (!color || typeof color !== 'string') return '#A5B4FC';
  
  try {
    // Convert hex to RGB
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    
    // Lighten
    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } catch (e) {
    return '#A5B4FC'; // Return a default light purple if parsing fails
  }
}

function getContrastColor(hexColor) {
  // Default to white text if parsing fails
  if (!hexColor || typeof hexColor !== 'string') return '#FFFFFF';
  
  try {
    // Convert hex to RGB
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    
    // Calculate luminance - standard formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black or white depending on luminance
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  } catch (e) {
    return '#FFFFFF'; // Default to white text if parsing fails
  }
}

export default ResumeCardItem;