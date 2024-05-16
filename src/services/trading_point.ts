import { TradingPointServiceClient } from "trade-organization-proto/gen/ts/tradingpoint/Trading_pointServiceClientPb"
import { RegisterRequest, RegisterResponse, ListResponse } from "trade-organization-proto/gen/ts/tradingpoint/trading_point_pb"
import { TradingPointType as ModelType } from "../models/trading_point"
import { Money as ModelMoney } from "../models/core"
import * as grpc from 'grpc-web'
import { BACKEND_URL } from "../config/config"
import { modelMoneyToProtoMoney, modelTradingPointTypeToProtoTradingPointType, protoMoneyToModelMoney, protoTradingPointTypeToModelTradingPointType } from "./converters"
import { TradingPoint as ModelTradingPoint } from "../models/trading_point"
import { Empty } from 'google-protobuf/google/protobuf/empty_pb'
import { Money as ProtoMoney } from "trade-organization-proto/gen/ts/core/money_pb"

export class TradingPointService {

    private _client = new TradingPointServiceClient(BACKEND_URL, null, null)

    async register(
        t: ModelType,
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
                    resolve(response.getTradingPointsList().map(p => ({
                        id: p.getId(),
                        type: protoTradingPointTypeToModelTradingPointType(p.getType()),
                        areaPlot: p.getAreaPlot(),
                        rentalCharge: protoMoneyToModelMoney(p.getRentalCharge() as ProtoMoney),
                        counterCount: p.getCounterCount(),
                        address: p.getAddress(),
                    })))
                }
            })
        })
    }
}