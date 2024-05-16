<script setup lang="ts">
import TradingPointList from '../trading_point/TradingPointList.vue';
import TradingPointRegister from '../trading_point/TradingPointRegister.vue';

</script>

<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <TradingPointRegister />
            </div>
            <div class="column">
                <TradingPointList />
            </div>
        </div>
    </div>
</template>

<style scoped></style>