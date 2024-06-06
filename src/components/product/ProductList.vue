<script setup lang="ts">
import { useProductStore } from '../../stores/ProductStore';

const productStore = useProductStore()

</script>

<template>
    <article class="media" v-for="product in productStore.products">
        <div class="media-content">
            <slot :id=product.id></slot>
        </div>
    </article>
    <article class="media" v-if="productStore.products.length === 0">
        <div class="media-content has-text-centered">
            Тут пока пусто
        </div>
    </article>
</template>

<style scoped></style>