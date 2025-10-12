'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { GalleryImage } from 'lib/gallery-api'
import Image from 'next/image'
import ImageModal from './image-modal'

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  )
  const isMounted = useRef(true)

  useEffect(() => {
    const abortController = new AbortController()
    isMounted.current = true

    const loadImages = async () => {
      try {
        const index = await fetch('/gallery/index.json').then(r => r.json())

        const parsed = index.photos.map((a: any) => ({
          src: a.image,
          alt: a.title || 'Gallery image',
        }))

        if (isMounted.current && !abortController.signal.aborted) {
          setImages(parsed)
        }
      } catch (err) {
        console.error('Failed to load gallery index:', err)
      }
    }

    loadImages()

    return () => {
      isMounted.current = false
      abortController.abort()
    }
  }, [])

  const handleOpen = (index: number) => setSelectedImageIndex(index)
  const handleClose = useCallback(() => setSelectedImageIndex(null), [])

  if (images.length === 0) {
    return (
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='relative aspect-square bg-dark-secondary/50 animate-pulse rounded-lg'
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {images.map((gimg, index) => (
          <div
            key={index}
            className='relative aspect-square overflow-hidden cursor-pointer group rounded-lg'
            onClick={() => handleOpen(index)}
          >
            <Image
              src={gimg.src}
              alt={gimg.alt}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-105'
              sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw'
            />
            <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300' />
          </div>
        ))}
      </div>

      {selectedImageIndex != null && (
        <ImageModal
          images={images}
          initialIndex={selectedImageIndex}
          onClose={handleClose}
        />
      )}
    </>
  )
}
