import { SellerServiceClient } from "trade-organization-proto/gen/ts/seller/SellerServiceClientPb"
import { BACKEND_URL } from "../../config/config"
import { Money as ModelMoney } from "../../models/core"
import { ListRequest, ListResponse, NewWorksAt, CreateRequest, CreateResponse, PatchRequest, PatchResponse, WorksAt, WorksAtFilterType, SellerRequest, SellerResponse } from "trade-organization-proto/gen/ts/seller/seller_pb"
import { dateToProtoDate, modelMoneyToProtoMoney, protoDateToDate } from "../core/mapper"
import { Money as ProtoMoney } from "trade-organization-proto/gen/ts/core/money_pb"
import { Seller as ModelSeller, SellerFilter as ModelSellerFilter, WorksAtFilterType as ModelWorksAtFilterType } from "../../models/seller"
import { Date as ProtoDate } from "trade-organization-proto/gen/ts/core/date_pb"
import * as grpc from 'grpc-web'
import { isError } from "ts-try"
import { modelWorksAtToProtoWorksAt, protoSellerToModelSeller, protoWorksAtToModelWorksAt } from "./mapper"
import { modelPlaceOfWorkTypeToProtoPlaceOfWorkType, modelTradingPointTypeToProtoTradingPointType } from "../tradingpoint/mapper"
import { NewWorksAt as ModelNewWorksAt } from "../../models/seller"
import { Seller as ProtoSeller } from "trade-organization-proto/gen/ts/seller/seller_pb";

export class SellerService {

    private _client = new SellerServiceClient(BACKEND_URL, null, null)

    async create(
        firstName: string,
        lastName: string,
        middleName: string,
        birthDate: Date,
        salary: ModelMoney,
        phoneNumber: string,
    ): Promise<number> {
        const request = new CreateRequest()
        request.setFirstName(firstName)
        request.setLastName(lastName)
        request.setMiddleName(middleName)
        request.setBirthDate(dateToProtoDate(birthDate))
        request.setSalary(modelMoneyToProtoMoney(salary))
        request.setPhoneNumber(phoneNumber)

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

    async list(
        filter: ModelSellerFilter
    ): Promise<ModelSeller[]> {
        const request = new ListRequest()

        switch (filter.worksAtFilterType) {
            case ModelWorksAtFilterType.ALL:
                request.setWorksAtFilter(WorksAtFilterType.WORKS_AT_FILTER_TYPE_ALL)
                break
            case ModelWorksAtFilterType.ONLY_NULL:
                request.setWorksAtFilter(WorksAtFilterType.WORKS_AT_FILTER_TYPE_ONLY_NULL)
                break
            case ModelWorksAtFilterType.ONLY_NOT_NULL:
                request.setWorksAtFilter(WorksAtFilterType.WORKS_AT_FILTER_TYPE_ONLY_NOT_NULL)
                break
        }

        if (filter.tradingPointId) {
            request.setTradingPointId(filter.tradingPointId)
        }

        if (filter.tradingPointType) {
            request.setTradingPointType(modelTradingPointTypeToProtoTradingPointType(filter.tradingPointType))
        }

        if (filter.placeOfWorkId) {
            request.setPlaceOfWorkId(filter.placeOfWorkId)
        }

        if (filter.placeOfWorkType) {
            request.setPlaceOfWorkType(modelPlaceOfWorkTypeToProtoPlaceOfWorkType(filter.placeOfWorkType))
        }

        if (filter.search) {
            request.setSearch(filter.search)
        }

        return new Promise((resolve, reject) => {
            this._client.list(request, null, (err: grpc.RpcError, response: ListResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getSellersList().map(s => {
                        const worksAt = s.getWorksAt() ? protoWorksAtToModelWorksAt(s.getWorksAt() as WorksAt) : null

                        if (!s.getSalary()) {
                            reject("seller without salary")
                        }

                        const protoSalary = s.getSalary() as ProtoMoney

                        const modelSalary = ModelMoney.from(protoSalary.getRubles(), protoSalary.getPennies())
                        if (isError(modelSalary)) {
                            reject("wrong salary")
                        }

                        return {
                            id: s.getId(),
                            firstName: s.getFirstName(),
                            lastName: s.getLastName(),
                            middleName: s.getMiddleName(),
                            birthDate: protoDateToDate(s.getBirthDate() as ProtoDate),
                            salary: modelSalary as ModelMoney,
                            phoneNumber: s.getPhoneNumber(),
                            worksAt: worksAt,
                        }
                    }))
                }
            })
        })
    }

    async seller(id: number): Promise<ModelSeller> {
        const request = new SellerRequest()
        request.setId(id)

        return new Promise((resolve, reject) => {
            this._client.seller(request, null, (err: grpc.RpcError, response: SellerResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const seller = protoSellerToModelSeller(response.getSeller() as ProtoSeller)
                    resolve(seller)
                }
            })
        })
    }

    async patch(
        id: number,
        firstName: string | null,
        lastName: string | null,
        middleName: string | null,
        birthDate: Date | null,
        salary: ModelMoney | null,
        phoneNumber: string | null,
        worksAt: ModelNewWorksAt | null
    ): Promise<number> {
        const request = new PatchRequest()
        request.setId(id)
        if (firstName) {
            request.setFirstName(firstName)
        }
        if (lastName) {
            request.setLastName(lastName)
        }
        if (middleName) {
            request.setMiddleName(middleName)
        }
        if (birthDate) {
            request.setBirthDate(dateToProtoDate(birthDate))
        }
        if (salary) {
            request.setSalary(modelMoneyToProtoMoney(salary))
        }
        if (phoneNumber) {
            request.setPhoneNumber(phoneNumber)
        }
        if (worksAt) {
            const protoNewWorksAt = new NewWorksAt()
            if (worksAt.worksAt) {
                protoNewWorksAt.setWorksAt(modelWorksAtToProtoWorksAt(worksAt.worksAt))
            }
            request.setWorksAt(protoNewWorksAt)
        }

        return new Promise((resolve, reject) => {
            this._client.patch(request, null, (err: grpc.RpcError, response: PatchResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getId())
                }
            })
        })
    }
}