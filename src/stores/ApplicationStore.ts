import { defineStore } from "pinia";
import { Application, ProductApplication } from "../models/application";
import { TradingPointType } from "../models/trading_point";
import { ApplicationService } from "../services/application/application";

interface State {
    applications: Application[]
}

const service = new ApplicationService()

export const useApplicationStore = defineStore("ApplicationStore", {
    state: (): State => ({
        applications: [],
    }),
    getters: {
        getById: (state) => {
            return (id: number) => state.applications.find(application => application.id === id)
        }
    },
    actions: {
        create(
            tradingPointId: number,
            tradingPointType: TradingPointType,
            products: ProductApplication[],
        ): Promise<number> {
            return service.create(tradingPointId, tradingPointType, products)
        },
        updateApplications(): Promise<void> {
            return new Promise((resolve, reject) => {
                service.list().then(
                    applications => {
                        this.applications = applications
                        resolve()
                    },
                    err => reject(err)
                )
            })
        },
        application(id: number): Promise<Application> {
            return service.application(id)
        },
        update(application: Application): Promise<number> {
            return service.update(application)
        }
    }
})