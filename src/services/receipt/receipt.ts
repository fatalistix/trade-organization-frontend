import { BACKEND_URL } from "../../config/config";
import { ReceiptServiceClient } from "trade-organization-proto/gen/ts/receipt/ReceiptServiceClientPb"
import { ProductReceipt as ModelProductReceipt } from "../../models/receipt"
import { ReceiptingPointWithAccountingType as ModelReceiptingPointWithAccountingType } from "../../models/receipting_point_with_accounting"
import { CreateWithAccountingRequest, CreateWithAccountingResponse } from "trade-organization-proto/gen/ts/receipt/receipt_pb";
import { modelProductReceiptToProtoProductReceipt } from "./mapper";
import * as grpc from 'grpc-web'
import { modelReceiptingPointWithAccountingTypeToProtoReceiptingPointWithAccountingType } from "../tradingpoint/mapper";

export class ReceiptService {

    private _client = new ReceiptServiceClient(BACKEND_URL, null, null)

    async createWithAccounting(
        sellerId: number,
        products: ModelProductReceipt[],
        customerId: number,
        receiptingPointWithAccountingId: number,
        receiptingPointWithAccountingType: ModelReceiptingPointWithAccountingType
    ): Promise<number> {
        const request = new CreateWithAccountingRequest()
        request.setSellerId(sellerId)

        const productsList = products.map(p => modelProductReceiptToProtoProductReceipt(p))
        request.setProductsList(productsList)
        request.setCustomerId(customerId)
        request.setReceiptingPointWithAccountingId(receiptingPointWithAccountingId)
        request.setReceiptingPointWithAccountingType(modelReceiptingPointWithAccountingTypeToProtoReceiptingPointWithAccountingType(receiptingPointWithAccountingType))

        return new Promise((resolve, reject) => {
            this._client.createWithAccounting(request, null, (err: grpc.RpcError, response: CreateWithAccountingResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getId())
                }
            })
        })
    }
}