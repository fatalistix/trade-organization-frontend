export interface ReceiptingPointWithAccounting {
    id: number
    type: ReceiptingPointWithAccountingType
}

export enum ReceiptingPointWithAccountingType {
    DEPARTMENT_STORE = "department_store",
    STORE = "store",
}