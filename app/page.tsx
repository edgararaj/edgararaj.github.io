import { ArrowDown } from 'lucide-react'
import ProjectList from '@/components/projects-list'

export default async function Home() {
  return (
    <div>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-md font-code'>Projects</h2>
        <button className='flex items-center text-gray-400 hover:text-primary transition-colors text-md font-code'>
          Order by: Data
          <ArrowDown className='ml-1 w-4 h-4' />
        </button>
      </div>

      <ProjectList />
    </div>
  )
}
