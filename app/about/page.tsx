import Image from 'next/image'
import { Pin } from 'lucide-react'
import Envelope from '../../assets/envelope.svg'
import Linkedin from '../../assets/linkedin-logo.svg'
import Github from '../../assets/github-logo.svg'
import ResumeButton from '@/components/resume-button'

export const metadata = {
  title: 'Edgar Araújo - About',
  description: 'Get to know who I am.',
}

export default function AboutPage() {
  return (
    <div>
      <div className='flex flex-col items-center text-center gap-1'>
        <Image
          src='/perfil_blur.png'
          alt='Edgar Araújo'
          width={160}
          height={160}
          className='mx-auto rounded-full shadow-lg object-cover aspect-square'
        />
        <h1 className='mt-4 text-3xl font-primary'>Edgar Araújo</h1>
        <p className='text-xl font-secondary text-primary'>
          Computer Scientist
        </p>
        <p className='inline-flex items-center text-gray-400 transition-opacity font-code col-start-2 p-0.5 pl-1.5 pr-1.5 text-xs sm:text-sm'>
          <Pin className='mr-2 w-3 h-3 sm:w-4 sm:h-4'></Pin>
          Braga, Portugal
        </p>
      </div>
      <p className='mt-8 text-gray-700 leading-relaxed text-center max-w-[60ch] m-auto'>
        I dive into everything from low-level systems programming to building
        full-stack websites. I’ve got a soft spot for functional programming and
        love figuring out ways to make systems run smoother and faster.
      </p>
      <div className='flex justify-center mt-10 space-x-4'>
        <a
          href='https://www.linkedin.com/in/edgararaj'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:opacity-80 transition-opacity'
        >
          <Image src={Linkedin} alt='Linkedin' />
        </a>
        <a
          href='mailto:edgararaj@gmail.com'
          className='hover:opacity-80 transition-opacity'
        >
          <Image src={Envelope} alt='Email' />
        </a>
        <a
          href='https://github.com/edgararaj'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:opacity-80 transition-opacity'
        >
          <Image src={Github} alt='Github' />
        </a>
      </div>
      <div className='mt-6'>
        <ResumeButton />
      </div>
    </div>
  )
}
