export enum UserRole {
    ADMIN= "ADMIN",
    USER= "USER",
}

export type UserType ={
    id: string;
    name: string;
    email: string;
    image: string | null
    role: UserRole;
}