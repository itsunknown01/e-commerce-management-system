
export enum IUserRole {
    "ADMIN"= "ADMIN",
    "USER"= "USER"
}

export interface IUser {
    _id: string
    name: string,
    email: string,
    image: string | null,
    password?: string,
    token?: string | null,
    role: IUserRole
}