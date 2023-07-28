import { Ref, useEffect, useRef } from "react";
import { TairikuStats as TairikuStatsType } from "../types";
import { formatNumber } from "../helpers";
import { CountUp } from "countup.js";

type Props = {
    tairikuStats: TairikuStatsType;
};

export const TairikuStats = ({ tairikuStats }: Props) => {
    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const indexedImagesCountRef = useRef<HTMLDivElement>(null),
        indexedCategoriesCountRef = useRef<HTMLDivElement>(null),
        queriesHandledCountRef = useRef<HTMLDivElement>(null);

    const createAnimations = async () => {
        if (
            !tairikuStats.total_ascriptions ||
            !tairikuStats.total_categories ||
            !tairikuStats.total_images
        )
            return;

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

        if (indexedImagesCountRef.current) {
            let [number, suffix] = _indexedImages.split(" ");
            suffix = !suffix ? "" : suffix === "k" ? "k" : ` ${suffix}`;
            new CountUp(indexedImagesCountRef.current, parseFloat(number), {
                ...options,
                decimalPlaces: 2,
                suffix,
            });
        }

        if (indexedCategoriesCountRef.current) {
            let [number, suffix] = _indexedCategories.split(" ");
            suffix = !suffix ? "" : suffix === "k" ? "k" : ` ${suffix}`;
            new CountUp(indexedCategoriesCountRef.current, parseFloat(number), {
                ...options,
                suffix,
            });
        }

        if (queriesHandledCountRef.current) {
            let [number, suffix] = _queriesHandled.split(" ");
            suffix = !suffix ? "" : suffix === "k" ? "k" : ` ${suffix}`;
            new CountUp(queriesHandledCountRef.current, parseFloat(number), {
                ...options,
                decimalPlaces: 1,
                suffix,
            });
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
                    Tairiku Project Data Summary
                </span>
            </div>
            <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
                <TairikuStatsItem
                    title="Indexed images in the database"
                    itemRef={indexedImagesCountRef}
                    addPlus={tairikuStats.total_images != null}
                    today={today}
                />
                <TairikuStatsItem
                    title="Indexed categories of images"
                    itemRef={indexedCategoriesCountRef}
                    addPlus={false}
                    today={today}
                />
                <TairikuStatsItem
                    title="Requests handled"
                    itemRef={queriesHandledCountRef}
                    addPlus={tairikuStats.total_ascriptions != null}
                    today={today}
                />
            </div>
        </div>
    );
};

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
                {title}
                <p className="text-xs opacity-75">as of {today}</p>
            </span>
        </div>
    );
};
