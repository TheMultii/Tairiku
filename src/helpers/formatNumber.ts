export const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        const mlns = (num / 1000000).toFixed(1);
        return `${mlns} mln`;
    } else if (num >= 1000) {
        const thousands = (num / 1000).toFixed(1);
        return `${thousands} k`;
    }
    return num.toLocaleString("en-US");
};
