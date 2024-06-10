<script setup lang="ts">
import { useOrderStore } from '../../stores/OrderStore';

const orderStore = useOrderStore()

</script>

<template>
    <article class="media" v-for="order in orderStore.orders">
        <div class="media-content">
            <slot :id="order.id"></slot>
        </div>
    </article>
    <article class="media" v-if="orderStore.orders.length === 0">
        <div class="media-content has-text-centered">
            Заказов пока нет
        </div>
    </article>
</template>

<style scoped></style>