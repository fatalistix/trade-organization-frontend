<script setup lang="ts">
import { useSupplierStore } from '../../stores/SupplierStore';

const supplierStore = useSupplierStore()

</script>

<template>
    <article class="media" v-for="supplier in supplierStore.suppliers">
        <div class="media-content">
            <slot :id="supplier.id"></slot>
        </div>
    </article>
    <article class="media" v-if="supplierStore.suppliers.length === 0">
        <div class="media-content has-text-centered">
            Тут пока пусто
        </div>
    </article>
</template>

<style scoped></style>