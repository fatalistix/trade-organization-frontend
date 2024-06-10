import { defineStore } from "pinia";
import { DepartmentStore } from "../models/department_store";
import { TradingPointService } from "../services/tradingpoint/tradingpoint";
import { HallContainerType } from "../models/hall_container";
import { TradingPointType } from "../models/trading_point";

interface State {
    departmentStore: DepartmentStore | null
}

const service = new TradingPointService()

export const useDepartmentStoreStore = defineStore('DepartmentStoreStore', {
    state: (): State => ({
        departmentStore: null,
    }),
    getters: {

    },
    actions: {
        load(id: number): Promise<void> {
            return new Promise((resolve, reject) => {
                service.departmentStore(id).then(
                    departmentStore => {
                        this.departmentStore = departmentStore
                        resolve()
                    },
                    err => reject(err)
                )
            })   
        },
        addHall(sectionId: number): Promise<void> {
            if (!this.departmentStore) {
                return new Promise((_, reject) => reject("no department store"))
            } else {
                return service.addHall(
                    sectionId, HallContainerType.SECTION, this.departmentStore.id, TradingPointType.DEPARTMENT_STORE
                )
            }
        },
        addSection(): Promise<number> {
            if (!this.departmentStore) {
                return new Promise((_, reject) => reject("no department store"))
            } else {
                return service.addSection(this.departmentStore.id)
            }
        },
    }
})