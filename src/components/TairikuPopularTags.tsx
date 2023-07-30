import { useState } from 'react'
import { Link } from 'react-router-dom'
import { type TairikuPopularTag } from '../types'

interface TagProps {
  popularTag: TairikuPopularTag
}

const Tag = ({ popularTag }: TagProps) => {
  return (
    <Link
      to={popularTag.path}
      className="xsm:hover:-translate-y-0.5 relative flex h-full w-full cursor-pointer items-center rounded-2xl border border-solid border-neutral-900 bg-neutral-800 p-[19px] transition-all hover:border-primary"
    >
      {popularTag.name}
    </Link>
  )
}

export const TairikuPopularTags = () => {
  const [popularTags] = useState<TairikuPopularTag[]>([
    {
      name: 'Streetmoe',
      path: '/streetmoe',
    },
    {
      name: 'Wallpaper',
      path: '/animewallpaper',
    },
    {
      name: 'Normal',
      path: '/awwnime',
    },
    {
      name: 'Ecchi',
      path: '/ecchi',
    },
    {
      name: 'Legwear',
      path: '/animelegwear',
    },
    {
      name: 'Wholesome yuri',
      path: '/wholesomeyuri',
    },
    {
      name: 'Midriff',
      path: '/midriff',
    },
    {
      name: 'Waifu Diffusion',
      path: '/waifudiffusion',
    },
    {
      name: 'Legs',
      path: '/animelegs',
    },
    {
      name: 'Thighdeology',
      path: '/thighdeology',
    },
    {
      name: 'Feet',
      path: '/animefeets',
    },
    {
      name: 'Hentai AI',
      path: '/hentaiai',
    },
  ])

  return (
    <div className="container relative mx-auto mt-[4rem] lg:mt-[7rem]">
      <div className="md:align-start relative mb-[3rem] flex flex-col lg:mb-[3.5rem]">
        <h2 className="m-0 text-3xl font-semibold md:text-4xl">
          🎇 Popular categories
        </h2>
        <span className="mt-2 block text-base font-normal text-neutral-500 dark:text-neutral-400 sm:text-xl md:mt-3">
          Most searched image categories
        </span>
      </div>
      <div className="my-[50px] flex flex-wrap">
        {popularTags.map((popularTag) => (
          <div
            key={popularTag.name}
            className="xsm:w-1/2 mb-8 flex h-[50px] w-full max-w-full px-[.75rem] sm:w-1/3 lg:w-1/4 xl:w-[16.66667%]"
          >
            <Tag popularTag={popularTag} />
          </div>
        ))}
      </div>
    </div>
  )
}
