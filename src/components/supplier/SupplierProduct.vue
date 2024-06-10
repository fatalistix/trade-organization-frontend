<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useProductStore } from '../../stores/ProductStore';
import { computed } from 'vue';
import { useProductSupplierStore } from '../../stores/ProductSupplierStore';

const notification = useNotification()

const productStore = useProductStore()
const productSupplierStore = useProductSupplierStore()

const props = defineProps<{
    id: number
}>()

const product = productStore.getById(props.id)!!

const selected = computed({
    get: () => productSupplierStore.selected(props.id),
    set: () => { }
})

function select() {
    productSupplierStore.add({
        productId: props.id, price: { rubles: 0, pennies: 0 }
    })

    notification.notify({
        text: "Продукт добавлен в поставщика",
        type: "success"
    })
}

function unselect() {
    productSupplierStore.remove(props.id)

    notification.notify({
        text: "Продукт удален из поставщика",
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
                Добавлен в поставщика
            </label>
        </div>
    </div>
</template>

<style scoped></style>