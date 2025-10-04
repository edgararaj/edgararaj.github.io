import Gallery from '@/components/gallery'

export const metadata = {
  title: 'Edgar Araújo - Photography',
  description: 'A collection of moments and memories.',
}

export default function PhotographyPage() {
  return (
    <div>
      <div className='mb-8'>
        <h2 className='text-md font-code'>Gallery</h2>
        <p className='text-gray-400 text-sm mt-2 max-w-2xl'>
          A collection of moments, places, and experiences that have shaped my
          journey.
        </p>
      </div>

      <Gallery />
    </div>
  )
}
