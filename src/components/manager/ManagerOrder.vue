<script setup lang="ts">
import { ref } from 'vue';
import { useApplicationStore } from '../../stores/ApplicationStore';
import ApplicationList from '../application/ApplicationList.vue';
import OrderApplication from '../order/OrderApplication.vue';
import ManagerTabs from './ManagerTabs.vue';
import OrderSupplierInput from '../order/OrderSupplierInput.vue';
import { useSupplierStore } from '../../stores/SupplierStore';
import { useNotification } from '@kyvg/vue3-notification';
import { ProductSupplier } from '../../models/supplier';
import ProductOrderList from '../product/ProductOrderList.vue';
import { useProductOrderStore } from '../../stores/ProductOrderStore';
import OrderProductOrder from '../order/OrderProductOrder.vue';
import { useProductStore } from '../../stores/ProductStore';
import { useOrderStore } from '../../stores/OrderStore';
import { useOrderRules } from '../../validation/order';
import useVuelidate from '@vuelidate/core';
import OrderList from '../order/OrderList.vue';
import OrderCompleteCancel from '../order/OrderCompleteCancel.vue';

const notification = useNotification()

const applicationStore = useApplicationStore()
const supplierStore = useSupplierStore()
const productOrderStore = useProductOrderStore()
const productStore = useProductStore()
const orderStore = useOrderStore()


supplierStore.updateSuppliers().then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список поставщиков",
            type: "warn"
        })
    }
)

applicationStore.updateApplications().then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список заявок",
            type: "warn"
        })
    }
)

productStore.updateProducts().then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список продуктов",
            type: "warn"
        })
    }
)

orderStore.updateOrders().then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список заказов",
            type: "warn"
        })
    }
)

const supplierId = ref<number | null>(null)
const supplierProducts = ref<ProductSupplier[]>([])

const rules = useOrderRules()

const v = useVuelidate(
    rules, { supplierId }
)

function selectSupplier(id: number | null) {
    supplierId.value = id

    if (id === null) {
        return
    }

    supplierStore.load(id).then(
        s => {
            supplierProducts.value = s.products
        },
        _ => {
            notification.notify({
                text: "Не удалось загрузить поставщика",
                type: "warn"
            })
        }
    )
}

function create() {
    orderStore.create(
        supplierId.value!!, productOrderStore.products, productOrderStore.applicationIds
    ).then(
        _ => {
            notification.notify({
                text: "Заказ создан",
                type: "success",
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось создать заказ",
                type: "warn",
            })
        }
    )
}

</script>

<template>
    <ManagerTabs activeTab="order" />
    <h2 class="title is-2 has-text-centered">Заказы</h2>
    <div class="container">
        <div class="box">
            <h3 class="title is-3 has-text-centered">Выбор поставщика</h3>
            <OrderSupplierInput :isInvalid="v.supplierId.$invalid" @update:selectedSupplierId="selectSupplier"
                :selectedSupplierId="supplierId" />
        </div>
        <div class="box">
            <button class="button is-primary is-fullwidth" @click="create" :disabled="v.supplierId.$invalid">Создать</button>
        </div>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <h3 class="title is-3 has-text-centered">Заявки</h3>
                    <ApplicationList v-if="supplierId">
                        <template v-for="_ in applicationStore.applications" #default="{ id }">
                            <OrderApplication :id="id" :supplierProducts="supplierProducts" />
                        </template>
                    </ApplicationList>
                    <label class="label has-text-centered" v-else>Выберите поставщика</label>
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <h3 class="title is-3 has-text-centered">Продукты в заявке</h3>
                    <ProductOrderList>
                        <template v-for="_ in productOrderStore.products" #default="{ id }">
                            <OrderProductOrder :id="id" />
                        </template>
                    </ProductOrderList>
                </div>
            </div>
        </div>
        <div class="box">
            <h3 class="title is-3 has-text-centered">Заказы</h3>
            <OrderList>
                <template v-for="_ in orderStore.orders" #default="{ id }">
                    <OrderCompleteCancel :id="id" />
                </template>
            </OrderList>
        </div>
    </div>
</template>

<style scoped></style>