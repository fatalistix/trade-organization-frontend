import { HallContainerType } from "./hall_container";
import { TradingPointType } from "./trading_point";

export interface Hall {
    id: number
    hallContainerId: number
    hallContainerType: HallContainerType
    tradingPointId: number
    tradingPointType: TradingPointType
}