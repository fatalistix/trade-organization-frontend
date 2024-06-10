import { ProductServiceClient } from "trade-organization-proto/gen/ts/product/ProductServiceClientPb"
import { BACKEND_URL } from "../../config/config"
import { CreateRequest, CreateResponse, ListRequest, ListResponse, ProductRequest, ProductResponse, UpdateRequest, UpdateResponse } from "trade-organization-proto/gen/ts/product/product_pb"
import * as grpc from 'grpc-web'
import { Product as ModelProduct } from "../../models/product"
import { modelProductToProtoProduct, protoProductToModelProduct } from "./mapper"

export class ProductService {

    private _client = new ProductServiceClient(BACKEND_URL, null, null)

    async create(
        name: string,
        description: string
    ): Promise<number> {
        const request = new CreateRequest()
        request.setName(name)
        request.setDescription(description)

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

    async list(): Promise<ModelProduct[]> {
        return new Promise((resolve, reject) => {
            this._client.list(new ListRequest(), null, (err: grpc.RpcError, response: ListResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const modelProducts = response.getProductsList().map(p => protoProductToModelProduct(p))
                    resolve(modelProducts)
                }
            })
        })
    }

    async product(id: number): Promise<ModelProduct> {
        return new Promise((resolve, reject) => {
            this._client.product(new ProductRequest().setId(id), null, (err: grpc.RpcError, response: ProductResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const modelProduct = protoProductToModelProduct(response.getProduct()!!)
                    resolve(modelProduct)
                }
            })
        })
    }

    async update(
        id: number,
        name: string,
        description: string
    ): Promise<number> {
        const request = new UpdateRequest()
        request.setProduct(modelProductToProtoProduct({ id, name, description }))

        return new Promise((resolve, reject) => {
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