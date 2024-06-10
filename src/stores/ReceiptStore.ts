import { defineStore } from "pinia";
import { ProductReceipt, Receipt } from "../models/receipt";
import { ReceiptService } from "../services/receipt/receipt";
import { ReceiptingPointWithAccountingType } from "../models/receipting_point_with_accounting";

interface State {
    receipts: Receipt[]
}

const service = new ReceiptService()

export const useReceiptStore = defineStore("ReceiptStore", {
    state: (): State => ({
        receipts: [],
    }),
    getters: {
        getById: (state) => {
            return (id: number) => state.receipts.find(receipt => receipt.id === id)
        },
    },
    actions: {
        createWithAccounting(
            sellerId: number, 
            products: ProductReceipt[], 
            customerId: number, 
            receiptingPointWithAccountingId: number, 
            receiptingPointWithAccountingType: ReceiptingPointWithAccountingType
        ): Promise<number> {
            return service.createWithAccounting(
                sellerId, products, customerId, receiptingPointWithAccountingId, receiptingPointWithAccountingType)
        },
    },
})