import { ProductApplication as ProtoProductApplication } from "trade-organization-proto/gen/ts/application/application_pb";
import { ProductApplication as ModelProductApplication } from "../../models/application";
import { Application as ProtoApplication } from "trade-organization-proto/gen/ts/application/application_pb";
import { Application as ModelApplication } from "../../models/application";
import { modelTradingPointTypeToProtoTradingPointType, protoTradingPointTypeToModelTradingPointType } from "../tradingpoint/mapper";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

export function modelProductApplicationToProtoProductApplication(pa: ModelProductApplication): ProtoProductApplication {
    const protoProductApplication = new ProtoProductApplication()
    protoProductApplication.setProductId(pa.productId)
    protoProductApplication.setQuantity(pa.quantity)
    return protoProductApplication 
}

export function protoProductApplicationToModelProductApplication(pa: ProtoProductApplication): ModelProductApplication {
    return {
        productId: pa.getProductId(),
        quantity: pa.getQuantity()
    }
}

export function protoApplicationToModelApplication(pa: ProtoApplication): ModelApplication {
    return {
        id: pa.getId(),
        tradingPointId: pa.getTradingPointId(),
        tradingPointType: protoTradingPointTypeToModelTradingPointType(pa.getTradingPointType()),
        createdAt: pa.getCreatedAt()!!.toDate(),
        products: pa.getProductsList().map(p => protoProductApplicationToModelProductApplication(p)),
        orderId: pa.hasOrderId() ? pa.getOrderId() : null
    }
}

export function modelApplicationToProtoApplication(ma: ModelApplication): ProtoApplication {
    const protoApplication = new ProtoApplication()
    protoApplication.setId(ma.id)
    protoApplication.setTradingPointId(ma.tradingPointId)
    protoApplication.setTradingPointType(modelTradingPointTypeToProtoTradingPointType(ma.tradingPointType))
    protoApplication.setCreatedAt(Timestamp.fromDate(ma.createdAt))
    const productsList = ma.products.map(p => modelProductApplicationToProtoProductApplication(p))
    protoApplication.setProductsList(productsList)

    if (ma.orderId) {
        protoApplication.setOrderId(ma.orderId)
    }

    return protoApplication
}