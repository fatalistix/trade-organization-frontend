import { CreateRequest, CreateResponse, ListRequest, ListResponse, SupplierRequest, SupplierResponse, UpdateRequest } from "trade-organization-proto/gen/ts/supplier/supplier_pb";
import { BACKEND_URL } from "../../config/config";
import { SupplierServiceClient } from "trade-organization-proto/gen/ts/supplier/SupplierServiceClientPb"
import * as grpc from 'grpc-web'
import { Supplier } from "../../models/supplier";
import { modelSupplierToProtoSupplier, protoSupplierToModelSupplier } from "./mapper";
import { UpdateResponse } from "trade-organization-proto/gen/ts/product/product_pb";

export class SupplierService {

    private _client = new SupplierServiceClient(BACKEND_URL, null, null)

    async create(
        name: string,
    ): Promise<number> {
        const request = new CreateRequest()
        request.setName(name)

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

    async list(): Promise<Supplier[]> {
        return new Promise((resolve, reject) => {
            this._client.list(new ListRequest(), null, (err: grpc.RpcError, response: ListResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const supplierList = response.getSuppliersList().map(s => protoSupplierToModelSupplier(s))

                    resolve(supplierList)
                }
            })
        })
    }

    async supplier(id: number): Promise<Supplier> {
        return new Promise((resolve, reject) => {
            const request = new SupplierRequest()
            request.setId(id)

            this._client.supplier(request, null, (err: grpc.RpcError, response: SupplierResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const supplier = protoSupplierToModelSupplier(response.getSupplier()!!)

                    resolve(supplier)
                }
            })
        })
    }

    async update(supplier: Supplier): Promise<number> {
        return new Promise((resolve, reject) => {
            const request = new UpdateRequest()
            request.setSupplier(modelSupplierToProtoSupplier(supplier))

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

