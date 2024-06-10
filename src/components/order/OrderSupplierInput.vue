<script setup lang="ts">
import { useSupplierStore } from '../../stores/SupplierStore';
import { computed } from 'vue';

const supplierStore = useSupplierStore()

const props = defineProps<{
    isInvalid: boolean
    selectedSupplierId: number | null
}>()

const emit = defineEmits<{
    (event: 'update:selectedSupplierId', value: number | null): void
}>()

const selectedSupplierId = computed({
    get: () => props.selectedSupplierId,
    set: v => emit('update:selectedSupplierId', v)
})

</script>

<template>
    <div class="field">
        <label class="label">Поставщик</label>
        <div class="select is-fullwidth" :class="{ 'is-danger': props.isInvalid }">
            <select v-model="selectedSupplierId">
                <option v-for="s in supplierStore.suppliers" :value="s.id">{{ s.name }}</option>
            </select>
        </div>
        <p class="help" :class="{ 'is-danger': props.isInvalid }">Выберите поставщика</p>
    </div>
</template>

<style scoped></style>