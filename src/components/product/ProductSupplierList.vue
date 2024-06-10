<script setup lang="ts">
import { useProductSupplierStore } from '../../stores/ProductSupplierStore';

const productSupplierStore = useProductSupplierStore()

</script>

<template>
    <article class="media" v-for="product in productSupplierStore.products">
        <div class="media-content">
            <slot :id="product.productId"></slot>
        </div>
    </article>
    <article class="media" v-if="productSupplierStore.products.length === 0">
        <div class="media-content has-text-centered">
            Продукты не выбраны
        </div>
    </article>
</template>

<style scoped></style>