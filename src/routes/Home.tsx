import { createSignal, onMount } from "solid-js";
import { Footer, TairikuPopularTags, TairikuStats } from "../components";
import { decodeBlurHash } from "fast-blurhash";
import TairikuStatsType from "../interfaces/TairikuStats";
import TairikuGeneratedImageType from "../interfaces/TairikuGeneratedImage";

export default function Home() {

    const homeCategory: string = 'streetmoe';

    const [tairikuStats, setTairikuStats] = createSignal<TairikuStatsType>({} as TairikuStatsType);
    const [wasHomeTairikuBackgroundLoaded, setWasHomeTairikuBackgroundLoaded] = createSignal<boolean>(false);
    let HomeTairikuBackgroundDiv: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;

    const loadImage = async (url: string) => {
        const response = await fetch(url);
        if (response.status !== 200) return;

        const imageBlob = await response.blob(),
            imageUrl = URL.createObjectURL(imageBlob);

        if (HomeTairikuBackgroundDiv instanceof HTMLElement) {
            setWasHomeTairikuBackgroundLoaded(true);
            HomeTairikuBackgroundDiv.style.backgroundImage = `url(${imageUrl})`;
        }
    };

    const _getTairikuBackground = async () => {
        const response = await fetch(`https://api.mganczarczyk.pl/tairiku/${homeCategory}?safety=true`);
        if (response.status != 200) return;
        const data: TairikuGeneratedImageType = await response.json();
        if (!data) return;
        setTimeout(() => loadImage(`https://api.mganczarczyk.pl/tairiku/display/${data.id}`), 1000);
        if (HomeTairikuBackgroundDiv instanceof HTMLElement) {
            const [width, height] = document.body.clientWidth > 1280 ? [400, 400] : [100, 100];

            const pixels = decodeBlurHash(data.hash, width, height),
                canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const imageData = ctx.createImageData(width, height);
                imageData.data.set(pixels);
                ctx.putImageData(imageData, 0, 0);
                if (!wasHomeTairikuBackgroundLoaded())
                    HomeTairikuBackgroundDiv.style.backgroundImage = `url(${canvas.toDataURL()})`;
            }
        }
    }

    const _getTairikuStats = async () => {
        const response = await fetch(`https://api.mganczarczyk.pl/tairiku/stats`);
        if (response.status != 200) return;
        const data: TairikuStatsType = await response.json();
        if (!data) return;
        setTairikuStats(data);
    }

    onMount(async () => {
        const promise_getTairikuBackground = _getTairikuBackground(),
            promise_getTairikuStats = _getTairikuStats();

        await Promise.all([promise_getTairikuBackground, promise_getTairikuStats]);
    });

    return (
        <>
            <header class="relative w-full h-screen max-h-screen overflow-hidden before:content-[''] before:absolute before:h-screen before:w-full before:max-h-screen before:z-2 before:bg-[rgba(0,0,0,.7)]">
                <div class="table absolute top-0 left-0 w-full h-full">
                    <div class="table-cell align-middle">
                        <h1 class="font-[Oswald] not-italic font-normal text-sm text-center uppercase text-white">Marcel Gańczarczyk</h1>
                        <div class="w-full h-[20px]" />
                        <h1 class="text-[65px] sm:text-[85px] md:text-[115px] pointer-events-none select-none tracking-[-0.02em] mx-auto mt-[-10px] mb-[-4px] md:mt-[-14px] md:mb-[-5px] leading-[100%] relative not-italic font-bold text-center uppercase text-white w-full">TAIRIKU</h1>
                        <div class="w-full h-[20px]" />
                    </div>
                </div>
                <div class="z-[500] absolute bottom-[50px] left-[50%] -translate-x-1/2 translate-y-1/2">
                    <div class="absolute w-px h-full left-0 right-0 ml-auto mr-auto opacity-100 visible transition-all duration-[.7s]">
                        <div class="block w-px h-12 before:content-[''] before:block before:w-px before:top-0 before:bg-white before:h-[50%] scroll-animation"></div>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1553880607-dbed5f97aba4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1885&q=80" class="bg-img z-[-1] pointer-events-none absolute top-0 left-0 w-full h-screen max-h-screen overflow-hidden object-cover object-[center_45%]" alt="" />
            </header>
            <TairikuStats tairikuStats={tairikuStats} />
            <div ref={HomeTairikuBackgroundDiv} class="w-full h-[90vh] md:h-[70vh] bg-fixed bg-center bg-cover relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-2 after:bg-[rgba(0,0,0,.7)] after:z-[0]">
                {
                    !wasHomeTairikuBackgroundLoaded() && (
                        <div class="z-[2] w-full h-[3px] before:h-[3px] before:w-[40%] absolute bg-neutral-600 before:bg-[#1ab69d] loader-line before:relative before:block"></div>
                    )
                }
                <div class="table absolute top-0 left-0 w-full h-full z-[2]">
                    <div class="table-cell align-middle">
                        <h1 class="transparent-text text-[45px] sm:text-[65px] md:text-[85px] pointer-events-none select-none tracking-[-0.02em] mx-auto mt-[-10px] mb-[-4px] md:mt-[-14px] md:mb-[-5px] leading-[100%] relative not-italic font-bold text-center uppercase text-white w-full">TAIRIKU</h1>
                    </div>
                </div>
            </div>
            <TairikuPopularTags />
            <Footer />
        </>
    );
}