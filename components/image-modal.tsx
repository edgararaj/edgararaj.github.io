'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GalleryImage } from 'lib/gallery-api'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

interface ImageModalProps {
  images: GalleryImage[]
  initialIndex: number
  onClose: () => void
}

export default function ImageModal({
  images,
  initialIndex,
  onClose,
}: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.body.classList.add('overflow-hidden')
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.classList.remove('overflow-hidden')
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm h-full w-full'>
      <button
        onClick={onClose}
        className='absolute top-6 right-6 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors'
      >
        <X className='w-6 h-6 text-white' />
      </button>
      <button className='prev-button absolute left-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors'>
        <ChevronLeft
          className={`w-6 h-6 text-white ${
            currentIndex === 0 ? 'opacity-30' : ''
          }`}
        />
      </button>
      <button className='next-button absolute right-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors'>
        <ChevronRight
          className={`w-6 h-6 text-white ${
            currentIndex === images.length - 1 ? 'opacity-30' : ''
          }`}
        />
      </button>

      <Swiper
        className='relative w-full h-full max-w-4xl max-h-[80vh]'
        modules={[Keyboard, Navigation]}
        initialSlide={currentIndex}
        navigation={{
          prevEl: '.prev-button',
          nextEl: '.next-button',
        }}
        keyboard={{ enabled: true }}
        spaceBetween={10}
        onSlideChange={swiper => setCurrentIndex(swiper.activeIndex)}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className='object-contain'
              sizes='90vw'
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
