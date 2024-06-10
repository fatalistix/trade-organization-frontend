<script setup lang="ts">
import { ref } from 'vue';
import { useApplicationStore } from '../../stores/ApplicationStore';
import ApplicationEdit from './ApplicationEdit.vue';

const applicationStore = useApplicationStore()

const props = defineProps<{
    id: number
}>()

const application = applicationStore.getById(props.id)!!

const isModalOpened = ref(false)

</script>

<template>
    <div class="modal" v-if="isModalOpened" :class="{ 'is-active': isModalOpened }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h3 class="title is-3 has-text-centered">Редактирование</h3>
                <ApplicationEdit :tradingPointId="application.tradingPointId" :tradingPointType="application.tradingPointType" :id="application.id" />
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="isModalOpened = false"></button>
    </div>
    <div class="fixed-grid has-4-cols">
        <div class="grid">
            <div class="cell">
                <strong>Заявка номер {{ application.id }}</strong>
            </div>
            <div class="cell is-col-span-2">
                <strong>Дата создания: </strong>{{ application.createdAt.getDate() }}-{{ (application.createdAt.getMonth() + 1) }}-{{
                    application.createdAt.getFullYear() }}:{{ application.createdAt.getHours() }}:{{
                    application.createdAt.getMinutes() }}:{{ application.createdAt.getSeconds() }}
            </div>
            <div class="cell">
                <button class="button is-fullwidth is-small" @click="isModalOpened = true">
                    Редактировать
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>