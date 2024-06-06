<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useProductStore } from '../../stores/ProductStore';
import { useApplicationCreateStore } from '../../stores/ApplicationCreateStore';

const notification = useNotification()

const productStore = useProductStore()
const applicationCreateStore = useApplicationCreateStore()

const props = defineProps<{
    id: number
}>()

const selected = applicationCreateStore.selected(props.id)

function select() {
    applicationCreateStore.add({
        productId: props.id, quantity: 1
    })

    notification.notify({
        text: "Продукт добавлен в заявку",
        type: "success"
    })
}

function unselect() {
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
                {{ productStore.getById(props.id)!.name }}
            </label>
        </div>
        <div class="column">
            <label class="checkbox">
                <input type="checkbox" v-model="selected" @change="!selected ? select() : unselect()">
                Добавлен в заявку
            </label>
        </div>
    </div>
</template>

<style scoped></style>