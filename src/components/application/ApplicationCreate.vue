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

const notification = useNotification()

const applicationStore = useApplicationStore()
const productApplicationStore = useProductApplicationStore()
const productStore = useProductStore()

const props = defineProps<{
    tradingPointId: number
    tradingPointType: TradingPointType
}>()

function create() {
    applicationStore.create(
        props.tradingPointId,
        props.tradingPointType,
        productApplicationStore.products
    ).then(
        _ => {
            notification.notify({
                text: "Заявка создана",
                type: "success",
            })
        },
        err => {
            notification.notify({
                text: "Не удалось создать заявку: " + err.message,
                type: "warn",
            })
        }
    )
}
</script>

<template>
    <div class="field has-text-centered">
        <button class="button is-primary" @click="create()">Создать</button>
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
</template>

<style scoped></style>