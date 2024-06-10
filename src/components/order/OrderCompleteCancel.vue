<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useOrderStore } from '../../stores/OrderStore';

const notification = useNotification()

const orderStore = useOrderStore()

const props = defineProps<{
    id: number
}>()

function complete() {
    orderStore.complete(props.id).then(
        _ => {
            notification.notify({
                text: "Заказ завершен",
                type: "success"
            })
        },
        err => {
            console.error(err)
            notification.notify({
                text: "Не удалось завершить заказ",
                type: "warn"
            })
        }
    )
}

function cancel() {
    orderStore.cancel(props.id).then(
        _ => {
            notification.notify({
                text: "Заказ отменена",
                type: "success"
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось отменить заказ",
                type: "warn"
            })
        }
    )
}

</script>

<template>
    <div class="columns">
        <div class="column">
            <label class="label has-text-centered">
                <strong>Заказ номер {{ props.id }}</strong>
            </label>
        </div>
        <div class="column">
            <button class="button is-success is-fullwidth" @click="complete">Завершить</button>
        </div>
        <div class="column">
            <button class="button is-danger is-fullwidth" @click="cancel">Отменить</button>
        </div>
    </div>
</template>

<style scoped></style>