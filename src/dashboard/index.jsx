import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { PlusCircle, FileText, RefreshCw } from 'lucide-react';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = () => {
    setIsLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        console.log(resp.data.data);
        setResumeList(resp.data.data);
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        console.error("Error fetching resumes:", err);
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    GetResumesList();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-950 text-gray-100">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTI1MjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOSAxLjc5MS00IDQtNHM0IDEuNzkxIDQgNC0xLjc5MSA0LTQgNC00LTEuNzkxLTQtNHptMC0xN2MwLTIuMjA5IDEuNzkxLTQgNC00czQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00em0tMTcgMTdjMC0yLjIwOSAxLjc5MS00IDQtNHM0IDEuNzkxIDQgNC0xLjc5MSA0LTQgNC00LTEuNzkxLTQtNHptMC0xN2MwLTIuMjA5IDEuNzkxLTQgNC00czQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-5"></div>
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      
      <div className="relative pt-10 p-6 md:p-10 lg:p-16 max-w-7xl mx-auto z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
              My Resumes
            </h2>
            <p className="mt-2 text-gray-400 animate-fade-in-delay">
              Create AI-powered resumes tailored to your target job roles
            </p>
          </div>
          
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900/40 text-blue-300 hover:bg-blue-800/60 border border-blue-800/50 transition-all duration-300 active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
            <AddResume />
          </div>

          {!isLoading ? (
            resumeList.length > 0 ? (
              resumeList.map((resume, index) => (
                <div 
                  key={index} 
                  className="animate-slide-up transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <ResumeCardItem resume={resume} refreshData={GetResumesList} />
                </div>
                
              ))
            ) : (
              <div 
                className="col-span-full flex flex-col items-center justify-center p-10 rounded-xl bg-gray-900/60 backdrop-blur-sm border border-gray-800 shadow-lg shadow-blue-900/20 animate-fade-in-up"
              >
                <FileText className="w-16 h-16 text-blue-400/40 mb-4" />
                <h3 className="text-xl font-medium text-blue-100 mb-2">No Resumes Yet</h3>
                <p className="text-blue-200/60 text-center mb-6">
                  Create your first resume to get started on your job search journey
                </p>
                
              </div>
            )
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index}
                className="relative h-64 rounded-xl bg-gray-900/60 backdrop-blur-sm border border-gray-800 shadow-lg shadow-blue-900/20 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="h-full w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-blue-900 animate-pulse-slow"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gray-900 p-4">
                    <div className="h-4 w-3/4 bg-gray-800 rounded-full mb-3 animate-pulse"></div>
                    <div className="h-3 w-1/2 bg-gray-800 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInDelay {
          0% { opacity: 0; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blob {
          0% { transform: scale(1); }
          33% { transform: scale(1.1) translate(10px, -10px); }
          66% { transform: scale(0.9) translate(-10px, 10px); }
          100% { transform: scale(1); }
        }
        
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.4; }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeInDelay 1s ease-out forwards;
        }

        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.5s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-blob {
          animation: blob 7s infinite alternate;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;