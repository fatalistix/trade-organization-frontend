<script setup lang="ts">
import { useApplicationCreateStore } from '../../stores/ApplicationCreateStore';

const applicationCreateStore = useApplicationCreateStore()

</script>

<template>
    <article class="media" v-for="product in applicationCreateStore.products">
        <div class="media-content">
            <slot :id="product.productId"></slot>
        </div>
    </article>
    <article class="media" v-if="applicationCreateStore.products.length === 0">
        <div class="media-content has-text-centered">
            Продукты не выбраны
        </div>
    </article>
</template>

<style scoped></style>