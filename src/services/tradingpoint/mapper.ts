import { TradingPointType as ModelTradingPointType } from "../../models/trading_point"
import { PlaceOfWorkType as ModelPlaceOfWorkType } from "../../models/place_of_work"
import { HallContainerType as ModelHallContainerType } from "../../models/hall_container"
import { TradingPointType as ProtoTradingPointType, PlaceOfWorkType as ProtoPlaceOfWorkType, HallContainerType as ProtoHallContainerType } from "trade-organization-proto/gen/ts/tradingpoint/tradingpoint_pb"
import { TradingPoint as ProtoTradingPoint } from "trade-organization-proto/gen/ts/tradingpoint/tradingpoint_pb"
import { TradingPoint as ModelTradingPoint } from "../../models/trading_point"
import { Money as ProtoMoney } from "trade-organization-proto/gen/ts/core/money_pb"
import { Money as ModelMoney  } from "../../models/core"
import { ReceiptingPointWithAccounting as ProtoReceiptingPointWithAccounting } from "trade-organization-proto/gen/ts/tradingpoint/tradingpoint_pb"
import { ReceiptingPointWithAccounting as ModelReceiptingPointWithAccounting } from "../../models/receipting_point_with_accounting"
import { ReceiptingPointWithAccountingType as ProtoReceiptingPointWithAccountingType } from "trade-organization-proto/gen/ts/tradingpoint/tradingpoint_pb"
import { ReceiptingPointWithAccountingType as ModelReceiptingPointWithAccountingType } from "../../models/receipting_point_with_accounting"
import { Section as ProtoSection } from "trade-organization-proto/gen/ts/tradingpoint/tradingpoint_pb"
import { Section as ModelSection } from "../../models/section"
import { Hall as ProtoHall } from "trade-organization-proto/gen/ts/tradingpoint/tradingpoint_pb"
import { Hall as ModelHall } from "../../models/hall"
import { Try, isError } from "ts-try"

export function modelTradingPointTypeToProtoTradingPointType(
    t: ModelTradingPointType
): ProtoTradingPointType {
    switch (t) {
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
    switch (t) {
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

export function protoTradingPointTypeToModelTradingPointType(
    t: ProtoTradingPointType
): ModelTradingPointType {
    switch (t) {
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
    switch (t) {
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

export function modelHallContainerTypeToProtoHallContainerType(
    t: ModelHallContainerType
): ProtoHallContainerType {
    switch (t) {
        case ModelHallContainerType.SECTION: {
            return ProtoHallContainerType.HALL_CONTAINER_SECTION
        }
        case ModelHallContainerType.STORE: {
            return ProtoHallContainerType.HALL_CONTAINER_STORE
        }
    }
}

export function protoTradingPointToModelTradingPoint(p: ProtoTradingPoint): ModelTradingPoint {
    const protoRentalCharge = p.getRentalCharge()!!
    const modelRentalCharge = ModelMoney.from(protoRentalCharge.getRubles(), protoRentalCharge.getPennies())

    return {
        id: p.getId(),
        type: protoTradingPointTypeToModelTradingPointType(p.getType()),
        areaPlot: p.getAreaPlot(),
        rentalCharge: modelRentalCharge as ModelMoney,
        counterCount: p.getCounterCount(),
        address: p.getAddress(),
        products: p.getProductsList().map(p => ({
            productId: p.getProductId(),
            price: ModelMoney.from(p.getPrice()!!.getRubles(), p.getPrice()!!.getPennies()),
            quantity: p.getQuantity(),
        }))
    }
}

export function protoReceiptingPointWithAccountingToModelReceiptingPointWithAccounting(p: ProtoReceiptingPointWithAccounting): ModelReceiptingPointWithAccounting {
    return {
        id: p.getId(),
        type: protoReceiptingPointWithAccountingTypeToModelReceiptingPointWithAccountingType(p.getType()),
    }
}

export function protoReceiptingPointWithAccountingTypeToModelReceiptingPointWithAccountingType(t: ProtoReceiptingPointWithAccountingType): ModelReceiptingPointWithAccountingType {
    switch (t) {
        case ProtoReceiptingPointWithAccountingType.RECEIPTING_POINT_WITH_ACCOUNTING_DEPARTMENT_STORE: {
            return ModelReceiptingPointWithAccountingType.DEPARTMENT_STORE
        }
        case ProtoReceiptingPointWithAccountingType.RECEIPTING_POINT_WITH_ACCOUNTING_STORE: {
            return ModelReceiptingPointWithAccountingType.STORE
        }
    }
}

export function modelReceiptingPointWithAccountingTypeToProtoReceiptingPointWithAccountingType(t: ModelReceiptingPointWithAccountingType): ProtoReceiptingPointWithAccountingType {
    switch (t) {
        case ModelReceiptingPointWithAccountingType.DEPARTMENT_STORE: {
            return ProtoReceiptingPointWithAccountingType.RECEIPTING_POINT_WITH_ACCOUNTING_DEPARTMENT_STORE
        }
        case ModelReceiptingPointWithAccountingType.STORE: {
            return ProtoReceiptingPointWithAccountingType.RECEIPTING_POINT_WITH_ACCOUNTING_STORE
        }
    }
}

export function protoSectionToModelSection(p: ProtoSection): ModelSection {
    return {
        id: p.getId(),
        departmentStoreId: p.getDepartmentStoreId(),
    }
}

export function protoHallToModelHall(p: ProtoHall): ModelHall {
    return {
        id: p.getId(),
        hallContainerId: p.getHallContainerId(),
        hallContainerType: protoHallContainerTypeToModelHallContainerType(p.getHallContainerType()),
        tradingPointId: p.getTradingPointId(),
        tradingPointType: protoTradingPointTypeToModelTradingPointType(p.getTradingPointType())
    }
}

export function protoHallContainerTypeToModelHallContainerType(t: ProtoHallContainerType): ModelHallContainerType {
    switch (t) {
        case ProtoHallContainerType.HALL_CONTAINER_SECTION: {
            return ModelHallContainerType.SECTION
        }
        case ProtoHallContainerType.HALL_CONTAINER_STORE: {
            return ModelHallContainerType.STORE
        }
    }
}