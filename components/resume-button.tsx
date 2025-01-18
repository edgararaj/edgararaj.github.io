'use client'
import { Download } from 'lucide-react'

export default function ResumeButton() {
  const handleDownload = () => {
    // Replace this URL with the actual URL of your resume file
    const resumeUrl = '/cv.pdf'

    // Create a temporary anchor element
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'Edgar_Araujo_Resume.pdf' // Set the desired file name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div
      onClick={handleDownload}
      className='flex items-center justify-center font-code w-fit m-auto cursor-pointer px-6 py-3 bg-transparent border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300'
    >
      <Download className='mr-2' size={24} />
      Resume
    </div>
  )
}
