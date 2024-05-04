<script setup lang="ts">
import { ref } from 'vue'
import { sellerService } from '../services/seller';
import { useRoute } from 'vue-router';
import { PlaceOfWorkType, tradingPointTypeFromString } from '../models/trading_point';
import { Seller } from '../models/seller';
import { Money } from '../models/core';

const sellers = ref<Seller[]>([])

const routeTypePath = useRoute().params.trading_point_type
if (typeof routeTypePath !== 'string') {
    alert("TODO: handle invalid path")
} 
const tradingPointType = tradingPointTypeFromString(routeTypePath as string)
const tradingPointId = +useRoute().params.trading_point_id

await sellerService.listByTradingPoint(
    tradingPointId,
    tradingPointType,
).then(
    s => {
        if (s === null) {
            alert("TODO: handle null")
        }
        sellers.value = s as Seller[]
    },
    err => {
        alert("TODO: handle err: "+err)
    }
)

</script>

<template>
    <h1>Список продавцов</h1>
    <div v-for="seller in sellers">
        <li>
            {{ seller.firstName+" "+seller.lastName+" "+seller.middleName }}
        </li>
    </div>    
</template>

<style scoped>

</style>