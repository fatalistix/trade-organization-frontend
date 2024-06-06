<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useApplicationCreateStore } from '../../stores/ApplicationCreateStore';
import { computed } from 'vue';
import { useProductStore } from '../../stores/ProductStore';

const notification = useNotification()

const applicationCreateStore = useApplicationCreateStore()
const productStore = useProductStore()

const props = defineProps<{
    id: number
}>()

const quantity = computed({
    get() {
        const value = applicationCreateStore.products.find(pa => pa.productId === props.id)!!
        return value.quantity
    },
    set(newQuantity: number) {
        applicationCreateStore.products.forEach(p => {
            if (p.productId === props.id) {
                p.quantity = newQuantity
            }
        })
    }
})

const product = productStore.getById(props.id)!!

function remove() {
    applicationCreateStore.remove(props.id)

    notification.notify({
        text: "Продукт удален из заявки",
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
            <input class="input" type="number" v-model="quantity" />
        </div>
        <div class="column">
            <button class="button is-danger" @click="remove()">Удалить</button>
        </div>
    </div>
</template>

<style scoped></style>