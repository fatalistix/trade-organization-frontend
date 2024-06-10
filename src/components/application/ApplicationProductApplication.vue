<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useProductStore } from '../../stores/ProductStore';
import { useProductApplicationStore } from '../../stores/ProductApplicationStore';
import { computed } from 'vue';

const notification = useNotification()

const productStore = useProductStore()
const productApplicationStore = useProductApplicationStore()

const props = defineProps<{
    id: number
}>()

const product = productStore.getById(props.id)!!

const quantity = computed({
    get() {
        const value = productApplicationStore.getByProductId(props.id)!!
        return value.quantity
    },
    set(newQuantity: number) {
        productApplicationStore.updateQuantity(props.id, newQuantity)
    }
})

function remove() {
    productApplicationStore.remove(props.id)

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
            <div class="control">
                <input type="number" class="input is-small" v-model="quantity">
            </div>
        </div>
        <div class="column">
            <button class="button is-small is-danger" @click="remove">Удалить</button>
        </div>
    </div>
</template>

<style scoped></style>