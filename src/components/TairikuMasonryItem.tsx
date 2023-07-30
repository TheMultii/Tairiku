import axios from 'axios'
import { decodeBlurHash } from 'fast-blurhash'
import { useEffect, useMemo, useRef } from 'react'
import { type TairikuGeneratedImage } from '../types'

interface Props {
  width: any
  data: TairikuGeneratedImage
}

export const TairikuMasonryItem = ({ width, data }: Props) => {
  const imgref = useRef<HTMLImageElement>(null)
  const divref = useRef<HTMLDivElement>(null)

  const imgHeight = useMemo(
    () => data.dimensions.height * (width / data.dimensions.width),
    [data.dimensions.height, data.dimensions.width, width]
  )

  useEffect(() => {
    const controller = new AbortController()

    const loadImage = async (url: string): Promise<void> => {
      try {
        const response = await axios.get(url, {
          responseType: 'blob',
          signal: controller.signal,
        })
        const imageUrl = URL.createObjectURL(response.data)

        if (imgref.current == null || divref.current == null) return

        imgref.current.src = imageUrl
        divref.current.style.backgroundImage = 'none'
        imgref.current.classList.remove('hidden')
      } catch (error: any) {
        if (error?.name === 'CanceledError') return
        console.error('Error loading image:', error)
      }
    }
    loadImage(`https://api.mganczarczyk.pl/tairiku/display/${data.id}`)

    if (width !== 0) {
      const heightFloor = Math.floor(imgHeight)

      const pixels = decodeBlurHash(data.hash, width, heightFloor)
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = heightFloor

      const ctx = canvas.getContext('2d')
      if (ctx == null) return
      const imageData = ctx.createImageData(width, heightFloor)
      imageData.data.set(pixels)
      ctx.putImageData(imageData, 0, 0)

      if (!imgref?.current?.src.endsWith('#')) return
      if (divref.current == null) return

      imgref.current.src = canvas.toDataURL()
      imgref.current.classList.remove('hidden')
    }

    return () => {
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={divref}
      className="rounded"
      style={{
        width,
        height: imgHeight,
      }}
    >
      <div className="group relative overflow-hidden rounded after:pointer-events-none after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-gradient-to-b after:from-transparent after:via-transparent after:via-70% after:to-black/75 after:to-95%">
        <img
          ref={imgref}
          style={{
            width,
            height: imgHeight,
          }}
          className="left-0 top-0 hidden w-full select-none object-cover transition-transform duration-500 group-hover:scale-[103%]"
          src={'#'}
          alt=""
        />
        <span className="absolute bottom-0 left-0 z-10 mx-2 mb-1 flex w-[calc(100%-1rem)] items-center justify-between">
          <p className="mr-1 line-clamp-1">{data.source}</p>
          <p className="pointer-events-none hidden translate-y-[150%] select-none text-xs font-light transition-transform duration-300 group-hover:translate-y-0 sm:block">
            ({data.category})
          </p>
        </span>
      </div>
    </div>
  )
}
