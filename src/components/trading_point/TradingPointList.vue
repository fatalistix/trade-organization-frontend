<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification';
import { useTradingPointStore } from '../../stores/TradingPointStore';

const store = useTradingPointStore()
store.updateList().then(
  _ => {},
  _ => {
    notify({
      text: "Не удалось получить список торговых точек",
      type: "warn"
    })
  }
)

</script>

<template>
  <h2 class="title is-2 has-text-centered">
    Список торговых точек
  </h2>
  <div class="box">
    <ul>
      <li v-for="tradingPoint in store.tradingPointList" :key="tradingPoint.id">
        {{ tradingPoint.id+" "+tradingPoint.type+" "+tradingPoint.address }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>