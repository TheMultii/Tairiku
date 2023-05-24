import { Accessor, createEffect, onMount } from 'solid-js';
import TairikuStatsType from '../interfaces/TairikuStats';

export default function TairikuStats({ tairikuStats }: { tairikuStats: Accessor<TairikuStatsType> }) {
    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            const mlns = (num / 1000000).toFixed(1);
            return `${mlns} mln`;
        } else if (num >= 1000) {
            const thousands = (num / 1000).toFixed(1);
            return `${thousands} tys`;
        }
        return num.toLocaleString('pl-PL');
    }

    const today = new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });

    let indexedImagesCountRef: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined,
        indexedCategoriesCountRef: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined,
        queriesHandledCountRef: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;
    let indexedImagesCountAnim,
        indexedCategoriesCountAnim,
        queriesHandledCountAnim;

    const createAnimations = async () => {
        if (tairikuStats().total_ascriptions === undefined ||
            tairikuStats().total_categories === undefined ||
            tairikuStats().total_images === undefined) return;
        const countUpModule = await import('countup.js');
        const options = {
            startVal: 0,
            enableScrollSpy: true,
            scrollSpyOnce: true,
            duration: 2.5,
        };

        const _indexedImages = formatNumber(tairikuStats().total_images || 0),
            _indexedCategories = formatNumber(tairikuStats().total_categories || 0),
            _queriesHandled = formatNumber(tairikuStats().total_ascriptions || 0);

        if (indexedImagesCountRef instanceof HTMLElement) {
            let [number, suffix] = _indexedImages.split(' ');
            suffix = suffix === undefined ? '' : ` ${suffix}`;
            indexedImagesCountAnim = new countUpModule.CountUp(indexedImagesCountRef, parseFloat(number), { ...options, decimalPlaces: 2, suffix });
        }

        if (indexedCategoriesCountRef instanceof HTMLElement) {
            let [number, suffix] = _indexedCategories.split(' ');
            suffix = suffix === undefined ? '' : ` ${suffix}`;
            indexedCategoriesCountAnim = new countUpModule.CountUp(indexedCategoriesCountRef, parseFloat(number), { ...options, suffix });
        }

        if (queriesHandledCountRef instanceof HTMLElement) {
            let [number, suffix] = _queriesHandled.split(' ');
            suffix = suffix === undefined ? '' : ` ${suffix}`;
            queriesHandledCountAnim = new countUpModule.CountUp(queriesHandledCountRef, parseFloat(number), { ...options, decimalPlaces: 1, suffix });
        }
    }

    onMount(async () => await createAnimations());

    createEffect(async () => await createAnimations(), tairikuStats().total_ascriptions);

    return (
        <div class="container relative my-[4rem] lg:my-[7rem] mx-auto">
            <div class="md:align-start flex-col flex relative mb-[3rem] lg:mb-[3.5rem]">
                <h2 class="text-3xl md:text-4xl font-semibold m-0">
                    🖼️ Tairiku
                </h2>
                <span class="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
                    Podsumowanie danych związanych z projektem Tairiku
                </span>
            </div>
            <div class="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
                <div class="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800">
                    <h3 class="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
                        <p class="inline" ref={indexedImagesCountRef}>Loading...</p> {tairikuStats().total_images !== undefined ? "+" : ""}
                    </h3>
                    <span class="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
                        Zindeksowanych grafik w bazie (stan na {today})
                    </span>
                </div>
                <div class="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800">
                    <h3 class="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
                        <p class="inline" ref={indexedCategoriesCountRef}>Loading...</p>
                    </h3>
                    <span class="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
                        Zindeksowanych kategorii grafik (stan na {today})
                    </span>
                </div>
                <div class="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800">
                    <h3 class="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
                        <p class="inline" ref={queriesHandledCountRef}>Loading...</p> {tairikuStats().total_ascriptions !== undefined ? "+" : ""}
                    </h3>
                    <span class="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
                        Obsłużonych zapytań (stan na {today})
                    </span>
                </div>
            </div>
        </div>
    )
}