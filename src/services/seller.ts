import { SellerServiceClient } from "trade-organization-proto/gen/ts/seller/SellerServiceClientPb"
import { BACKEND_URL } from "../config/config"
import { Money as ModelMoney } from "../models/core"
import { 
    PlaceOfWorkType as ModelPlaceOfWorkType, 
    TradingPointType as ModelTradingPointType 
} from "../models/trading_point"
import { ListByTradingPointRequest, ListByTradingPointResponse, RegisterRequest, RegisterResponse } from "trade-organization-proto/gen/ts/seller/seller_pb"
import { dateToProtoDate, modelMoneyToProtoMoney, modelPlaceOfWorkTypeToProtoPlaceOfWorkType, modelTradingPointTypeToProtoTradingPointType, protoDateToDate, protoMoneyToModelMoney, protoPlaceOfWorkTypeToModelPlaceOfWorkType, protoTradingPointTypeToModelTradingPointType } from "./converters"
import { Money as ProtoMoney } from "trade-organization-proto/gen/ts/core/money_pb"
import { Seller as ModelSeller } from "../models/seller"
import { Date as ProtoDate } from "trade-organization-proto/gen/ts/core/date_pb"
import * as grpc from 'grpc-web'

export class SellerService {

    private _client = new SellerServiceClient(BACKEND_URL, null, null)

    async register(
        firstName: string,
        lastName: string,
        middleName: string,
        birthDate: Date,
        salary: ModelMoney,
        phoneNumber: string,
        placeOfWorkId: number,
        placeOfWorkType: ModelPlaceOfWorkType,
        tradingPointId: number,
        tradingPointType: ModelTradingPointType,
    ): Promise<number> {
        const request = new RegisterRequest()
        request.setFirstName(firstName)
        request.setLastName(lastName)
        request.setMiddleName(middleName)
        request.setBirthDate(dateToProtoDate(birthDate))
        request.setSalary(modelMoneyToProtoMoney(salary))
        request.setPhoneNumber(phoneNumber)
        request.setPlaceOfWorkId(placeOfWorkId)
        request.setPlaceOfWorkType(modelPlaceOfWorkTypeToProtoPlaceOfWorkType(placeOfWorkType))
        request.setTradingPointId(tradingPointId)
        request.setTradingPointType(modelTradingPointTypeToProtoTradingPointType(tradingPointType))

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

    async listByTradingPoint(
        tradingPointId: number,
        tradingPointType: ModelTradingPointType
    ): Promise<ModelSeller[]> {
        const request = new ListByTradingPointRequest()
        request.setTradingPointId(tradingPointId)
        request.setTradingPointType(modelTradingPointTypeToProtoTradingPointType(tradingPointType))

        return new Promise((resolve, reject) => {
            this._client.listByTradingPoint(request, null, (err: grpc.RpcError, response: ListByTradingPointResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getSellerList().map(s => ({
                        id: s.getId(),
                        firstName: s.getFirstName(),
                        lastName: s.getLastName(),
                        middleName: s.getMiddleName(),
                        birthDate: protoDateToDate(s.getBirthDate() as ProtoDate),
                        salary: protoMoneyToModelMoney(s.getSalary() as ProtoMoney),
                        phoneNumber: s.getPhoneNumber(),
                        placeOfWorkId: s.getPlaceOfWorkId(),
                        placeOfWorkType: protoPlaceOfWorkTypeToModelPlaceOfWorkType(s.getPlaceOfWorkType()),
                        tradingPointId: s.getTradingPointId(),
                        tradingPointType: protoTradingPointTypeToModelTradingPointType(s.getTradingPointType()),
                    })))
                }
            })
        })
    }
}

export const sellerService = new SellerService()