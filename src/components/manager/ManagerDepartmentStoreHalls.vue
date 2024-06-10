<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useDepartmentStoreStore } from '../../stores/DepartmentStoreStore';
import { ref } from 'vue';

const departmentStoreStore = useDepartmentStoreStore()
const notification = useNotification()

const section = ref(-1)

function addHall() {
    departmentStoreStore.addHall(
        section.value,
    ).then(
        _ => {
            notification.notify({
                text: "Зал добавлен",
                type: "success"
            })
        },
        e => {
            notification.notify({
                text: "Не удалось добавить зал: " + e,
                type: "warn"
            })
        }
    )
}

</script>

<template>
    <div class="box">
        <h2 class="title is-2 has-text-centered">Залы</h2>
        <div class="field">
            <article class="media" v-for="hall in departmentStoreStore.halls">
                <div class="media-content">
                    <strong>Зал {{ hall.id }} в секции {{ hall.hallContainerId }}</strong>
                </div>
            </article>
        </div>
        <div class="field has-text-centered">
            <div class="select">
                <select v-model="section">
                    <option :value="section.id" v-for="section in departmentStoreStore.sections">Секция {{ section.id }}
                    </option>
                </select>
            </div>
            <button class="button is-primary" @click="addHall">Добавить</button>
        </div>
    </div>
</template>

<style scoped></style>