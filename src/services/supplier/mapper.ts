import { ProductSupplier, SupplierType as ProtoSupplierType } from "trade-organization-proto/gen/ts/supplier/supplier_pb"
import { SupplierType as ModelSupplierType } from "../../models/supplier"
import { Supplier as ProtoSupplier } from "trade-organization-proto/gen/ts/supplier/supplier_pb"
import { Supplier as ModelSupplier } from "../../models/supplier"
import { modelMoneyToProtoMoney, protoMoneyToModelMoney } from "../core/mapper"

export function protoSupplierTypeToModelSupplierType(
    t: ProtoSupplierType
): ModelSupplierType {
    switch (t) {
        case ProtoSupplierType.SUPPLIER_TYPE_AVAILABLE: {
            return ModelSupplierType.AVAILABLE
        }
        case ProtoSupplierType.SUPPLIER_TYPE_NOT_AVAILABLE: {
            return ModelSupplierType.NOT_AVAILABLE
        }
    }
}

export function modelSupplierTypeToProtoSupplierType(
    t: ModelSupplierType
): ProtoSupplierType {
    switch (t) {
        case ModelSupplierType.AVAILABLE: {
            return ProtoSupplierType.SUPPLIER_TYPE_AVAILABLE
        }
        case ModelSupplierType.NOT_AVAILABLE: {
            return ProtoSupplierType.SUPPLIER_TYPE_NOT_AVAILABLE
        }
    }
}

export function protoSupplierToModelSupplier(protoSupplier: ProtoSupplier): ModelSupplier {
    const supplier = {
        id: protoSupplier.getId(),
        name: protoSupplier.getName(),
        type: protoSupplierTypeToModelSupplierType(protoSupplier.getType()),
        products: protoSupplier.getProductsList().map(p => ({
            productId: p.getProductId(),
            price: protoMoneyToModelMoney(p.getPrice()!!)
        }))
    }

    return supplier
}

export function modelSupplierToProtoSupplier(modelSupplier: ModelSupplier): ProtoSupplier {
    const protoSupplier = new ProtoSupplier()
    protoSupplier.setId(modelSupplier.id)
    protoSupplier.setName(modelSupplier.name)
    protoSupplier.setType(modelSupplierTypeToProtoSupplierType(modelSupplier.type))
    modelSupplier.products.forEach(p => {
        const productSupplier = new ProductSupplier()
        productSupplier.setProductId(p.productId)
        productSupplier.setPrice(modelMoneyToProtoMoney(p.price))
        protoSupplier.addProducts(productSupplier)
    })
    return protoSupplier
}