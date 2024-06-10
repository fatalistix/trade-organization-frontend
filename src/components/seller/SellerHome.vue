<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useSellerStore } from '../../stores/SellerStore';
import { useRoute, useRouter } from 'vue-router';
import { WorksAtFilterType } from '../../models/seller';
import { useProductStore } from '../../stores/ProductStore';
import ApplicationList from '../application/ApplicationList.vue';
import { useApplicationStore } from '../../stores/ApplicationStore';
import ApplicationModal from '../application/ApplicationModal.vue';
import { ref } from 'vue';
import ApplicationCreate from '../application/ApplicationCreate.vue';
import { useCustomerStore } from '../../stores/CustomerStore';
import ReceiptCustomerInput from '../receipt/ReceiptCustomerInput.vue';
import { useTradingPointStore } from '../../stores/TradingPointStore';
import { useProductTradingPointStore } from '../../stores/ProductTradingPointStore';
import ProductReceiptList from '../product/ProductReceiptList.vue';
import ReceiptProductReceipt from '../receipt/ReceiptProductReceipt.vue';
import ReceiptProductTradingPoint from '../receipt/ReceiptProductTradingPoint.vue';
import ProductTradingPointList from '../product/ProductTradingPointList.vue';
import { useReceiptStore } from '../../stores/ReceiptStore';
import { useProductReceiptStore } from '../../stores/ProductReceiptStore';
import { ReceiptingPointWithAccountingType } from '../../models/receipting_point_with_accounting';

const notification = useNotification()

const route = useRoute()
const router = useRouter()

const applicationStore = useApplicationStore()
const sellerStore = useSellerStore()
const productStore = useProductStore()
const customerStore = useCustomerStore()
const tradingPointStore = useTradingPointStore()
const productTradingPointStore = useProductTradingPointStore()
const receiptStore = useReceiptStore()
const productReceiptStore = useProductReceiptStore()

const id = Number(route.params.id)
if (isNaN(id)) {
    router.push("/not-found")
}

let possibleSeller = sellerStore.getById(id)
if (!possibleSeller) {
    sellerStore.updateSellers({
        worksAtFilterType: WorksAtFilterType.ONLY_NOT_NULL,
        tradingPointId: null,
        tradingPointType: null,
        placeOfWorkId: null,
        placeOfWorkType: null,
        search: null
    }).then(
        _ => { },
        _ => {
            notification.notify({
                text: "Не удалось получить список продавцов",
                type: "warn"
            })
        }
    )

    possibleSeller = sellerStore.getById(id)
    if (!possibleSeller) {
        router.push("/not-found")
    }
}

const seller = possibleSeller!!

const isApplicationCreateModalOpened = ref(false)

productStore.updateProducts().then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список продуктов",
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

customerStore.updateCustomers().then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список клиентов",
            type: "warn"
        })
    }
)

const selectedCustomerId = ref<number | null>(null)

const isLoading = ref(true)

async function loadTradingPoint() {
    await tradingPointStore.tradingPoint(seller.worksAt!!.tradingPoint.id, seller.worksAt!!.tradingPoint.type).then(
        tp => {
            productTradingPointStore.products = tp.products

            isLoading.value = false
        },
        _ => {
            notification.notify({
                text: "Не удалось получить точку продаж",
                type: "warn"
            })
        }
    )
}

loadTradingPoint()

function createReceipt() {
    receiptStore.createWithAccounting(
        id, productReceiptStore.products, selectedCustomerId.value!!, 
        seller.worksAt!!.tradingPoint.id,
        ReceiptingPointWithAccountingType.DEPARTMENT_STORE,
    ).then(
        _ => {
            notification.notify({
                text: "Чек создан",
                type: "success"
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось создать чек",
                type: "warn"
            })
        }
    )
}

</script>

<template>
    <div class="modal" :class="{ 'is-active': isApplicationCreateModalOpened }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h3 class="title is-3 has-text-centered">Создание заявки</h3>
                <ApplicationCreate :trading-point-id="seller.worksAt!!.tradingPoint.id"
                    :trading-point-type="seller.worksAt!!.tradingPoint.type" />
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close"
            @click="isApplicationCreateModalOpened = false"></button>
    </div>
    <div class="container">
        <div class="columns">
            <div class="column">
                <h2 class="title is-2 has-text-centered">Чеки</h2>
                <div class="box">
                    <ReceiptCustomerInput :is-invalid="false" v-model:selected-customer-id="selectedCustomerId" />
                    <div class="field">
                        <button class="button is-primary is-fullwidth" @click="createReceipt()">Создать</button>
                    </div>
                </div>
                <button></button>
                <div class="box">
                    <ProductReceiptList>
                        <template v-for="_ in productTradingPointStore.products" #default="{ id }">
                            <ReceiptProductReceipt :product-id="id" />
                        </template>
                    </ProductReceiptList>
                </div>
                <div class="box">
                    <ProductTradingPointList>
                        <template v-for="_ in productStore.products" #default="{ id }">
                            <ReceiptProductTradingPoint :product-id="id" />
                        </template>
                    </ProductTradingPointList>
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <h2 class="title is-2 has-text-centered">Заявки</h2>
                    <div class="field">
                        <button class="button is-primary is-fullwidth"
                            @click="isApplicationCreateModalOpened = true">Создать</button>
                    </div>
                    <ApplicationList>
                        <template v-for="_ in applicationStore.applications" #default="{ id }">
                            <ApplicationModal :id="id" />
                        </template>
                    </ApplicationList>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>