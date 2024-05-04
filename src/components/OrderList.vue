<script setup lang="ts">
import { ref } from 'vue'

interface Order {
    firstName: string;
    lastName: string;
    middleName: string;
}

const orders = ref<Order[]>([])
</script>

<template>
    <li v-for="order in orders">
        {{ order.firstName+" "+order.lastName+" "+order.middleName }}
    </li>
</template>

<style scoped>
@import "../style.css";

li {
};
</style>