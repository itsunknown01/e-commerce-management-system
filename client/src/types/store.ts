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