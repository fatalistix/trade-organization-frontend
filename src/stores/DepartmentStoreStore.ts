import { defineStore } from "pinia";
import { DepartmentStore } from "../models/department_store";
import { Hall } from "../models/hall";
import { Section } from "../models/section";
import { HallContainerType } from "../models/hall_container";
import { TradingPointType } from "../models/trading_point";

interface State {
    departmentStore: DepartmentStore | null
    sections: Section[]
    halls: Hall[]
}

export const useDepartmentStoreStore = defineStore('DepartmentStoreStore', {
    state: (): State => ({
        departmentStore: null,
        sections: [],
        halls: []
    }),
    getters: {

    },
    actions: {

    }
})