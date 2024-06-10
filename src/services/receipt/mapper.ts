import { ProductReceipt as ProtoProductReceipt } from "trade-organization-proto/gen/ts/receipt/receipt_pb"
import { ProductReceipt as ModelProductReceipt } from "../../models/receipt"
import { modelMoneyToProtoMoney } from "../core/mapper"

export function protoProductReceiptToModelProductReceipt(
    product: ProtoProductReceipt
): ModelProductReceipt {
    return {
        productId: product.getProductId(),
        price: {
            rubles: product.getPrice()!!.getRubles(),
            pennies: product.getPrice()!!.getPennies(),
        },
        quantity: product.getQuantity()
    }
}

export function modelProductReceiptToProtoProductReceipt(
    product: ModelProductReceipt
): ProtoProductReceipt {
    const protoProduct = new ProtoProductReceipt()
    protoProduct.setProductId(product.productId)
    protoProduct.setQuantity(product.quantity)
    protoProduct.setPrice(modelMoneyToProtoMoney(product.price))
    return protoProduct
}