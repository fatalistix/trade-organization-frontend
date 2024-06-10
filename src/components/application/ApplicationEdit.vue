<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useApplicationStore } from '../../stores/ApplicationStore';
import { useProductApplicationStore } from '../../stores/ProductApplicationStore';
import { TradingPointType } from '../../models/trading_point';
import ProductList from '../product/ProductList.vue';
import { useProductStore } from '../../stores/ProductStore';
import ApplicationProduct from './ApplicationProduct.vue';
import ProductApplicationList from '../product/ProductApplicationList.vue';
import ApplicationProductApplication from './ApplicationProductApplication.vue';
import { ref } from 'vue';

const notification = useNotification()

const applicationStore = useApplicationStore()
const productApplicationStore = useProductApplicationStore()
const productStore = useProductStore()

const props = defineProps<{
    id: number
    tradingPointId: number
    tradingPointType: TradingPointType
}>()

const isLoading = ref(true)

const createdAt = ref<Date>(new Date())
const orderId = ref<number | null>(null)

async function loadApplication() {
    await applicationStore.application(props.id).then(
        a => {
            productApplicationStore.products = a.products
            createdAt.value = a.createdAt
            orderId.value = a.orderId

            isLoading.value = false
        },
        _ => {
            notification.notify({
                text: "Не удалось получить список заявок",
                type: "warn"
            })
        }
    )
}

loadApplication()

function update() {
    applicationStore.update({
        id: props.id,
        tradingPointId: props.tradingPointId,
        tradingPointType: props.tradingPointType,
        createdAt: createdAt.value,
        products: productApplicationStore.products,
        orderId: orderId.value
    }).then(
        _ => {
            notification.notify({
                text: "Заявка сохранена",
                type: "success",
            })
        },
        err => {
            notification.notify({
                text: "Не удалось сохранить заявку: " + err.message,
                type: "warn",
            })
        }
    )
}
</script>

<template>
    <div v-if="!isLoading">
        <div class="field has-text-centered">
            <button class="button is-primary" @click="update()">Сохранить</button>
        </div>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <h3 class="title is-3 has-text-centered">Все продукты</h3>
                    <ProductList>
                        <template v-for="_ in productStore.products" #default="{ id }">
                            <ApplicationProduct :id="id" />
                        </template>
                    </ProductList>
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <h3 class="title is-3 has-text-centered">Продукты в заявке</h3>
                    <ProductApplicationList>
                        <template v-for="_ in productApplicationStore.products" #default="{ id }">
                            <ApplicationProductApplication :id="id" />
                        </template>
                    </ProductApplicationList>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>