import { Hall } from "./hall"
import { ReceiptingPointWithAccounting } from "./receipting_point_with_accounting";
import { Section } from "./section";
import { TradingPoint } from "./trading_point";

export interface DepartmentStore {
    id: number,
    tradingPoint: TradingPoint
    receiptingPointWithAccounting: ReceiptingPointWithAccounting
    sections: Section[]
    halls: Hall[]
}