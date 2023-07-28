import { useEffect, useMemo, useRef, useState } from "react";
import { decodeBlurHash } from "fast-blurhash";
import {
    TairikuStats as TairikuStatsType,
    TairikuGeneratedImage,
} from "../types";
import { Footer, TairikuPopularTags, TairikuStats } from "../components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const Home = () => {
    const homeCategory = "streetmoe";

    const [wasHomeTairikuBackgroundLoaded, setWasHomeTairikuBackgroundLoaded] =
        useState(false);
    const HomeTairikuBackgroundDiv = useRef<HTMLDivElement>(null);

    const loadImage = async (url: string) => {
        try {
            const { data } = await axios.get(url, { responseType: "blob" });

            const imageUrl = URL.createObjectURL(data);

            if (!HomeTairikuBackgroundDiv.current) return;

            setWasHomeTairikuBackgroundLoaded(true);
            HomeTairikuBackgroundDiv.current.style.backgroundImage = `url(${imageUrl})`;
        } catch (error) {
            console.error("Error loading image:", error);
        }
    };

    const { data: dataBackgroundImage } = useQuery({
        queryKey: ["home_background_tairiku_image"],
        queryFn: async () => {
            const { data } = await axios.get<TairikuGeneratedImage>(
                `https://api.mganczarczyk.pl/tairiku/${homeCategory}?safety=true`
            );
            return data;
        },
    });

    const { data: dataTairikuStats } = useQuery({
        queryKey: ["tairiku_global_stats"],
        queryFn: async () => {
            const { data } = await axios.get<TairikuStatsType>(
                `https://api.mganczarczyk.pl/tairiku/stats`
            );
            return data;
        },
    });

    useEffect(() => {
        if (!dataBackgroundImage) return;
        if (!HomeTairikuBackgroundDiv?.current) return;

        loadImage(
            `https://api.mganczarczyk.pl/tairiku/display/${dataBackgroundImage.id}`
        );

        const [width, height] =
            document.body.clientWidth > 1280 ? [400, 400] : [100, 100];

        const pixels = decodeBlurHash(dataBackgroundImage.hash, width, height);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imageData = ctx.createImageData(width, height);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
        if (!wasHomeTairikuBackgroundLoaded) {
            HomeTairikuBackgroundDiv.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
        }
    }, [dataBackgroundImage]);

    const bgImgLink = useMemo(
        () =>
            [
                "https://i.imgur.com/BXGMAcP.jpg",
                "https://i.imgur.com/qA7nLC5.jpg",
            ][Math.round(Math.random())],
        []
    );

    return (
        <>
            <header className="relative w-full h-screen max-h-screen overflow-hidden before:absolute before:h-screen before:w-full before:max-h-screen before:bg-black/80">
                <div className="table absolute top-0 left-0 w-full h-full">
                    <div className="table-cell align-middle">
                        <h1 className="font-[Oswald] not-italic font-normal text-sm text-center uppercase text-white">
                            Marcel Gańczarczyk
                        </h1>
                        <h1 className="text-[65px] sm:text-[85px] md:text-[115px] pointer-events-none select-none tracking-[-0.02em] mx-auto mt-[-10px] mb-[-4px] md:mt-[-14px] md:mb-[-5px] leading-full relative not-italic font-bold text-center uppercase text-white w-full">
                            TAIRIKU
                        </h1>
                        <div className="w-full h-[20px]" />
                    </div>
                </div>
                <div className="z-[500] absolute bottom-[50px] left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="absolute w-px h-full left-0 right-0 ml-auto mr-auto opacity-100 visible transition-all duration-[.7s]">
                        <div className="block w-px h-12 before:block before:w-px before:top-0 before:bg-white before:h-[50%] before:animate-scroll-down"></div>
                    </div>
                </div>
                <img
                    src={bgImgLink}
                    className="animate-bg-img-unzoom z-[-1] pointer-events-none absolute top-0 left-0 w-full h-screen max-h-screen overflow-hidden object-cover object-[center_45%]"
                    alt=""
                />
            </header>
            {dataTairikuStats && (
                <TairikuStats tairikuStats={dataTairikuStats} />
            )}
            <div
                ref={HomeTairikuBackgroundDiv}
                className="w-full h-[90vh] md:h-[70vh] bg-fixed bg-center bg-cover relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/70 after:z-0"
            >
                {!wasHomeTairikuBackgroundLoaded && (
                    <div className="z-[2] w-full h-[3px] before:h-[3px] before:w-[40%] absolute bg-neutral-600 before:bg-primary overflow-x-hidden before:animate-lineAnim before:relative before:block"></div>
                )}
                <div className="table absolute top-0 left-0 w-full h-full z-[2]">
                    <div className="table-cell align-middle">
                        <h1 className="transparent-text text-[45px] sm:text-[65px] md:text-[85px] pointer-events-none select-none tracking-[-0.02em] mx-auto mt-[-10px] mb-[-4px] md:mt-[-14px] md:mb-[-5px] leading-full relative not-italic font-bold text-center uppercase text-white w-full">
                            TAIRIKU
                        </h1>
                    </div>
                </div>
            </div>
            <TairikuPopularTags />
            <Footer />
        </>
    );
};
