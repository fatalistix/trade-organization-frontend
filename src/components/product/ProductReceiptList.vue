<script setup lang="ts">
import { useProductReceiptStore } from '../../stores/ProductReceiptStore';

const productReceiptStore = useProductReceiptStore()

</script>

<template>
    <article class="media" v-for="product in productReceiptStore.products">
        <div class="media-content">
            <slot :id="product.productId"></slot>
        </div>
    </article>
    <article class="media" v-if="productReceiptStore.products.length === 0">
        <div class="media-content has-text-centered">
            Продукты не выбраны
        </div>
    </article>
</template>

<style scoped></style>