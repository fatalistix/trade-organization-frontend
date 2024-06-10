<script setup lang="ts">
import { useProductStore } from '../../stores/ProductStore';
import { useProductReceiptStore } from '../../stores/ProductReceiptStore';
import { computed } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import { useProductTradingPointStore } from '../../stores/ProductTradingPointStore';

const notification = useNotification()

const productStore = useProductStore()
const productReceiptStore = useProductReceiptStore()
const productTradingPointStore = useProductTradingPointStore()

const props = defineProps<{
    productId: number
}>()

const product = productStore.getById(props.productId)!!

const quantity = computed({
    get: () => { return productReceiptStore.getByProductId(props.productId)!!.quantity },
    set: (newQuantity: number) => {
        const tradingPointQuantity = productTradingPointStore.getByProductId(props.productId)!!.quantity
        if (newQuantity > tradingPointQuantity) {
            newQuantity = tradingPointQuantity
        }
        productReceiptStore.updateQuantity(props.productId, newQuantity)
    }
})

function remove() {
    productReceiptStore.remove(props.productId)

    notification.notify({
        text: "Продукт удален из чека",
        type: "success"
    })
}

</script>

<template>
    <div class="columns">
        <div class="column">
            <label class="label has-text-centered">
                {{ product.name }}
            </label>
        </div>
        <div class="column">
            <input type="number" class="input is-small" v-model="quantity">
        </div>
        <div class="column">
            <button class="button is-small is-danger" @click="remove">Удалить</button>
        </div>
    </div>
</template>

<style scoped></style>