import { Money } from "./core"

export enum TradingPointType {
    DEPARTMENT_STORE = "department_store",
    STORE = "store",
    TRAY = "tray",
    KIOSK = "kiosk",
}

export function tradingPointTypeFromString(s: string): TradingPointType {
    switch(s) {
        case "department_store":
            return TradingPointType.DEPARTMENT_STORE
        case "store":
            return TradingPointType.STORE
        case "tray":
            return TradingPointType.TRAY
        case "kiosk":
            return TradingPointType.KIOSK
        default:
            throw new Error("Invalid trading point type")
    }
}

export enum PlaceOfWorkType {
    HALL = "hall",
    TRAY = "tray",
    KIOSK = "kiosk",
}

export function placeOfWorkTypeFromString(s: string): PlaceOfWorkType {
    switch(s) {
        case "hall":
            return PlaceOfWorkType.HALL
        case "tray":
            return PlaceOfWorkType.TRAY
        case "kiosk":
            return PlaceOfWorkType.KIOSK
        default:
            throw new Error("Invalid place of work type")
    }
}

export interface TradingPoint {
    id: number
    type: TradingPointType
    areaPlot: number
    rentalCharge: Money
    counterCount: number
    address: string
}