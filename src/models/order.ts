import { Money } from "./core"
import { TradingPointType } from "./trading_point"

export interface Order {
    id: number
    supplierId: number
    createdAt: Date
    status: OrderStatus
    completedAt: Date | null
    cancelledAt: Date | null
    products: ProductOrder[]
    distributions: Distribution[]
}

export enum OrderStatus {
    COMPLETED = "COMPLETED",
    IN_PROGRESS = "IN_PROGRESS",
    CANCELLED = "CANCELLED"
}

export interface ProductOrder {
    quantity: number
    price: Money
    productId: number
}

export interface Distribution {
    tradingPointId: number
    tradingPointType: TradingPointType
    productId: number
    quantity: number
}