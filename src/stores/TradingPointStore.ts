import { defineStore } from 'pinia'
import { TradingPoint, TradingPointType } from '../models/trading_point'
import { TradingPointService } from '../services/tradingpoint/tradingpoint'
import { Money } from '../models/core'

interface State {
    tradingPoints: TradingPoint[]
}

const service = new TradingPointService()

export const useTradingPointStore = defineStore('TradingPointStore', {
    state: (): State => ({
        tradingPoints: [],
    }),
    getters: {
        getByIdAndType: (state) => {
            return (id: number, type: TradingPointType) => state.tradingPoints.find(
                tradingPoint => (tradingPoint.id === id) && (tradingPoint.type === type)
            )
        }
    },
    actions: {
        updateTradingPoints(): Promise<void> {
            return new Promise((resolve, reject) => {
                service.list().then(
                    tradingPoints => {
                        this.tradingPoints = tradingPoints
                        resolve()
                    },
                    err => reject(err)
                )
            })
        },
        create(
            t: TradingPointType,
            areaPlot: number,
            rentalCharge: Money,
            counterCount: number,
            address: string
        ): Promise<number> {
            return service.register(t, areaPlot, rentalCharge, counterCount, address)
        },
        tradingPoint(id: number, type: TradingPointType): Promise<TradingPoint> {
            return service.tradingPoint(id, type)
        }
    }
})