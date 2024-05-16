import { defineStore } from 'pinia'
import { TradingPoint } from '../models/trading_point'
import { TradingPointService } from '../services/trading_point'

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
    }
})