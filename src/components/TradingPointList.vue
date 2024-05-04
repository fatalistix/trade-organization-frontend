<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { TradingPoint } from '../models/trading_point';
import { tradingPointService } from '../services/trading_point'

const tradingPoints = ref<TradingPoint[]>([])

await tradingPointService.list().then(
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

const count = ref(0)

</script>

<template>
  <button @click="count++">{{ count }}</button>
    <h1>Список торговых точек</h1>
    <div>
      <v-list>
        <v-list-item v-for="(item, i) in tradingPoints" :key="i">
          {{ item.id+" "+item.type+" "+item.areaPlot+" "+item.rentalCharge+" "+item.counterCount+" "+item.address }}
        </v-list-item>
      </v-list>
    </div>
</template>

<style scoped>

</style>