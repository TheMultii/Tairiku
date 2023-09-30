import axios from 'axios'
import { type TairikuCategories } from '../types'

export const fetchTairikuCategories = async (): Promise<TairikuCategories> => {
  const { data } = await axios.get<TairikuCategories>(
    'https://api.mganczarczyk.pl/tairiku/categories'
  )
  return data
}
