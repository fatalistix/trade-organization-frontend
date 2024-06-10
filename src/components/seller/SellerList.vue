<script setup lang="ts">
import { useSellerStore } from '../../stores/SellerStore';

const sellerStore = useSellerStore()

</script>

<template>
    <article class="media" v-for="seller in sellerStore.sellers">
        <div class="media-content">
            <slot :id=seller.id></slot>
        </div>
    </article>
    <article class="media" v-if="sellerStore.sellers.length === 0">
        <div class="media-content has-text-centered">
            Тут пока пусто
        </div>
    </article>
</template>

<style scoped></style>