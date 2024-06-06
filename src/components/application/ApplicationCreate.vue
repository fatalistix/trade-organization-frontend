<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useApplicationCreateStore } from '../../stores/ApplicationCreateStore';
import { useTradingPointStore } from '../../stores/TradingPointStore';

const notification = useNotification()

defineProps<{
    tradingPointId: number
}>()

const applicationCreateStore = useApplicationCreateStore()
const tradingPointStore = useTradingPointStore()

function create() {
    notification.notify({
        title: "TODO",
        text: "Сейчас тут стоит заглушка, всегда возвращающая true",
        type: "warn"
    })
}

</script>

<template>
    <div class="field has-text-centered">
        <button class="button is-primary" @click="create">Отправить</button>
    </div>
</template>

<style scoped></style>