import { Try } from "ts-try"
import { Money } from "./core"

export interface TradingPoint {
    id: number
    type: TradingPointType
    areaPlot: number
    rentalCharge: Money
    counterCount: number
    address: string
    products: ProductTradingPoint[]
}

export enum TradingPointType {
    DEPARTMENT_STORE = "department_store",
    STORE = "store",
    TRAY = "tray",
    KIOSK = "kiosk",
}

export namespace TradingPointType {
    export function fromString(s: string): Try<TradingPointType> {
        switch (s) {
            case "department_store":
                return TradingPointType.DEPARTMENT_STORE
            case "store":
                return TradingPointType.STORE
            case "tray":
                return TradingPointType.TRAY
            case "kiosk":
                return TradingPointType.KIOSK
            default:
                return new Error("Invalid trading point type")
        }
    }

    export function toString(type: TradingPointType): string {
        switch (type) {
            case TradingPointType.DEPARTMENT_STORE:
                return "Универмаг"
            case TradingPointType.STORE:
                return "Магазин"
            case TradingPointType.KIOSK:
                return "Киоск"
            case TradingPointType.TRAY:
                return "Лоток"
        }
    }
}

export interface ProductTradingPoint {
    quantity: number
    price: Money,
    productId: number
}
