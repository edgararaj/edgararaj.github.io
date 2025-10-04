export interface GalleryImage {
  id: number
  src: string
  alt: string
}

const supportedExtensions = ['.png', '.jpg', '.jpeg']

async function checkImageExists(imagePath: string): Promise<boolean> {
  try {
    const response = await fetch(imagePath, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

export async function loadGalleryImage(
  photoNumber: number,
): Promise<GalleryImage | null> {
  for (const ext of supportedExtensions) {
    const imagePath = `/gallery/photo${photoNumber}${ext}`
    const exists = await checkImageExists(imagePath)
    if (exists) {
      return {
        id: photoNumber,
        src: imagePath,
        alt: `Gallery Image ${photoNumber}`,
      }
    }
  }
  return null
}
