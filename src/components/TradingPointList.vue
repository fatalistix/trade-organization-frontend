<script setup lang="ts">
import { ref } from 'vue';
import { tradingPointService } from '../services/trading_point'
import { TradingPoint } from '../models/trading_point';

const tradingPoints = ref<TradingPoint[]>([])

const getTradingPointList = () => {
  tradingPointService.list().then(
    s => {
      if (s === null) {
        alert("TODO: handle null")
      }
      tradingPoints.value = s
    },
    err => {
      alert("TODO: handle err: "+err)
    }
  )
} 

getTradingPointList()

</script>

<template>
  <h1>Список торговых точек</h1>
  <div>
    <ul>
      <li v-for="tradingPoint in tradingPoints" :key="tradingPoint.id">
        {{ tradingPoint.id+" "+tradingPoint.type+" "+tradingPoint.address }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>