import { defineStore } from 'pinia'
import { TradingPoint, TradingPointType } from '../models/trading_point'
import { TradingPointService } from '../services/trading_point'
import { Money } from '../models/core'

interface State {
    tradingPointList: TradingPoint[]
    tradingPoint: TradingPoint | null
}

const tradingPointService = new TradingPointService()

export const useTradingPointStore = defineStore('TradingPointStore', {
    state: (): State => ({
        tradingPointList: [],
        tradingPoint: null
    }),
    actions: {
        async updateList(): Promise<void> {
            return new Promise((resolve, reject) => {
                tradingPointService.list().then(
                    s => {
                        this.tradingPointList = s;
                        resolve()
                    },
                    e => {
                        reject(e)
                    }
                )
            })
        },
        async register(
            t: TradingPointType,
            areaPlot: number,
            rentalCharge: Money,
            counterCount: number,
            address: string
        ): Promise<void> {
            return new Promise((resolve, reject) => {
                tradingPointService.register(
                    t, areaPlot, rentalCharge, counterCount, address
                ).then(
                    _ => {
                        resolve()
                        this.updateList()
                    },
                    e => {
                        reject(e)
                    }
                )
            })
        }
    }
})