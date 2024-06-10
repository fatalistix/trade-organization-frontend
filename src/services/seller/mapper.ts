import { WorksAt as ProtoWorksAt, PlaceOfWork as ProtoPlaceOfWork, TradingPoint as ProtoTradingPoint } from "trade-organization-proto/gen/ts/seller/seller_pb";
import { WorksAt as ModelWorksAt } from "../../models/seller";
import { modelPlaceOfWorkTypeToProtoPlaceOfWorkType, modelTradingPointTypeToProtoTradingPointType, protoPlaceOfWorkTypeToModelPlaceOfWorkType, protoTradingPointTypeToModelTradingPointType } from "../tradingpoint/mapper";
import { Seller as ProtoSeller } from "trade-organization-proto/gen/ts/seller/seller_pb";
import { Seller as ModelSeller } from "../../models/seller";
import { Date as ProtoDate } from "trade-organization-proto/gen/ts/core/date_pb";
import { Money as ProtoMoney } from "trade-organization-proto/gen/ts/core/money_pb";
import { protoDateToDate, protoMoneyToModelMoney } from "../core/mapper";

export function protoWorksAtToModelWorksAt(protoWorksAt: ProtoWorksAt): ModelWorksAt {
    return {
        placeOfWork: {
            id: (protoWorksAt.getPlaceOfWork() as ProtoPlaceOfWork).getId(),
            type: protoPlaceOfWorkTypeToModelPlaceOfWorkType((protoWorksAt.getPlaceOfWork() as ProtoPlaceOfWork).getType()),
        },
        tradingPoint: {
            id: (protoWorksAt.getTradingPoint() as ProtoTradingPoint).getId(),
            type: protoTradingPointTypeToModelTradingPointType((protoWorksAt.getTradingPoint() as ProtoTradingPoint).getType()),
        },
    }
}

export function modelWorksAtToProtoWorksAt(modelWorksAt: ModelWorksAt): ProtoWorksAt {
    return new ProtoWorksAt()
        .setPlaceOfWork(new ProtoPlaceOfWork()
            .setId(modelWorksAt.placeOfWork.id)
            .setType(modelPlaceOfWorkTypeToProtoPlaceOfWorkType(modelWorksAt.placeOfWork.type))
        )
        .setTradingPoint(new ProtoTradingPoint()
            .setId(modelWorksAt.tradingPoint.id)
            .setType(modelTradingPointTypeToProtoTradingPointType(modelWorksAt.tradingPoint.type))
        )
}

export function protoSellerToModelSeller(protoSeller: ProtoSeller): ModelSeller {
    return {
        id: protoSeller.getId(),
        firstName: protoSeller.getFirstName(),
        lastName: protoSeller.getLastName(),
        middleName: protoSeller.getMiddleName(),
        birthDate: protoDateToDate(protoSeller.getBirthDate() as ProtoDate),
        salary: protoMoneyToModelMoney(protoSeller.getSalary() as ProtoMoney),
        phoneNumber: protoSeller.getPhoneNumber(),
        worksAt: protoSeller.getWorksAt() ? protoWorksAtToModelWorksAt(protoSeller.getWorksAt() as ProtoWorksAt) : null,
    }
}