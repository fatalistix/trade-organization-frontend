<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useDepartmentStoreStore } from '../../stores/DepartmentStoreStore';

const departmentStoreStore = useDepartmentStoreStore()
const notification = useNotification()

function addSection() {
    departmentStoreStore.addSection().then(
        _ => {
            notification.notify({
                text: "Секция добавлена",
                type: "success"
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось добавить секцию",
                type: "warn"
            })
        }
    )
}
</script>

<template>
    <div class="field has-text-centered">
        <button class="button is-primary" @click="addSection()">Добавить</button>
    </div>
</template>

<style scoped></style>