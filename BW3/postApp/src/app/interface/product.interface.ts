export interface Product {
    id: number,
    title: string,
    price: number,
    recommendedPrice: number,
    prevPrice: number,
    details: string,
    description: string,
    imgUrl: string,
    category: string,
    favorite?:boolean
}
