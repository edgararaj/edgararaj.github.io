'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  id: number
  src: string
  alt: string
}

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  images: GalleryImage[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  images,
  currentIndex,
  onPrevious,
  onNext,
}: ImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrevious()
      } else if (e.key === 'ArrowRight') {
        onNext()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('keydown', handleArrowKeys)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleArrowKeys)
    }
  }, [isOpen, onClose, onPrevious, onNext])

  if (!isOpen) return null

  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < images.length - 1

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm'
      onClick={onClose}
    >
      <div className='relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4'>
        <button
          onClick={onClose}
          className='absolute top-6 right-6 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors'
        >
          <X className='w-6 h-6 text-white' />
        </button>

        {/* Previous arrow */}
        {hasPrevious && (
          <button
            onClick={e => {
              e.stopPropagation()
              onPrevious()
            }}
            className='absolute left-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors'
          >
            <ChevronLeft className='w-6 h-6 text-white' />
          </button>
        )}

        {/* Next arrow */}
        {hasNext && (
          <button
            onClick={e => {
              e.stopPropagation()
              onNext()
            }}
            className='absolute right-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors'
          >
            <ChevronRight className='w-6 h-6 text-white' />
          </button>
        )}

        <div
          className='relative w-full h-full max-w-4xl max-h-[80vh]'
          onClick={e => e.stopPropagation()}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className='object-contain'
            sizes='90vw'
            priority
          />
        </div>
      </div>
    </div>
  )
}
