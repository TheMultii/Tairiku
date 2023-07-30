export interface TairikuGeneratedImage {
  id: number
  hash: string
  category: string
  nsfw: boolean
  dimensions: {
    width: number
    height: number
  }
  source: string
  created_at: string
}

export interface TairikuGeneratedImageResponse {
  count: number
  images: TairikuGeneratedImage[]
}
