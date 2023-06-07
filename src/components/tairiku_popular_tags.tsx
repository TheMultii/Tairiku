import { useState } from "react";
import ITairikuPopularTag from "../interfaces/TairikuPopularTag";

const Tag = ({ name }: { name: string }) => {
    return (
        <div className="bg-neutral-800 w-full h-full p-[19px] relative flex rounded-2xl items-center border border-solid border-neutral-900 hover:border-[#1ab69d] transition-all xsm:hover:-translate-y-0.5 cursor-pointer">
            {name}
        </div>
    );
};

export default function TairikuPopularTags({}) {
    const [popularTags] = useState<Array<ITairikuPopularTag>>([
        {
            name: "Streetmoe",
        },
        {
            name: "Wallpaper",
        },
        {
            name: "Normal",
        },
        {
            name: "Ecchi",
        },
        {
            name: "Legwear",
        },
        {
            name: "Wholesome yuri",
        },
        {
            name: "Midriff",
        },
        {
            name: "Waifu Diffusion",
        },
        {
            name: "Legs",
        },
        {
            name: "Thighdeology",
        },
        {
            name: "Feet",
        },
        {
            name: "Hentai AI",
        },
    ]);

    return (
        <div className="container relative mt-[4rem] lg:mt-[7rem] mx-auto">
            <div className="md:align-start flex-col flex relative mb-[3rem] lg:mb-[3.5rem]">
                <h2 className="text-3xl md:text-4xl font-semibold m-0">
                    🎇 Popularne kategorie
                </h2>
                <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
                    Najczęściej wyszukiwane kategorie grafik
                </span>
            </div>
            <div className="my-[50px] flex flex-wrap">
                {popularTags.map((popularTag) => (
                    <div
                        key={popularTag.name}
                        className="flex max-w-[100%] w-[100%] xsm:w-[50%] sm:w-[33.333%] h-[50px] lg:w-[25%] xl:w-[16.66667%] px-[.75rem] mb-[30px]"
                    >
                        <Tag name={popularTag.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}
