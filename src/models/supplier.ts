import { Money } from "./core"

export interface Supplier {
    id: number
    name: string
    type: SupplierType
    products: ProductSupplier[]
}

export enum SupplierType {
    AVAILABLE = "available",
    NOT_AVAILABLE = "not_available",
}

export interface ProductSupplier {
    price: Money
    productId: number
}