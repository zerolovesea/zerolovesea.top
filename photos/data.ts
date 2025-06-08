export interface PhotoMate {
  text?: string
}

export interface Photo extends PhotoMate {
  name: string
  url: string
}

// Remote photo URLs
const remotePhotos = [
  { name: 'pho_32', url: 'https://images.zerolovesea.top/gallery/gallery32.jpeg' },
  { name: 'pho_42', url: 'https://images.zerolovesea.top/gallery/gallery42.jpeg' },
  { name: 'pho_35', url: 'https://images.zerolovesea.top/gallery/gallery35.jpeg' },
  { name: 'pho_73', url: 'https://images.zerolovesea.top/gallery/gallery73.jpeg' },
  { name: 'pho_15', url: 'https://images.zerolovesea.top/gallery/gallery15.jpeg' },
  { name: 'pho_38', url: 'https://images.zerolovesea.top/gallery/gallery38.jpeg' },
  { name: 'pho_3', url: 'https://images.zerolovesea.top/gallery/gallery3.jpeg' },
]

// Optional: If you still need to load metadata from local JSON files
const metaInfo = Object.entries(
  import.meta.glob<PhotoMate>('./**/*.json', {
    eager: true,
    import: 'default',
  }),
).map(([name, data]) => {
  return {
    name: name.replace(/\.\w+$/, ''),
    data,
  }
})

// Create photos array from remote URLs, optionally combining with metadata
const photos = remotePhotos.map((photo): Photo => {
  return {
    ...metaInfo.find(info => info.name === photo.name)?.data,
    name: photo.name,
    url: photo.url,
  }
}).sort((a, b) => b.name.localeCompare(a.name))

export default photos
