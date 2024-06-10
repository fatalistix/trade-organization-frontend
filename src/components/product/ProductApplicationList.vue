<script setup lang="ts">
import { useProductApplicationStore } from '../../stores/ProductApplicationStore';

const productApplicationStore = useProductApplicationStore()

</script>

<template>
    <article class="media" v-for="product in productApplicationStore.products">
        <div class="media-content">
            <slot :id="product.productId"></slot>
        </div>
    </article>
    <article class="media" v-if="productApplicationStore.products.length === 0">
        <div class="media-content has-text-centered">
            Продукты не выбраны
        </div>
    </article>
</template>

<style scoped></style>