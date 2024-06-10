import { Hall } from "./hall"
import { ReceiptingPointWithAccounting } from "./receipting_point_with_accounting"
import { TradingPoint } from "./trading_point"

export interface Store {
    id: number,
    tradingPoint: TradingPoint
    receiptingPointWithAccounting: ReceiptingPointWithAccounting
    halls: Hall[]
}
