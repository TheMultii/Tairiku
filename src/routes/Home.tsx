import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { decodeBlurHash } from 'fast-blurhash'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TairikuPopularTags, TairikuStats } from '../components'
import {
  type TairikuGeneratedImageResponse,
  type TairikuStats as TairikuStatsType,
} from '../types'

export const Home = () => {
  const homeCategory = 'streetmoe'

  const [wasHomeTairikuBackgroundLoaded, setWasHomeTairikuBackgroundLoaded] =
    useState(false)
  const HomeTairikuBackgroundDiv = useRef<HTMLDivElement>(null)

  const loadImage = async (url: string) => {
    try {
      if (HomeTairikuBackgroundDiv.current == null) return

      const response = await axios.get(url, { responseType: 'blob' })
      const imageUrl = URL.createObjectURL(response.data)

      setWasHomeTairikuBackgroundLoaded(true)
      HomeTairikuBackgroundDiv.current.style.backgroundImage = `url(${imageUrl})`
    } catch (error) {
      console.error('Error loading image:', error)
    }
  }

  const { data: dataBackgroundImage } = useQuery({
    queryKey: ['home_background_tairiku_image'],
    queryFn: async () => {
      const { data } = await axios.get<TairikuGeneratedImageResponse>(
        `https://api.mganczarczyk.pl/tairiku/${homeCategory}?safety=true`
      )
      return data?.images[0]
    },
  })

  const { data: dataTairikuStats } = useQuery({
    queryKey: ['tairiku_global_stats'],
    queryFn: async () => {
      const { data } = await axios.get<TairikuStatsType>(
        'https://api.mganczarczyk.pl/tairiku/stats'
      )
      return data
    },
  })

  useEffect(() => {
    if (wasHomeTairikuBackgroundLoaded) return
    if (dataBackgroundImage == null) return
    if (HomeTairikuBackgroundDiv?.current == null) return

    loadImage(
      `https://api.mganczarczyk.pl/tairiku/display/${dataBackgroundImage.id}`
    )

    const [width, height] =
      document.body.clientWidth > 1280 ? [400, 400] : [100, 100]

    const pixels = decodeBlurHash(dataBackgroundImage.hash, width, height)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    if (ctx == null) return

    const imageData = ctx.createImageData(width, height)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)
    if (!wasHomeTairikuBackgroundLoaded) {
      HomeTairikuBackgroundDiv.current.style.backgroundImage = `url(${canvas.toDataURL()})`
    }
  }, [dataBackgroundImage, wasHomeTairikuBackgroundLoaded])

  const bgImgLink = useMemo(
    () =>
      ['https://i.imgur.com/BXGMAcP.jpg', 'https://i.imgur.com/qA7nLC5.jpg'][
        Math.round(Math.random())
      ],
    []
  )

  return (
    <>
      <header className="relative h-screen max-h-screen w-full overflow-hidden before:absolute before:h-screen before:max-h-screen before:w-full before:bg-black/80">
        <div className="absolute left-0 top-0 table h-full w-full">
          <div className="table-cell align-middle">
            <h1 className="text-center font-[Oswald] text-sm font-normal uppercase not-italic text-white">
              Marcel Gańczarczyk
            </h1>
            <h1 className="leading-full pointer-events-none relative mx-auto mb-[-4px] mt-[-10px] w-full select-none text-center text-[65px] font-bold uppercase not-italic tracking-[-0.02em] text-white sm:text-[85px] md:mb-[-5px] md:mt-[-14px] md:text-[115px]">
              TAIRIKU
            </h1>
            <div className="h-[20px] w-full" />
          </div>
        </div>
        <div className="absolute bottom-[50px] left-1/2 z-[500] -translate-x-1/2 translate-y-1/2">
          <div className="visible absolute left-0 right-0 ml-auto mr-auto h-full w-px opacity-100 transition-all duration-[.7s]">
            <div className="block h-12 w-px before:top-0 before:block before:h-[50%] before:w-px before:animate-scroll-down before:bg-white"></div>
          </div>
        </div>
        <img
          src={bgImgLink}
          className="pointer-events-none absolute left-0 top-0 z-[-1] h-screen max-h-screen w-full animate-bg-img-unzoom overflow-hidden object-cover object-[center_45%]"
          alt=""
        />
      </header>
      <TairikuStats tairikuStats={dataTairikuStats} />
      <div
        ref={HomeTairikuBackgroundDiv}
        className="relative h-[90vh] w-full bg-cover bg-fixed bg-center after:absolute after:left-0 after:top-0 after:z-0 after:h-full after:w-full after:bg-black/70 md:h-[70vh]"
      >
        {!wasHomeTairikuBackgroundLoaded && (
          <div className="absolute z-[2] h-[3px] w-full overflow-x-hidden bg-neutral-600 before:relative before:block before:h-[3px] before:w-[40%] before:animate-lineAnim before:bg-primary"></div>
        )}
        <div className="absolute left-0 top-0 z-[2] table h-full w-full">
          <div className="table-cell align-middle">
            <h1 className="transparent-text leading-full pointer-events-none relative mx-auto mb-[-4px] mt-[-10px] w-full select-none text-center text-[45px] font-bold uppercase not-italic tracking-[-0.02em] text-white sm:text-[65px] md:mb-[-5px] md:mt-[-14px] md:text-[85px]">
              TAIRIKU
            </h1>
          </div>
        </div>
      </div>
      <TairikuPopularTags />
    </>
  )
}
