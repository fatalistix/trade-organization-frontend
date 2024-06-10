import { Money } from "./core"

export interface Receipt {
    id: number
    type: ReceiptType
    createdAt: Date
    sellerId: number
    products: ProductReceipt[]
}

export enum ReceiptType {
    RECEIPT_WITH_ACCOUNTING = "RECEIPT_WITH_ACCOUNTING",
    RECEIPT_WITHOUT_ACCOUNTING = "RECEIPT_WITHOUT_ACCOUNTING"
}

export interface ProductReceipt {
    quantity: number
    price: Money
    productId: number
}

