const EXTENSIONS = ['png', 'jpg', 'jpeg']

export interface GalleryImage {
  src: string
  alt: string
}

const headExists = async (url: string) => {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

export const findGalleryImage = async (index: number) => {
  // check all extensions in parallel for a single index, return first existing path or null
  const checks = EXTENSIONS.map(ext =>
    headExists(`/gallery/photo${index}.${ext}`).then(exists =>
      exists ? `/gallery/photo${index}.${ext}` : null,
    ),
  )
  const results = await Promise.all(checks)
  return results.find(r => r !== null) ?? null
}
