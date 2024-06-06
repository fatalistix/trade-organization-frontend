<!-- <script setup lang="ts">
import { useProductStore } from '../../stores/ProductStore';
import ApplicationProduct from './ApplicationProduct.vue';

const productStore = useProductStore()

</script>

<template>
    <article class="media" v-for="product in productStore.productList">
        <div class="media-content">
            <ApplicationProduct :id="product.id" />
        </div>
    </article>
    <article class="media" v-if="productStore.productList.length === 0">
        <div class="media-content has-text-centered">
            Продуктов не найдено
        </div>
    </article>
</template>

<style scoped></style> -->