export type StoreType = {
    id: string;
    name: string;
    userId: string;
}

export type CategoryType = {
    id: string;
    storeId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ProductType = {
    id: string;
    storeId: string;
    title: string;
    brand: string;
    categories: CategoryType;
    description: string;
    discountPercentage: number;
    images: string[];
    price: number;
    rating: number;
    quantity: number;
    thumbnail: string;
    IsFamous: boolean
    IsFeatured: boolean
    IsSpecial: boolean
    createdAt: Date;
    updatedAt: Date;
}