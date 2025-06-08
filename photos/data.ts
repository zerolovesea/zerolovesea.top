export interface PhotoMate {
  text?: string
}

export interface Photo extends PhotoMate {
  name: string
  url: string
}

// Remote photo URLs
const remotePhotos = [
  { name: 'pho_1', url: 'https://images.zerolovesea.top/gallery/pho_1.jpeg' },
  { name: 'pho_2', url: 'https://images.zerolovesea.top/gallery/pho_2.jpeg' },
  { name: 'pho_3', url: 'https://images.zerolovesea.top/gallery/pho_3.jpeg' },
  { name: 'pho_4', url: 'https://images.zerolovesea.top/gallery/pho_4.jpeg' },
  { name: 'pho_5', url: 'https://images.zerolovesea.top/gallery/pho_5.jpeg' },
  { name: 'pho_6', url: 'https://images.zerolovesea.top/gallery/pho_6.jpeg' },
  { name: 'pho_7', url: 'https://images.zerolovesea.top/gallery/pho_7.jpeg' },
  { name: 'pho_8', url: 'https://images.zerolovesea.top/gallery/pho_8.jpeg' },
  { name: 'pho_9', url: 'https://images.zerolovesea.top/gallery/pho_9.jpeg' },
  { name: 'pho_10', url: 'https://images.zerolovesea.top/gallery/pho_10.jpeg' },
  { name: 'pho_11', url: 'https://images.zerolovesea.top/gallery/pho_11.jpeg' },
  { name: 'pho_12', url: 'https://images.zerolovesea.top/gallery/pho_12.jpeg' },
  { name: 'pho_13', url: 'https://images.zerolovesea.top/gallery/pho_13.jpeg' },
  { name: 'pho_14', url: 'https://images.zerolovesea.top/gallery/pho_14.jpeg' },
  { name: 'pho_15', url: 'https://images.zerolovesea.top/gallery/pho_15.jpeg' },
  { name: 'pho_16', url: 'https://images.zerolovesea.top/gallery/pho_16.jpeg' },
  { name: 'pho_17', url: 'https://images.zerolovesea.top/gallery/pho_17.jpeg' },
  { name: 'pho_18', url: 'https://images.zerolovesea.top/gallery/pho_18.jpeg' },
  { name: 'pho_19', url: 'https://images.zerolovesea.top/gallery/pho_19.jpeg' },
  { name: 'pho_20', url: 'https://images.zerolovesea.top/gallery/pho_20.jpeg' },

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
