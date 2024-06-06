import { Money } from "./core"
import { PlaceOfWorkType } from "./place_of_work"
import { TradingPointType } from "./trading_point"

export interface Seller {
    id: number
    firstName: string
    lastName: string
    middleName: string
    birthDate: Date
    salary: Money
    phoneNumber: string
    worksAt: WorksAt | null
}

export interface WorksAt {
    placeOfWork: PlaceOfWork
    tradingPoint: TradingPoint
}

export interface PlaceOfWork {
    id: number,
    type: PlaceOfWorkType
}

export interface TradingPoint {
    id: number,
    type: TradingPointType,
}

export enum WorksAtFilterType {
    ALL,
    ONLY_NULL,
    ONLY_NOT_NULL,
}

export interface SellerFilter {
    worksAtFilterType: WorksAtFilterType,
    tradingPointId: number | null,
    tradingPointType: TradingPointType | null,
    placeOfWorkId: number | null,
    placeOfWorkType: PlaceOfWorkType | null,
    search: string | null
}

export interface NewWorksAt {
    worksAt: WorksAt | null
}