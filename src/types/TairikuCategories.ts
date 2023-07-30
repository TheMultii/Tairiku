export interface TairikuCategories {
  created_at: string
  categories: TairikuCategoryDescription[]
}

export interface TairikuCategoryDescription {
  name: string
  pretty_name: string
  description: string
  nsfw: boolean
}
