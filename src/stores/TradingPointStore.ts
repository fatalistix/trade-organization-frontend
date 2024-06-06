import { defineStore } from 'pinia'
import { Money } from '../models/core'
import { TradingPoint } from '../models/trading_point'

interface State {
    tradingPoints: TradingPoint[]
}

export const useTradingPointStore = defineStore('TradingPointStore', {
    state: (): State => ({
        tradingPoints: [],
    }),
    getters: {

    },
    actions: {

    }
})