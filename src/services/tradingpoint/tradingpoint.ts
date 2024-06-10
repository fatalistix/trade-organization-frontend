import { TradingPointServiceClient } from "trade-organization-proto/gen/ts/tradingpoint/TradingpointServiceClientPb"
import { RegisterRequest, RegisterResponse, ListResponse, AddSectionRequest, AddSectionResponse, AddHallRequest, DepartmentStoreRequest, DepartmentStoreResponse, StoreRequest, StoreResponse, TradingPointRequest, TradingPointResponse } from "trade-organization-proto/gen/ts/tradingpoint/tradingpoint_pb"
import { TradingPointType as ModelTradingPointType } from "../../models/trading_point"
import { Money as ModelMoney } from "../../models/core"
import * as grpc from 'grpc-web'
import { BACKEND_URL } from "../../config/config"
import { modelMoneyToProtoMoney } from "../core/mapper"
import { modelHallContainerTypeToProtoHallContainerType, modelTradingPointTypeToProtoTradingPointType, protoHallToModelHall, protoReceiptingPointWithAccountingToModelReceiptingPointWithAccounting, protoSectionToModelSection, protoTradingPointToModelTradingPoint, protoTradingPointTypeToModelTradingPointType } from "./mapper"
import { TradingPoint as ModelTradingPoint } from "../../models/trading_point"
import { Empty } from 'google-protobuf/google/protobuf/empty_pb'
import { isError } from "ts-try"
import { HallContainerType as ModelHallContainerType } from "../../models/hall_container"
import { DepartmentStore as ModelDepartmentStore } from "../../models/department_store"
import { DepartmentStore as ProtoDepartmentStore } from "trade-organization-proto/gen/ts/tradingpoint/tradingpoint_pb"
import { TradingPoint as ProtoTradingPoint } from "trade-organization-proto/gen/ts/tradingpoint/tradingpoint_pb"
import { ReceiptingPointWithAccounting as ProtoReceiptingPointWithAccounting } from "trade-organization-proto/gen/ts/tradingpoint/tradingpoint_pb"
import { Store as ModelStore } from "../../models/store"
import { Store as ProtoStore } from "trade-organization-proto/gen/ts/tradingpoint/tradingpoint_pb"

export class TradingPointService {

    private _client = new TradingPointServiceClient(BACKEND_URL, null, null)

    async register(
        t: ModelTradingPointType,
        areaPlot: number,
        rentalCharge: ModelMoney,
        counterCount: number,
        address: string
    ): Promise<number> {
        const tProto = modelTradingPointTypeToProtoTradingPointType(t)

        const request = new RegisterRequest()
        request.setType(tProto)
        request.setAreaPlot(areaPlot)
        request.setRentalCharge(modelMoneyToProtoMoney(rentalCharge))
        request.setCounterCount(counterCount)
        request.setAddress(address)

        return new Promise((resolve, reject) => {
            this._client.register(request, null, (err: grpc.RpcError, response: RegisterResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getId())
                }
            })
        })
    }

    async list(): Promise<ModelTradingPoint[]> {
        return new Promise((resolve, reject) => {
            this._client.list(new Empty(), null, (err: grpc.RpcError, response: ListResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const modelTradingPointList = response.getTradingPointsList().map(p => {
                        const m = protoTradingPointToModelTradingPoint(p)
                        if (isError(m)) {
                            reject("wrong trading point")
                        }
                        return m as ModelTradingPoint
                    })

                    resolve(modelTradingPointList)
                }
            })
        })
    }

    async tradingPoint(id: number, type: ModelTradingPointType): Promise<ModelTradingPoint> {
        const request = new TradingPointRequest()
        request.setId(id)
        request.setType(modelTradingPointTypeToProtoTradingPointType(type))

        return new Promise((resolve, reject) => {
            this._client.tradingPoint(request, null, (err: grpc.RpcError, response: TradingPointResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const modelTradingPoint = protoTradingPointToModelTradingPoint(response.getTradingPoint()!!)
                    
                    resolve(modelTradingPoint)
                }
            })  
        })
    }

    async addSection(
        departmentStoreId: number
    ): Promise<number> {
        return new Promise((resolve, reject) => {
            const request = new AddSectionRequest().setDepartmentStoreId(departmentStoreId)

            this._client.addSection(request, null, (err: grpc.RpcError, response: AddSectionResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getId())
                }
            })
        })
    }

    async addHall(
        hallContainerId: number,
        hallContainerType: ModelHallContainerType,
        tradingPointId: number,
        tradingPointType: ModelTradingPointType,
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = new AddHallRequest()

            request.setHallContainerId(hallContainerId)
            request.setHallContainerType(modelHallContainerTypeToProtoHallContainerType(hallContainerType))
            request.setTradingPointId(tradingPointId)
            request.setTradingPointType(modelTradingPointTypeToProtoTradingPointType(tradingPointType))

            this._client.addHall(request, null, (err: grpc.RpcError, response: Empty) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    async departmentStore(
        id: number
    ): Promise<ModelDepartmentStore> {
        return new Promise((resolve, reject) => {
            const request = new DepartmentStoreRequest().setId(id)

            this._client.departmentStore(request, null, (err: grpc.RpcError, response: DepartmentStoreResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const protoDepartmentStore = response.getDepartmentStore() as ProtoDepartmentStore

                    const tradingPoint = protoTradingPointToModelTradingPoint(protoDepartmentStore.getTradingPoint() as ProtoTradingPoint)
                    if (isError(tradingPoint)) {
                        reject("wrong trading point")
                    }

                    const receiptingPointWithAccounting = protoReceiptingPointWithAccountingToModelReceiptingPointWithAccounting(protoDepartmentStore.getReceiptingPointWithAccounting() as ProtoReceiptingPointWithAccounting)

                    const modelDepartmentStore = {
                        id: protoDepartmentStore.getId(),
                        tradingPoint: tradingPoint as ModelTradingPoint,
                        receiptingPointWithAccounting: receiptingPointWithAccounting,
                        sections: protoDepartmentStore.getSectionsList().map(s => protoSectionToModelSection(s)),
                        halls: protoDepartmentStore.getHallsList().map(h => protoHallToModelHall(h)),
                    }

                    resolve(modelDepartmentStore)
                }
            })
        })
    }

    async store(
        id: number
    ): Promise<ModelStore> {
        return new Promise((resolve, reject) => {
            const request = new StoreRequest().setId(id)

            this._client.store(request, null, (err: grpc.RpcError, response: StoreResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const protoStore = response.getStore() as ProtoStore

                    const tradingPoint = protoTradingPointToModelTradingPoint(protoStore.getTradingPoint() as ProtoTradingPoint)
                    if (isError(tradingPoint)) {
                        reject("wrong trading point")
                    }

                    const receiptingPointWithAccounting = protoReceiptingPointWithAccountingToModelReceiptingPointWithAccounting(protoStore.getReceiptingPointWithAccounting() as ProtoReceiptingPointWithAccounting)

                    const modelStore = {
                        id: protoStore.getId(),
                        tradingPoint: tradingPoint as ModelTradingPoint,
                        receiptingPointWithAccounting: receiptingPointWithAccounting,
                        halls: protoStore.getHallsList().map(h => protoHallToModelHall(h)),
                    }

                    resolve(modelStore)
                }
            })
        })
    }
}