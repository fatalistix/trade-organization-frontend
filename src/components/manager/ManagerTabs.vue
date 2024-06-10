<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps({
    activeTab: String
})

</script>

<template>
    <div class="tabs is-toggle is-centered">
        <ul>
            <li :class="{ 'is-active': props.activeTab === 'home' }">
                <RouterLink to="/manager">Домашняя страница</RouterLink>
            </li>
            <li :class="{ 'is-active': props.activeTab === 'trading-point' }">
                <RouterLink to="/manager/trading-points">Торговые точки</RouterLink>
            </li>
            <li :class="{ 'is-active': props.activeTab === 'seller' }">
                <RouterLink to="/manager/sellers">Продавцы</RouterLink>
            </li>
            <li :class="{ 'is-active': props.activeTab === 'product' }">
                <RouterLink to="/manager/products">Товары</RouterLink>
            </li>
            <li :class="{ 'is-active': props.activeTab === 'supplier' }">
                <RouterLink to="/manager/suppliers">Поставщики</RouterLink>
            </li>
            <li :class="{ 'is-active': props.activeTab === 'customer' }">
                <RouterLink to="/manager/customers">Покупатели</RouterLink>
            </li>
            <li :class="{ 'is-active': props.activeTab === 'order' }">
                <RouterLink to="/manager/orders">Заказы</RouterLink>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>