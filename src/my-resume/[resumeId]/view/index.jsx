import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo();
        
        // Add comprehensive print styles to fix white space
        const style = document.createElement('style');
        style.innerHTML = `
            @media print {
                @page {
                    margin: 0 !important;
                    padding: 0 !important;
                    size: auto;
                }
                
                html, body {
                    margin: 0 !important;
                    padding: 0 !important;
                    height: auto !important;
                }
                
                #no-print {
                    display: none !important;
                }
                
                #print-area {
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                }
                
                #print-container, .my-10, .mx-10, .md\\:mx-20, .lg\\:mx-36 {
                    margin: 0 !important;
                    padding: 0 !important;
                }
                
                /* Target resume content */
                .resume-container {
                    margin: 0 !important;
                    padding: 0 !important;
                }
                
                /* Ensure the header bar has no margin */
                .header-bar {
                    margin-top: 0 !important;
                    padding-top: 0 !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload = () => {
        // Enhanced print function to fix white space
        const printArea = document.getElementById('print-area');
        
        // Store the original styles
        const originalStyles = {
            position: printArea.style.position,
            top: printArea.style.top,
            left: printArea.style.left,
            margin: printArea.style.margin,
            padding: printArea.style.padding
        };
        
        // Apply print-specific styles
        printArea.style.position = 'absolute';
        printArea.style.top = '0';
        printArea.style.left = '0';
        printArea.style.margin = '0';
        printArea.style.padding = '0';
        
        // Find the header bar (blue bar at top)
        const headerBar = printArea.querySelector('.header-bar');
        if (headerBar) {
            const originalHeaderStyles = {
                marginTop: headerBar.style.marginTop,
                paddingTop: headerBar.style.paddingTop
            };
            
            headerBar.style.marginTop = '0';
            headerBar.style.paddingTop = '0';
            
            // Print
            window.print();
            
            // Restore header bar styles
            headerBar.style.marginTop = originalHeaderStyles.marginTop;
            headerBar.style.paddingTop = originalHeaderStyles.paddingTop;
        } else {
            window.print();
        }
        
        // Restore original styles
        printArea.style.position = originalStyles.position;
        printArea.style.top = originalStyles.top;
        printArea.style.left = originalStyles.left;
        printArea.style.margin = originalStyles.margin;
        printArea.style.padding = originalStyles.padding;
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }} >
            <div id="no-print">
                <Header />
                <br />
                <br />

                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <div className="p-8 text-center rounded-lg shadow-2xl animate-fade-in">
                        <h2 className='text-2xl font-bold text-blue-300 mb-4 transform transition-all duration-500 hover:scale-105 hover:text-blue-200'>
                            Congrats! Your Ultimate AI-Generated Resume is Ready! 🎉
                        </h2>
                        <p className='text-gray-400 max-w-xl mx-auto text-base leading-relaxed animate-pulse-slow'>
                            Now you are ready to download your resume and share your unique resume URL
                            with friends and family. Your professional journey starts here!
                        </p>
                    </div>
                    <div className='flex justify-between px-44 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>

                        <RWebShare
                            data={{
                                text: "Hello Everyone, This is my resume please open url to see it",
                                url: import.meta.env.VITE_BASE_URL+"/my-resume/" + resumeId + "/view",
                                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        > <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>
            </div>
            
            {/* Print area with special ID for targeting */}
            <div className='my-10 mx-10 md:mx-20 lg:mx-36' id="print-container">
                <div id="print-area" style={{ margin: 0, padding: 0 }}>
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume