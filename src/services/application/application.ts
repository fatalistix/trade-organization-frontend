import { BACKEND_URL } from "../../config/config";
import { ApplicationServiceClient } from "trade-organization-proto/gen/ts/application/ApplicationServiceClientPb"
import { TradingPointType as ModelTradingPointType } from "../../models/trading_point";
import { Application, ProductApplication as ModelProductApplication } from "../../models/application";
import { ApplicationRequest, ApplicationResponse, CreateRequest, CreateResponse, ListRequest, ListResponse, UpdateRequest, UpdateResponse } from "trade-organization-proto/gen/ts/application/application_pb";
import { modelTradingPointTypeToProtoTradingPointType } from "../tradingpoint/mapper";
import { modelApplicationToProtoApplication, modelProductApplicationToProtoProductApplication, protoApplicationToModelApplication } from "./mapper";
import * as grpc from 'grpc-web'

export class ApplicationService {

    private _client = new ApplicationServiceClient(BACKEND_URL, null, null)

    async create(
        tradingPointId: number,
        tradingPointType: ModelTradingPointType,
        products: ModelProductApplication[],
    ): Promise<number> {
        const request = new CreateRequest()
        request.setTradingPointId(tradingPointId)
        request.setTradingPointType(modelTradingPointTypeToProtoTradingPointType(tradingPointType))

        const productsList = products.map(p => modelProductApplicationToProtoProductApplication(p))
        request.setProductsList(productsList)

        return new Promise((resolve, reject) => {
            this._client.create(request, null, (err: grpc.RpcError, response: CreateResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getId())
                }
            })
        })
    }

    async list(): Promise<Application[]> {
        return new Promise((resolve, reject) => {
            this._client.list(new ListRequest(), null, (err: grpc.RpcError, response: ListResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const applications = response.getApplicationsList().map(a => protoApplicationToModelApplication(a))
                    resolve(applications)
                }
            })
        })
    }

    async application(id: number): Promise<Application> {
        return new Promise((resolve, reject) => {
            const request = new ApplicationRequest()
            request.setId(id)

            this._client.application(request, null, (err: grpc.RpcError, response: ApplicationResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const application = protoApplicationToModelApplication(response.getApplication()!!)
                    resolve(application)
                }
            })
        })
    }

    async update(application: Application): Promise<number> {
        const request = new UpdateRequest()
        request.setApplication(modelApplicationToProtoApplication(application))

        return new Promise ((resolve, reject) => {
            this._client.update(request, null, (err: grpc.RpcError, response: UpdateResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getId())
                }
            })
        })
    }
}
