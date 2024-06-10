<script setup lang="ts">
import { useProductOrderStore } from '../../stores/ProductOrderStore';

const productOrderStore = useProductOrderStore()

</script>

<template>
    <article class="media" v-for="product in productOrderStore.products">
        <div class="media-content">
            <slot :id="product.productId"></slot>
        </div>
    </article>
    <article class="media" v-if="productOrderStore.products.length === 0">
        <div class="media-content has-text-centered">
            Продукты не выбраны
        </div>
    </article>
</template>

<style scoped></style>