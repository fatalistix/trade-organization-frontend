<script setup lang="ts">
import { ref } from 'vue';
import { useCustomerStore } from '../../stores/CustomerStore';
import CustomerEdit from './CustomerEdit.vue';

const customerStore = useCustomerStore()

const props = defineProps<{
    id: number
}>()

const customer = customerStore.getById(props.id)!!

const isModalOpened = ref(false)

</script>

<template>
    <div class="modal" v-if="isModalOpened" :class="{ 'is-active': isModalOpened }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h3 class="title is-3 has-text-centered">Редактирование</h3>
                <CustomerEdit :id="customer.id" />
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="isModalOpened = false"></button>
    </div>
    <div class="columns">
        <div class="column">
            <strong>{{ customer.firstName + " " + customer.lastName }}</strong>
        </div>
        <div class="column">
            <button class="button is-fullwidth is-small" @click="isModalOpened = true">
                Редактировать
            </button>
        </div>
    </div>
</template>

<style scoped></style>