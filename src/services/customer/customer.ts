import { CreateRequest, CreateResponse, CustomerRequest, CustomerResponse, DeleteRequest, ListRequest, ListResponse, UpdateRequest } from "trade-organization-proto/gen/ts/customer/customer_pb";
import { BACKEND_URL } from "../../config/config";
import { CustomerServiceClient } from "trade-organization-proto/gen/ts/customer/CustomerServiceClientPb"
import { dateToProtoDate } from "../../services/core/mapper";
import * as grpc from 'grpc-web'
import { Customer as ModelCustomer } from "../../models/customer";
import { modelCustomerToProtoCustomer, protoCustomerToModelCustomer } from "./mapper";

export class CustomerService {

    private _client = new CustomerServiceClient(BACKEND_URL, null, null)

    async create(
        firstName: string,
        lastName: string,
        birthDate: Date,
        phoneNumber: string
    ): Promise<number> {
        const request = new CreateRequest()
        request.setFirstName(firstName)
        request.setLastName(lastName)
        request.setBirthDate(dateToProtoDate(birthDate))
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

    async list(): Promise<ModelCustomer[]> {
        const request = new ListRequest()

        return new Promise((resolve, reject) => {
            this._client.list(request, null, (err: grpc.RpcError, response: ListResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const customers = response.getCustomersList().map(protoCustomerToModelCustomer)
                    resolve(customers)
                }
            })
        })
    }

    async customer(id: number): Promise<ModelCustomer> {
        const request = new CustomerRequest()
        request.setId(id) 

        return new Promise((resolve, reject) => {
            this._client.customer(request, null, (err: grpc.RpcError, response: CustomerResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const customer = protoCustomerToModelCustomer(response.getCustomer()!!)
                    resolve(customer)
                }
            })
        })
    }

    async update(customer: ModelCustomer): Promise<number> {
        const request = new UpdateRequest()
        request.setCustomer(modelCustomerToProtoCustomer(customer))

        return new Promise((resolve, reject) => {
            this._client.update(request, null, (err: grpc.RpcError, response: CreateResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getId())
                }
            })
        })
    }

    async delete(id: number): Promise<number> {
        const request = new DeleteRequest()
        request.setId(id)

        return new Promise((resolve, reject) => {
            this._client.delete(request, null, (err: grpc.RpcError, response: CreateResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getId())
                }
            })
        })
    }
}