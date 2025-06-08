export interface PhotoMate {
  text?: string
}

export interface Photo extends PhotoMate {
  name: string
  url: string
}

// Remote photo URLs
const remotePhotos = [
  { name: 'pho_1', url: 'https://images.zerolovesea.top/gallery/gallery32.jpeg' },
  { name: 'pho_2', url: 'https://images.zerolovesea.top/gallery/gallery42.jpeg' },
  { name: 'pho_3', url: 'https://images.zerolovesea.top/gallery/gallery35.jpeg' },
  { name: 'pho_4', url: 'https://images.zerolovesea.top/gallery/gallery73.jpeg' },
  { name: 'pho_5', url: 'https://images.zerolovesea.top/gallery/gallery15.jpeg' },
  { name: 'pho_6', url: 'https://images.zerolovesea.top/gallery/gallery38.jpeg' },
  { name: 'pho_7', url: 'https://images.zerolovesea.top/gallery/gallery10.jpeg' },
  { name: 'pho_8', url: 'https://images.zerolovesea.top/gallery/gallery13.jpeg' },
  { name: 'pho_9', url: 'https://images.zerolovesea.top/gallery/gallery14.jpeg' },
  { name: 'pho_10', url: 'https://images.zerolovesea.top/gallery/gallery17.jpeg' },
  { name: 'pho_11', url: 'https://images.zerolovesea.top/gallery/gallery29.jpeg' },
  { name: 'pho_12', url: 'https://images.zerolovesea.top/gallery/gallery66.jpeg' },
  { name: 'pho_13', url: 'https://images.zerolovesea.top/gallery/gallery31.jpeg' },
  { name: 'pho_14', url: 'https://images.zerolovesea.top/gallery/gallery39.jpeg' },
  { name: 'pho_15', url: 'https://images.zerolovesea.top/gallery/gallery78.jpeg' },
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
})

export default photos
