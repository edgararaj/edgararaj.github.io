'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ImageModal from './image-modal'
import { GalleryImage, findGalleryImage } from 'lib/gallery-api'

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  )

  const isMounted = useRef(true)

  useEffect(() => {
    const abortController = new AbortController()
    isMounted.current = true
    const batchSize = 4

    const loadImages = async () => {
      const found: GalleryImage[] = []
      let index = 1
      let stop = false

      try {
        while (!stop && isMounted.current && !abortController.signal.aborted) {
          const indices = Array.from({ length: batchSize }, (_, i) => index + i)

          const batchResults = await Promise.all(
            indices.map(i =>
              findGalleryImage(i)
                .then(res => res)
                .catch(err => {
                  console.error(`Error loading image ${i}:`, err)
                  return null
                }),
            ),
          )

          let newImagesFound = false

          for (let i = 0; i < batchResults.length; i++) {
            const res = batchResults[i]
            if (res) {
              found.push({ src: res, alt: `Gallery Image ${index + i}` })
              newImagesFound = true
            } else {
              stop = true
              break
            }
          }

          if (isMounted.current && newImagesFound) {
            setImages([...found])
          }

          index += batchSize
        }
      } catch (err) {
        console.error('Unexpected error while loading images:', err)
      }
    }

    loadImages()

    return () => {
      isMounted.current = false
      abortController.abort()
    }
  }, [])

  const handleOpen = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleClose = useCallback(() => {
    setSelectedImageIndex(null)
  }, [])

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
