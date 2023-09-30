import axios from 'axios'
import {
  useContainerPosition,
  useInfiniteLoader,
  useMasonry,
  usePositioner,
  useResizeObserver,
  useScroller,
  type LoadMoreItemsCallback,
  type Positioner,
} from 'masonic'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTitle, useUnmount, useWindowSize } from 'react-use'
import { TairikuMasonryItem } from '../components'
import { useTairikuCategories } from '../providers'
import {
  type TairikuCategoryDescription,
  type TairikuGeneratedImage,
  type TairikuGeneratedImageResponse,
} from '../types'

export const TairikuCategory = () => {
  const location = useLocation()
  const { TairikuCategories } = useTairikuCategories()

  const categoryData = useMemo(() => {
    return (
      TairikuCategories?.filter(
        (category) =>
          category.name.toLowerCase() ===
          location.pathname.toLowerCase().replace('/', '')
      )?.[0] ?? ({} as TairikuCategoryDescription)
    )
  }, [TairikuCategories, location.pathname])

  useTitle(`Tairiku ・ ${categoryData.pretty_name}`, {
    restoreOnUnmount: true,
  })

  const [tairikuCategoryImages, setTairikuCategoryImages] = useState<
    TairikuGeneratedImage[]
  >([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [containerWidth, setContainerWidth] = useState(0)
  const [masonryStartIndex, setMasonryStartIndex] = useState(-1)
  const { width: windowWidth, height } = useWindowSize()

  const containerRef = useRef(null)

  useLayoutEffect(() => {
    const elm = containerRef.current
    if (!elm) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          setContainerWidth(entry.contentBoxSize[0].inlineSize)
        }
      }
    })
    observer.observe(elm)
    return () => {
      observer.unobserve(elm)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current])

  const { offset, width } = useContainerPosition(containerRef, [
    containerWidth,
    windowWidth,
    height,
  ])
  const { scrollTop } = useScroller(offset)
  const positioner = usePositioner({
    width,
    columnGutter: 8,
    maxColumnCount: 5,
  })
  const resizeObserver = useResizeObserver(positioner)

  const mainref = useRef<HTMLElement>(null)

  const checkShouldFetchNextBatch = useInfiniteLoader(
    async (startIndex) => {
      if (startIndex <= masonryStartIndex) return

      setMasonryStartIndex(startIndex)
      await fetchImages()
    },
    {
      isItemLoaded: (index, items) => !!items[index],
      threshold: 3,
    }
  )

  const fetchImages = async () => {
    const abortController = new AbortController()

    try {
      setIsLoading(true)

      const { data } = await axios.get<TairikuGeneratedImageResponse>(
        `https://api.mganczarczyk.pl/tairiku/${categoryData.name}?count=25`,
        {
          signal: abortController.signal,
        }
      )

      setTairikuCategoryImages((prev) => [...prev, ...data.images])
    } finally {
      setIsLoading(false)
    }

    return () => {
      abortController.abort()
    }
  }

  useEffect(() => {
    setTairikuCategoryImages([])
    fetchImages()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryData.name])

  useUnmount(() => {
    document.title = 'Tairiku'
  })

  const removeFromArrayCallback = (id: number | string) => {
    setTairikuCategoryImages((prev) => prev.filter((image) => image.id !== id))
  }

  return (
    <div className="w-full">
      <div className="relative mb-2 h-[40vh] after:absolute after:bottom-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-b after:from-transparent after:via-transparent after:via-60% after:to-dark-100 after:to-[99%]">
        <img
          className="h-[99%] w-full object-cover"
          src="https://mganczarczyk.pl/assets/ubb_timetable_card.webp"
          alt=""
        />
        <div className="relative z-[5] -mt-16 text-center">
          <Link to="/">
            <p className="text-4xl font-bold">{categoryData.pretty_name}</p>
          </Link>
        </div>
      </div>
      <main
        className="mx-1 mb-8 mt-8 flex flex-col items-center justify-center sm:mx-2 sm:mt-10 md:mx-4"
        ref={mainref}
      >
        {tairikuCategoryImages.length > 0 && (
          <TairikuMasonry
            scrollTop={scrollTop}
            positioner={positioner}
            height={height}
            containerRef={containerRef}
            resizeObserver={resizeObserver}
            tairikuCategoryImages={tairikuCategoryImages}
            removeFromArrayCallback={removeFromArrayCallback}
            checkShouldFetchNextBatch={checkShouldFetchNextBatch}
          />
        )}
        {isLoading && (
          <div className="spin h-8 w-8 rounded-full border-4 border-dark-300 border-t-primary" />
        )}
      </main>
    </div>
  )
}

interface TairikuMasonryProps {
  scrollTop: number
  positioner: Positioner
  height: number
  containerRef: React.RefObject<HTMLElement>
  resizeObserver: ResizeObserver
  tairikuCategoryImages: TairikuGeneratedImage[]
  removeFromArrayCallback: (id: number | string) => void
  checkShouldFetchNextBatch: LoadMoreItemsCallback<unknown>
}

const TairikuMasonry = ({
  scrollTop,
  positioner,
  height,
  containerRef,
  resizeObserver,
  tairikuCategoryImages,
  removeFromArrayCallback,
  checkShouldFetchNextBatch,
}: TairikuMasonryProps) => {
  return (
    <>
      {useMasonry({
        scrollTop,
        positioner,
        height,
        containerRef,
        resizeObserver,
        overscanBy: 1.5,
        items: tairikuCategoryImages.map((image) => ({
          image,
          removeFromArrayCallback,
        })),
        onRender: checkShouldFetchNextBatch,
        render: TairikuMasonryItem,
      })}
    </>
  )
}
