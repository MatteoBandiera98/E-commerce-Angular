import { Product } from "./product.interface";
import { Roles } from "./roles.interface";

export interface User {
    uid: string,
    email: string,
    displayName: string,
    photoURL: string,
    emailVerified: boolean,
    roles: Roles,
    favorites: Product[]
}
