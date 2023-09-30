import { decodeBlurHash } from 'fast-blurhash'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { type TairikuGeneratedImage } from '../types'

interface Props {
  width: number
  data: tairikuImageProps
}

interface tairikuImageProps {
  image: TairikuGeneratedImage
  removeFromArrayCallback: (id: string | number) => void
}

export const TairikuMasonryItem = ({ width, data }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const blurhashRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  const imgHeight = useMemo(
    () => data.image.dimensions.height * (width / data.image.dimensions.width),
    [data.image.dimensions.height, data.image.dimensions.width, width]
  )

  useEffect(() => {
    const imageSrc = `https://api.mganczarczyk.pl/tairiku/display/${data.image.id}`
    const imgElement = imgRef.current

    const handleImageLoad = () => {
      setLoaded(true)

      if (imgElement == null) return
      const { naturalWidth, naturalHeight } = imgElement
      if (naturalWidth < 200 || naturalHeight < 200) {
        // data.removeFromArrayCallback(data.image.id)
      }
    }

    imgElement?.addEventListener('load', handleImageLoad)
    imgElement?.setAttribute('src', imageSrc)

    return () => {
      imgElement?.removeEventListener('load', handleImageLoad)
    }
  }, [data, data.image.id])

  useEffect(() => {
    if (!loaded && width !== 0) {
      try {
        if (!data.image.hash) return

        const heightFloor = Math.floor(imgHeight)

        const pixels = decodeBlurHash(data.image.hash, width, heightFloor)
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = heightFloor

        const ctx = canvas.getContext('2d')
        if (ctx == null) return
        const imageData = ctx.createImageData(width, heightFloor)
        imageData.data.set(pixels)
        ctx.putImageData(imageData, 0, 0)

        if (
          !blurhashRef?.current?.src.endsWith('#') &&
          blurhashRef.current != null
        ) {
          blurhashRef.current.src = canvas.toDataURL()
        }
      } catch (error) {
        //
      }
    }
  }, [loaded, width, imgHeight, data.image.hash])

  return (
    <Link to={`/details/${data.image.id}`}>
      <div
        className="group relative cursor-pointer overflow-hidden rounded after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-gradient-to-b after:from-transparent after:via-transparent after:via-70% after:to-black/75 after:to-95%"
        style={{
          width,
          height: imgHeight,
        }}
      >
        <img
          ref={blurhashRef}
          className={`absolute left-0 top-0 w-full select-none object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-0' : ''
          }`}
          style={{
            width,
            height: imgHeight,
          }}
          alt=""
        />
        <img
          ref={imgRef}
          className={`absolute left-0 top-0 w-full select-none object-cover transition-opacity duration-500 ${
            loaded ? '' : 'opacity-0'
          }`}
          style={{
            width,
            height: imgHeight,
          }}
          alt=""
        />
        <span className="pointer-events-none absolute bottom-0 left-0 z-10 mx-2 mb-1 flex w-[calc(100%-1rem)] items-center justify-between">
          <p className="mr-1 line-clamp-1">{data.image.source}</p>
          <p className="pointer-events-none hidden translate-y-[150%] select-none text-xs font-light transition-transform duration-300 group-hover:translate-y-0 sm:block">
            ({data.image.category})
          </p>
        </span>
      </div>
    </Link>
  )
}
