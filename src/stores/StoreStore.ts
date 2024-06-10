import { defineStore } from "pinia";
import { Store } from "../models/store";
import { TradingPointService } from "../services/tradingpoint/tradingpoint";
import { HallContainerType } from "../models/hall_container";
import { TradingPointType } from "../models/trading_point";

interface State {
    store: Store | null
}

const service = new TradingPointService()

export const useStoreStore = defineStore('StoreStore', {
    state: (): State => ({
        store: null,
    }),
    getters: {

    },
    actions: {
        load(id: number): Promise<void> {
            return new Promise((resolve, reject) => {
                service.store(id).then(
                    store => {
                        this.store = store
                        resolve()
                    },
                    err => reject(err)
                )
            })
        },
        addHall(): Promise<void> {
            if (!this.store) {
                return new Promise((_, reject) => reject("no store"))
            } else {
                return service.addHall(
                    this.store.id, HallContainerType.STORE, this.store.id, TradingPointType.STORE
                )
            }
        }
    }
})