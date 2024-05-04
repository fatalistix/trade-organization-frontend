import { Money } from "./core"
import { PlaceOfWorkType, TradingPointType } from "./trading_point"

export interface Seller {
    id: number
    firstName: string
    lastName: string
    middleName: string
    birthDate: Date
    salary: Money
    phoneNumber: string
    placeOfWorkId: number
    placeOfWorkType: PlaceOfWorkType
    tradingPointId: number
    tradingPointType: TradingPointType
}