import { Money } from "./core"

export interface Supplier {
    id: number
    name: string
    type: SupplierType
}

export enum SupplierType {
    AVAILABLE = "available",
    NOT_AVAILABLE = "not_available",
}

export interface ProductSupplier {
    id: number
    price: Money
    productId: number
}