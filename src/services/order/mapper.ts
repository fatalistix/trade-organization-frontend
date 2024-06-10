import { ProductOrder as ProtoProductOrder } from "trade-organization-proto/gen/ts/order/order_pb";
import { ProductOrder as ModelProductOrder } from "../../models/order";
import { Money as ProtoMoney } from "trade-organization-proto/gen/ts/core/money_pb";
import { Order as ProtoOrder } from "trade-organization-proto/gen/ts/order/order_pb";
import { Order as ModelOrder } from "../../models/order";
import { OrderStatus as ModelOrderStatus } from "../../models/order";
import { OrderStatus as ProtoOrderStatus } from "trade-organization-proto/gen/ts/order/order_pb";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { Distribution as ProtoDistribution } from "trade-organization-proto/gen/ts/order/order_pb";
import { Distribution as ModelDistribution } from "../../models/order";
import { modelTradingPointTypeToProtoTradingPointType, protoTradingPointTypeToModelTradingPointType } from "../tradingpoint/mapper";

export function modelProductOrderToProtoProductOrder(po: ModelProductOrder): ProtoProductOrder {
    const protoPrice = new ProtoMoney()
    protoPrice.setRubles(po.price.rubles)
    protoPrice.setPennies(po.price.pennies)

    const protoProductOrder = new ProtoProductOrder()
    protoProductOrder.setProductId(po.productId)
    protoProductOrder.setQuantity(po.quantity)
    protoProductOrder.setPrice(protoPrice)

    return protoProductOrder
}

export function protoProductOrderToModelProductOrder(po: ProtoProductOrder): ModelProductOrder {
    return {
        productId: po.getProductId(),
        quantity: po.getQuantity(),
        price: {
            rubles: po.getPrice()!!.getRubles(),
            pennies: po.getPrice()!!.getPennies()
        }
    }
}

export function modelDistributionToProtoDistribution(d: ModelDistribution): ProtoDistribution {
    const protoDistribution = new ProtoDistribution() 
    protoDistribution.setTradingPointId(d.tradingPointId)
    protoDistribution.setTradingPointType(modelTradingPointTypeToProtoTradingPointType(d.tradingPointType))
    protoDistribution.setProductId(d.productId)
    protoDistribution.setQuantity(d.quantity)
    return protoDistribution
}

export function protoDistributionToModelDistribution(d: ProtoDistribution): ModelDistribution {
    return {
        tradingPointId: d.getTradingPointId(),
        tradingPointType: protoTradingPointTypeToModelTradingPointType(d.getTradingPointType()),
        productId: d.getProductId(),
        quantity: d.getQuantity()
    }
}

export function protoOrderStatusToModelOrderStatus(os: ProtoOrderStatus): ModelOrderStatus {
    switch (os) {
        case ProtoOrderStatus.ORDER_STATUS_CANCELLED: {
            return ModelOrderStatus.CANCELLED
        }
        case ProtoOrderStatus.ORDER_STATUS_IN_PROGRESS: {
            return ModelOrderStatus.IN_PROGRESS
        }
        case ProtoOrderStatus.ORDER_STATUS_COMPLETED: {
            return ModelOrderStatus.COMPLETED
        }
    }
}

export function modelOrderStatusToProtoOrderStatus(os: ModelOrderStatus): ProtoOrderStatus {
    switch (os) {
        case ModelOrderStatus.CANCELLED: {
            return ProtoOrderStatus.ORDER_STATUS_CANCELLED
        }
        case ModelOrderStatus.IN_PROGRESS: {
            return ProtoOrderStatus.ORDER_STATUS_IN_PROGRESS
        }
        case ModelOrderStatus.COMPLETED: {
            return ProtoOrderStatus.ORDER_STATUS_COMPLETED
        }
    }
}

export function protoOrderToModelOrder(o: ProtoOrder): ModelOrder {
    return {
        id: o.getId(),
        supplierId: o.getSupplierId(),
        createdAt: o.getCreatedAt()!!.toDate(),
        status: protoOrderStatusToModelOrderStatus(o.getStatus()),
        completedAt: o.getCompletedAt() ? o.getCompletedAt()!!.toDate() : null,
        cancelledAt: o.getCanceledAt() ? o.getCanceledAt()!!.toDate() : null,
        products: o.getProductsList().map(p => protoProductOrderToModelProductOrder(p)),
        distributions: o.getDistributionsList().map(d => protoDistributionToModelDistribution(d))
    }
}

export function modelOrderToProtoOrder(o: ModelOrder): ProtoOrder {
    const protoOrder = new ProtoOrder()
    protoOrder.setId(o.id)
    protoOrder.setSupplierId(o.supplierId)
    protoOrder.setCreatedAt(Timestamp.fromDate(o.createdAt))
    protoOrder.setStatus(modelOrderStatusToProtoOrderStatus(o.status))
    if (o.completedAt) {
        protoOrder.setCompletedAt(Timestamp.fromDate(o.completedAt))
    }
    if (o.cancelledAt) {
        protoOrder.setCanceledAt(Timestamp.fromDate(o.cancelledAt))
    }
    const productsList = o.products.map(p => modelProductOrderToProtoProductOrder(p))
    protoOrder.setProductsList(productsList)
    return protoOrder
}