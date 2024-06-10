<script setup lang="ts">
import { useProductTradingPointStore } from '../../stores/ProductTradingPointStore';

const productTradingPointStore = useProductTradingPointStore()

</script>

<template>
    <article class="media" v-for="product in productTradingPointStore.products">
        <div class="media-content">
            <slot :id="product.productId"></slot>
        </div>
    </article>
    <article class="media" v-if="productTradingPointStore.products.length === 0">
        <div class="media-content has-text-centered">
            Продукты не выбраны
        </div>
    </article>
</template>

<style scoped></style>