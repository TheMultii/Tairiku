import { CountUp } from 'countup.js'
import { useEffect, useRef, type RefObject } from 'react'
import { formatNumber } from '../helpers'
import { type TairikuStats as TairikuStatsType } from '../types'

interface Props {
  tairikuStats?: TairikuStatsType
}

export const TairikuStats = ({ tairikuStats }: Props) => {
  const indexedImagesCountRef = useRef<HTMLDivElement>(null)
  const indexedCategoriesCountRef = useRef<HTMLDivElement>(null)
  const queriesHandledCountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createAnimations = async () => {
      if (
        !tairikuStats?.total_ascriptions ||
        !tairikuStats?.total_categories ||
        !tairikuStats?.total_images
      ) {
        return
      }

      const options = {
        startVal: 0,
        enableScrollSpy: true,
        scrollSpyOnce: true,
        duration: 2.5,
      }

      const _indexedImages = formatNumber(tairikuStats.total_images || 0)
      const _indexedCategories = formatNumber(
        tairikuStats.total_categories || 0
      )
      const _queriesHandled = formatNumber(tairikuStats.total_ascriptions || 0)

      if (indexedImagesCountRef.current != null) {
        let [number, suffix] = _indexedImages.split(' ')
        suffix = !suffix ? '' : suffix === 'k' ? 'k' : ` ${suffix}`
        new CountUp(indexedImagesCountRef.current, parseFloat(number), {
          ...options,
          decimalPlaces: 2,
          suffix,
        })
      }

      if (indexedCategoriesCountRef.current != null) {
        let [number, suffix] = _indexedCategories.split(' ')
        suffix = !suffix ? '' : suffix === 'k' ? 'k' : ` ${suffix}`
        new CountUp(indexedCategoriesCountRef.current, parseFloat(number), {
          ...options,
          suffix,
        })
      }

      if (queriesHandledCountRef.current != null) {
        let [number, suffix] = _queriesHandled.split(' ')
        suffix = !suffix ? '' : suffix === 'k' ? 'k' : ` ${suffix}`
        new CountUp(queriesHandledCountRef.current, parseFloat(number), {
          ...options,
          decimalPlaces: 1,
          suffix,
        })
      }
    }

    if (tairikuStats == null) return
    const _createAnimations = async () => {
      await createAnimations()
    }
    _createAnimations()
  }, [tairikuStats])

  return (
    <div className="container relative mx-auto my-[4rem] lg:my-[7rem]">
      <div className="md:align-start relative mb-[3rem] flex flex-col lg:mb-[3.5rem]">
        <h2 className="m-0 text-3xl font-semibold md:text-4xl">🖼️ Tairiku</h2>
        <span className="mt-2 block text-base font-normal text-neutral-500 dark:text-neutral-400 sm:text-xl md:mt-3">
          Tairiku Project Data Summary
        </span>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        <TairikuStatsItem
          title="Indexed images in the database"
          itemRef={indexedImagesCountRef}
          addPlus={!!tairikuStats?.total_images}
        />
        <TairikuStatsItem
          title="Indexed categories of images"
          itemRef={indexedCategoriesCountRef}
          addPlus={false}
        />
        <TairikuStatsItem
          title="Requests handled"
          itemRef={queriesHandledCountRef}
          addPlus={!!tairikuStats?.total_ascriptions}
        />
      </div>
    </div>
  )
}

const TairikuStatsItem = ({
  itemRef,
  addPlus,
  title,
}: {
  itemRef: RefObject<HTMLDivElement>
  addPlus: boolean
  title: string
}) => {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="rounded-2xl bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-800">
      <h3 className="text-2xl font-semibold leading-none text-neutral-900 dark:text-neutral-200 md:text-3xl">
        <p className="inline" ref={itemRef}>
          Loading...
        </p>
        {addPlus && ' +'}
      </h3>
      <span className="mt-3 block text-sm text-neutral-500 dark:text-neutral-400 sm:text-base">
        {title}
        <p className="text-xs text-neutral-500/75 dark:text-neutral-400/75">
          as of {today}
        </p>
      </span>
    </div>
  )
}
