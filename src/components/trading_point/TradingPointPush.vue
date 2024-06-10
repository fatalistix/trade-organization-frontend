<script setup lang="ts">
import { TradingPointType } from '../../models/trading_point';
import { useTradingPointStore } from '../../stores/TradingPointStore';
import { ShopOutlined } from '@ant-design/icons-vue';

const tradingPointStore = useTradingPointStore()

const props = defineProps<{
    id: number
    type: TradingPointType
    baseUrl: string
}>()

const tradingPoint = tradingPointStore.getByIdAndType(props.id, props.type)!!

</script>

<template>
    <RouterLink class="panel-block" :to="`${props.baseUrl}/${tradingPoint.id}/${tradingPoint.type}`">
        <span class="panel-icon">
            <ShopOutlined />
        </span>
        {{ TradingPointType.toString(tradingPoint.type) }} по адресу {{ tradingPoint.address }}
    </RouterLink>
</template>

<style scoped></style>