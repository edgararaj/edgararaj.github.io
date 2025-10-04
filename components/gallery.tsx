'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import ImageModal from './image-modal'
import { GalleryImage, loadGalleryImage } from 'lib/gallery-api'

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    alt: string
    index: number
  } | null>(null)

  // Load images sequentially
  useEffect(() => {
    const loadGalleryImagesSequentially = async () => {
      const loadedImages: GalleryImage[] = []
      let photoNumber = 1

      while (true) {
        const image = await loadGalleryImage(photoNumber)
        if (image) {
          loadedImages.push(image)
          setImages([...loadedImages]) // Update state as we go
        } else {
          break // No more images found
        }
        photoNumber++
      }
    }

    loadGalleryImagesSequentially()
  }, [])

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage({ src: image.src, alt: image.alt, index })
  }

  const handlePrevious = async () => {
    if (selectedImage && selectedImage.index > 0) {
      const prevIndex = selectedImage.index - 1

      // Check if we already have the previous image
      if (images[prevIndex]) {
        setSelectedImage({
          src: images[prevIndex].src,
          alt: images[prevIndex].alt,
          index: prevIndex,
        })
      } else {
        // Load the previous image if not already loaded
        const prevImage = await loadGalleryImage(prevIndex + 1)
        if (prevImage) {
          setImages(prev => {
            const newImages = [...prev]
            newImages[prevIndex] = prevImage
            return newImages
          })
          setSelectedImage({
            src: prevImage.src,
            alt: prevImage.alt,
            index: prevIndex,
          })
        }
      }
    }
  }

  const handleNext = async () => {
    if (selectedImage && selectedImage.index < images.length - 1) {
      const nextIndex = selectedImage.index + 1

      // Check if we already have the next image
      if (images[nextIndex]) {
        setSelectedImage({
          src: images[nextIndex].src,
          alt: images[nextIndex].alt,
          index: nextIndex,
        })
      } else {
        // Load the next image if not already loaded
        const nextImage = await loadGalleryImage(nextIndex + 1)
        if (nextImage) {
          setImages(prev => {
            const newImages = [...prev]
            newImages[nextIndex] = nextImage
            return newImages
          })
          setSelectedImage({
            src: nextImage.src,
            alt: nextImage.alt,
            index: nextIndex,
          })
        }
      }
    }
  }

  if (images.length === 0) {
    return (
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='relative aspect-square bg-gray-200 animate-pulse'
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0'>
        {images.map((image, index) => (
          <div
            key={image.id}
            className='relative aspect-square overflow-hidden cursor-pointer group'
            onClick={() => handleImageClick(image, index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-105'
              sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw'
            />
            <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300' />
          </div>
        ))}
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src || ''}
        imageAlt={selectedImage?.alt || ''}
        images={images}
        currentIndex={selectedImage?.index || 0}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  )
}
