import { Product as ProtoProduct } from "trade-organization-proto/gen/ts/product/product_pb";
import { Product as ModelProduct } from "../../models/product";

export function protoProductToModelProduct(protoProduct: ProtoProduct): ModelProduct {
    return {
        id: protoProduct.getId(),
        name: protoProduct.getName(),
        description: protoProduct.getDescription()
    }
}

export function modelProductToProtoProduct(modelProduct: ModelProduct): ProtoProduct {
    const protoProduct = new ProtoProduct()
    protoProduct.setId(modelProduct.id)
    protoProduct.setName(modelProduct.name)
    protoProduct.setDescription(modelProduct.description)
    return protoProduct
}