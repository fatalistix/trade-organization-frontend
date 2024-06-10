<script setup lang="ts">
import { useCustomerStore } from '../../stores/CustomerStore';

const customerStore = useCustomerStore()

const props = defineProps<{
    isInvalid: boolean
}>()

const selectedCustomerId = defineModel('selectedCustomerId', { required: true })

</script>

<template>
    <div class="field">
        <label class="label">Покупатель</label>
        <div class="select is-fullwidth" :class="{ 'is-danger': props.isInvalid }">
            <select v-model="selectedCustomerId">
                <option v-for="c in customerStore.customers" :value="c.id">
                    {{ c.firstName }} {{ c.lastName }} 
                </option>
            </select>
        </div>
        <p class="help" :class="{ 'is-danger': props.isInvalid }">Выберите покупателя</p>
    </div>
</template>

<style scoped></style>