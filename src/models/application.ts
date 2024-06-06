import { TradingPointType } from "./trading_point"

export interface Application {
    id: number
    tradingPointId: number
    tradingPointType: TradingPointType
    createdAt: Date
}

export interface ProductApplication {
    quantity: number
    productId: number
}