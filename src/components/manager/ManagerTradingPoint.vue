<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import TradingPointList from '../trading_point/TradingPointList.vue';
import TradingPointRegister from '../trading_point/TradingPointRegister.vue';
import ManagerTabs from './ManagerTabs.vue';
import { useTradingPointStore } from '../../stores/TradingPointStore';
import TradingPointPush from '../trading_point/TradingPointPush.vue';

const notification = useNotification()

const tradingPointStore = useTradingPointStore()

tradingPointStore.updateTradingPoints().then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список торговых точек",
            type: "warn"
        })
    }
)
</script>

<template>
    <ManagerTabs activeTab="trading-point" />
    <div class="container">
        <div class="columns">
            <div class="column">
                <TradingPointRegister />
            </div>
            <div class="column">
                <TradingPointList>
                    <template v-for="_ in tradingPointStore.tradingPoints" #default="{ id, type }">
                        <TradingPointPush :id ="id" :type="type" base-url="/manager/trading-point"/>
                    </template>
                </TradingPointList>
            </div>
        </div>
    </div>
</template>

<style scoped></style>