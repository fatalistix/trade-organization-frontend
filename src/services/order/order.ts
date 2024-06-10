import { BACKEND_URL } from "../../config/config";
import { OrderServiceClient } from "trade-organization-proto/gen/ts/order/OrderServiceClientPb"
import { ProductOrder as ModelProductOrder } from "../../models/order"
import { CancelRequest, CancelResponse, CompleteRequest, CompleteResponse, CreateRequest, CreateResponse, ListRequest, ListResponse, OrderRequest, OrderResponse, UpdateRequest } from "trade-organization-proto/gen/ts/order/order_pb";
import { modelOrderToProtoOrder, modelProductOrderToProtoProductOrder, protoOrderToModelOrder } from "./mapper";
import * as grpc from 'grpc-web'
import { Order as ModelOrder } from "../../models/order";
import { UpdateResponse } from "trade-organization-proto/gen/ts/product/product_pb";

export class OrderService {

    private _client = new OrderServiceClient(BACKEND_URL, null, null)

    async create(
        supplierId: number,
        products: ModelProductOrder[],
        applicationIds: number[]
    ): Promise<number> {
        const request = new CreateRequest()
        request.setSupplierId(supplierId)

        const productsList = products.map(p => modelProductOrderToProtoProductOrder(p))
        request.setProductsList(productsList)
        request.setApplicationIdsList(applicationIds)

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

    async list(): Promise<ModelOrder[]> {
        const request = new ListRequest()

        return new Promise((resolve, reject) => {
            this._client.list(request, null, (err: grpc.RpcError, response: ListResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const orders = response.getOrdersList().map(protoOrderToModelOrder)
                    resolve(orders)
                }
            })
        })
    }

    async order(id: number): Promise<ModelOrder> {
        const request = new OrderRequest()
        request.setId(id)

        return new Promise((resolve, reject) => {
            this._client.order(request, null, (err: grpc.RpcError, response: OrderResponse) => {
                if (err) {
                    reject(err)
                } else {
                    const order = protoOrderToModelOrder(response.getOrder()!!)
                    resolve(order)
                }
            })
        })
    }

    async update(order: ModelOrder): Promise<number> {
        const request = new UpdateRequest()
        request.setOrder(modelOrderToProtoOrder(order))

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

    async complete(id: number): Promise<number> {
        const request = new CompleteRequest()
        request.setId(id)

        return new Promise((resolve, reject) => {
            this._client.complete(request, null, (err: grpc.RpcError, response: CompleteResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getId())
                }
            })
        })
    }

    async cancel(id: number): Promise<number> {
        const request = new CancelRequest()
        request.setId(id)

        return new Promise((resolve, reject) => {
            this._client.cancel(request, null, (err: grpc.RpcError, response: CancelResponse) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response.getId())
                }
            })
        })
    }
}