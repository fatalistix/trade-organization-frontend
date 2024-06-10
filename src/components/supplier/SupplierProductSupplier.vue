<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useProductStore } from '../../stores/ProductStore';
import { useProductSupplierStore } from '../../stores/ProductSupplierStore';
import { computed } from 'vue';

const notification = useNotification()

const productStore = useProductStore()
const productSupplierStore = useProductSupplierStore()

const props = defineProps<{
    id: number
}>()

const product = productStore.getById(props.id)!!

const rubles = computed({
    get() {
        const value = productSupplierStore.getByProductId(props.id)!!
        return value.price.rubles
    },
    set(newRubles: number) {
        productSupplierStore.updateRubles(props.id, newRubles)
    }
})

const pennies = computed({
    get() {
        const value = productSupplierStore.getByProductId(props.id)!!
        return value.price.pennies
    },
    set(newPennies: number) {
        productSupplierStore.updatePennies(props.id, newPennies)
    }
})

function remove() {
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
            <div class="control has-icons-left">
                <input type="number" class="input is-small" v-model="rubles">
                <span class="icon is-left">₽</span>
            </div>
        </div>
        <div class="column">
            <div class="control has-icons-left">
                <input type="number" class="input is-small" v-model="pennies">
                <span class="icon is-left">K</span>
            </div>
        </div>
        <div class="column">
            <button class="button is-danger is-small" @click="remove()">Удалить</button>
        </div>
    </div>
</template>

<style scoped></style>