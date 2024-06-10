<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useProductStore } from '../../stores/ProductStore';
import { useProductReceiptStore } from '../../stores/ProductReceiptStore';
import { computed } from 'vue';
import { useProductTradingPointStore } from '../../stores/ProductTradingPointStore';

const notification = useNotification()

const productStore = useProductStore()
const productReceiptStore = useProductReceiptStore()
const productTradingPointStore = useProductTradingPointStore()

const props = defineProps<{
    productId: number
}>()

const product = productStore.getById(props.productId)!!
const productTradingPoint = productTradingPointStore.getByProductId(props.productId)!!

const selected = computed({
    get: () => productReceiptStore.selected(props.productId),
    set: () => { }
})

function select() {
    productReceiptStore.add({
        quantity: 1,
        price: productTradingPoint.price,
        productId: product.id
    })

    notification.notify({
        text: "Продукт добавлен в чек",
        type: "success"
    })
}

function unselect() {
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
            <label class="checkbox">
                <input type="checkbox" v-bind="{ checked: selected }" @change="!selected ? select() : unselect()">
                Добавлен в чек
            </label>
        </div>
    </div>
</template>

<style scoped></style>