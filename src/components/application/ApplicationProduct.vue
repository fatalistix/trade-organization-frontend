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

const selected = computed({
    get: () => productApplicationStore.selected(props.id),
    set: () => { }
})

function select() {
    productApplicationStore.add({
        productId: props.id, quantity: 1
    })

    notification.notify({
        text: "Продукт добавлен в заявку",
        type: "success"
    })
}

function unselect() {
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
            <label class="checkbox">
                <input type="checkbox" v-bind="{ checked: selected }" @change="!selected ? select() : unselect()">
                Добавлен в заявку
            </label>
        </div>
    </div>
</template>

<style scoped></style>