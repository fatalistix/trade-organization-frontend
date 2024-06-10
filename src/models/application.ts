import { TradingPointType } from "./trading_point"

export interface Application {
    id: number
    tradingPointId: number
    tradingPointType: TradingPointType
    createdAt: Date,
    orderId: number | null
    products: ProductApplication[]
}

export interface ProductApplication {
    quantity: number
    productId: number
}