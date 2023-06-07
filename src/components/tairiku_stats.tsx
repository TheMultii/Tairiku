import { Ref, useEffect, useRef } from "react";
import TairikuStatsType from "../interfaces/TairikuStats";

export default function TairikuStats({
    tairikuStats,
}: {
    tairikuStats: TairikuStatsType;
}) {
    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            const mlns = (num / 1000000).toFixed(1);
            return `${mlns} mln`;
        } else if (num >= 1000) {
            const thousands = (num / 1000).toFixed(1);
            return `${thousands} tys`;
        }
        return num.toLocaleString("pl-PL");
    };

    const today = new Date().toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const indexedImagesCountRef = useRef<HTMLDivElement>(null),
        indexedCategoriesCountRef = useRef<HTMLDivElement>(null),
        queriesHandledCountRef = useRef<HTMLDivElement>(null);

    const createAnimations = async () => {
        if (
            tairikuStats.total_ascriptions === undefined ||
            tairikuStats.total_categories === undefined ||
            tairikuStats.total_images === undefined
        )
            return;
        const countUpModule = await import("countup.js");
        const options = {
            startVal: 0,
            enableScrollSpy: true,
            scrollSpyOnce: true,
            duration: 2.5,
        };

        const _indexedImages = formatNumber(tairikuStats.total_images || 0),
            _indexedCategories = formatNumber(
                tairikuStats.total_categories || 0
            ),
            _queriesHandled = formatNumber(tairikuStats.total_ascriptions || 0);

        if (indexedImagesCountRef.current instanceof HTMLElement) {
            let [number, suffix] = _indexedImages.split(" ");
            suffix = suffix === undefined ? "" : ` ${suffix}`;
            new countUpModule.CountUp(
                indexedImagesCountRef.current,
                parseFloat(number),
                { ...options, decimalPlaces: 2, suffix }
            );
        }

        if (indexedCategoriesCountRef.current instanceof HTMLElement) {
            let [number, suffix] = _indexedCategories.split(" ");
            suffix = suffix === undefined ? "" : ` ${suffix}`;
            new countUpModule.CountUp(
                indexedCategoriesCountRef.current,
                parseFloat(number),
                { ...options, suffix }
            );
        }

        if (queriesHandledCountRef.current instanceof HTMLElement) {
            let [number, suffix] = _queriesHandled.split(" ");
            suffix = suffix === undefined ? "" : ` ${suffix}`;
            new countUpModule.CountUp(
                queriesHandledCountRef.current,
                parseFloat(number),
                { ...options, decimalPlaces: 1, suffix }
            );
        }
    };

    useEffect(() => {
        const _createAnimations = async () => await createAnimations();
        _createAnimations();
    }, [tairikuStats.total_ascriptions]);

    return (
        <div className="container relative my-[4rem] lg:my-[7rem] mx-auto">
            <div className="md:align-start flex-col flex relative mb-[3rem] lg:mb-[3.5rem]">
                <h2 className="text-3xl md:text-4xl font-semibold m-0">
                    🖼️ Tairiku
                </h2>
                <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
                    Podsumowanie danych związanych z projektem Tairiku
                </span>
            </div>
            <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
                <TairikuStatsItem
                    title="Zindeksowanych grafik w bazie"
                    itemRef={indexedImagesCountRef}
                    addPlus={tairikuStats.total_images != null}
                    today={today}
                />
                <TairikuStatsItem
                    title="Zindeksowanych kategorii grafik"
                    itemRef={indexedCategoriesCountRef}
                    addPlus={false}
                    today={today}
                />
                <TairikuStatsItem
                    title="Obsłużonych zapytań"
                    itemRef={queriesHandledCountRef}
                    addPlus={tairikuStats.total_ascriptions != null}
                    today={today}
                />
            </div>
        </div>
    );
}

const TairikuStatsItem = ({
    itemRef,
    addPlus,
    title,
    today,
}: {
    itemRef: Ref<HTMLDivElement>;
    addPlus: boolean;
    title: string;
    today: string;
}) => {
    return (
        <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800">
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
                <p className="inline" ref={itemRef}>
                    Loading...
                </p>
                {addPlus && " +"}
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
                {title} (stan na {today})
            </span>
        </div>
    );
};
