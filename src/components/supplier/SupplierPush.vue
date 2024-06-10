<script setup lang="ts">
import { useSupplierStore } from '../../stores/SupplierStore';

const supplierStore = useSupplierStore()

const props = defineProps<{
    id: number
    baseUrl: string
}>()

const supplier = supplierStore.getById(props.id)!!

</script>

<template>
    <div class="fixed-grid has-2-cols">
        <div class="grid">
            <div class="cell">
                <strong>{{ supplier.name }}</strong>
            </div>
            <div class="cell">
                <RouterLink class="button is-fullwidth is-small" :to="`${props.baseUrl}/${supplier.id}`">
                    Редактировать
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped></style>