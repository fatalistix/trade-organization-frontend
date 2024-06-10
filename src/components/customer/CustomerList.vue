<script setup lang="ts">
import { useCustomerStore } from '../../stores/CustomerStore';

const customerStore = useCustomerStore()

</script>

<template>
    <article class="media" v-for="customer in customerStore.customers">
        <div class="media-content">
            <slot :id="customer.id"></slot>
        </div>
    </article>
    <article class="media" v-if="customerStore.customers.length === 0">
        <div class="media-content has-text-centered">
            Тут пока пусто
        </div>
    </article>
</template>

<style scoped></style>