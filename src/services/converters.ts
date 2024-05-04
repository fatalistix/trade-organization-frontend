import { Money as ModelMoney } from "../models/core"
import { Money as ProtoMoney } from "trade-organization-proto/gen/ts/core/money_pb"
import { TradingPointType as ModelTradingPointType } from "../models/trading_point"
import { TradingPointType as ProtoTradingPointType } from "trade-organization-proto/gen/ts/tradingpoint/trading_point_pb"
import { PlaceOfWorkType as ModelPlaceOfWorkType } from "../models/trading_point"
import { PlaceOfWorkType as ProtoPlaceOfWorkType } from "trade-organization-proto/gen/ts/tradingpoint/trading_point_pb"
import { Date as ProtoDate } from "trade-organization-proto/gen/ts/core/date_pb"

export function modelMoneyToProtoMoney(m: ModelMoney): ProtoMoney {
    const protoMoney = new ProtoMoney()
    protoMoney.setRubles(m.rubles)
    protoMoney.setPennies(m.pennies)
    return protoMoney
}

export function modelTradingPointTypeToProtoTradingPointType(
    t: ModelTradingPointType
): ProtoTradingPointType {
    switch(t) {
        case ModelTradingPointType.DEPARTMENT_STORE: {
            return ProtoTradingPointType.TRADING_POINT_DEPARTMENT_STORE
        }
        case ModelTradingPointType.STORE: {
            return ProtoTradingPointType.TRADING_POINT_STORE
        }
        case ModelTradingPointType.TRAY: {
            return ProtoTradingPointType.TRADING_POINT_TRAY
        }
        case ModelTradingPointType.KIOSK: {
            return ProtoTradingPointType.TRADING_POINT_KIOSK
        }
    }
}

export function modelPlaceOfWorkTypeToProtoPlaceOfWorkType(
    t: ModelPlaceOfWorkType
): ProtoPlaceOfWorkType {
    switch(t) {
        case ModelPlaceOfWorkType.HALL: {
            return ProtoPlaceOfWorkType.PLACE_OF_WORK_HALL
        }
        case ModelPlaceOfWorkType.TRAY: {
            return ProtoPlaceOfWorkType.PLACE_OF_WORK_TRAY
        }
        case ModelPlaceOfWorkType.KIOSK: {
            return ProtoPlaceOfWorkType.PLACE_OF_WORK_KIOSK
        }
    }
}

export function protoMoneyToModelMoney(m: ProtoMoney): ModelMoney {
    return new ModelMoney(m.getRubles(), m.getPennies())
}

export function protoTradingPointTypeToModelTradingPointType(
    t: ProtoTradingPointType
): ModelTradingPointType {
    switch(t) {
        case ProtoTradingPointType.TRADING_POINT_DEPARTMENT_STORE: {
            return ModelTradingPointType.DEPARTMENT_STORE
        }
        case ProtoTradingPointType.TRADING_POINT_STORE: {
            return ModelTradingPointType.STORE
        }
        case ProtoTradingPointType.TRADING_POINT_TRAY: {
            return ModelTradingPointType.TRAY
        }
        case ProtoTradingPointType.TRADING_POINT_KIOSK: {
            return ModelTradingPointType.KIOSK
        }
    }
}

export function protoPlaceOfWorkTypeToModelPlaceOfWorkType(
    t: ProtoPlaceOfWorkType
): ModelPlaceOfWorkType {
    switch(t) {
        case ProtoPlaceOfWorkType.PLACE_OF_WORK_HALL: {
            return ModelPlaceOfWorkType.HALL
        }
        case ProtoPlaceOfWorkType.PLACE_OF_WORK_TRAY: {
            return ModelPlaceOfWorkType.TRAY
        }
        case ProtoPlaceOfWorkType.PLACE_OF_WORK_KIOSK: {
            return ModelPlaceOfWorkType.KIOSK
        }
    }
}

export function dateToProtoDate(d: Date): ProtoDate {
    const pd = new ProtoDate()
    pd.setDay(d.getDay())
    pd.setMonth(d.getMonth())
    pd.setYear(d.getFullYear())
    return pd
}

export function protoDateToDate(pd: ProtoDate): Date {
    const d = new Date()
    d.setFullYear(pd.getYear())
    d.setMonth(pd.getMonth())
    d.setDate(pd.getDay())
    return d
}