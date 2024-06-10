<script setup lang="ts">
import ManagerTabs from './ManagerTabs.vue';

</script>

<template>
    <ManagerTabs activeTab="home" />
    <h2 class="title is-2 has-text-centered">
        Добро пожаловать на страницу менеджера!
    </h2>
    <div class="box">
        <div class="field">
            <RouterLink to="/manager/trading-points" class="button is-large is-primary is-fullwidth">Перейти к торговым
                точкам
            </RouterLink>
        </div>
        <div class="field">
            <RouterLink to="/manager/sellers" class="button is-large is-primary is-fullwidth">Перейти к продавцам
            </RouterLink>
        </div>
    </div>
</template>

<style scoped></style>