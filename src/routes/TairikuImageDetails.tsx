import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { type TairikuGeneratedImage } from '../types'

interface Props {
  id: string
}

export const TairikuImageDetails = () => {
  const { id } = useParams<keyof Props>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['tairiku_image_details', id],
    queryFn: async () => {
      if (!id) return
      const { data } = await axios.get<TairikuGeneratedImage>(
        `https://api.mganczarczyk.pl/tairiku/info/${id}`
      )
      return data
    },
  })

  const BasicInfo = () => {
    if (!data) return <></>

    const { id, category, source, nsfw, dimensions } = data
    return (
      <ul>
        <li>ID: {id}</li>
        <li>Category: {category}</li>
        <li>Source: {source}</li>
        <li>
          NSFW:{' '}
          {nsfw ? <span className="text-red-600">YES</span> : <span>NO</span>}
        </li>
        <li>
          Dimensions: {dimensions.width}×{dimensions.height}
        </li>
      </ul>
    )
  }

  const downloadImage = () => {
    if (!id) return

    const _download = async () => {
      const response = await axios.get(
        `https://api.mganczarczyk.pl/tairiku/display/${id}`,
        { responseType: 'blob' }
      )
      if (!response.data) return

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `tairiku-${id}.png`)
      link.click()
      link.remove()
    }

    _download()
  }

  return (
    <div className="mt-[55px] flex flex-col items-center justify-center">
      <img
        src={`https://api.mganczarczyk.pl/tairiku/display/${id ?? ''}`}
        className="user-select-none pointer-events-none rounded"
        alt=""
        style={{ width: 350 }}
      />
      {(isLoading || isFetching) && data === undefined ? (
        <div className="spin h-8 w-8 rounded-full border-4 border-dark-300 border-t-primary" />
      ) : (
        <BasicInfo />
      )}

      <button className="my-4 text-primary" onClick={downloadImage}>
        Download image
      </button>
    </div>
  )
}
