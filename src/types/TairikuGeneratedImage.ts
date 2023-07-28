export type TairikuGeneratedImage = {
    id: number;
    hash: string;
    category: string;
    nsfw: boolean;
    dimensions: {
        width: number;
        height: number;
    };
    source: string;
    created_at: string;
};
