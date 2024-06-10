<script setup lang="ts">
import { useTradingPointStore } from '../../stores/TradingPointStore';
import { SearchOutlined } from '@ant-design/icons-vue';

const tradingPointStore = useTradingPointStore()

</script>

<template>
  <article class="panel is-info">
    <p class="panel-heading has-text-centered">Список торговых точек</p>
    <p class="panel-tabs">
      <a>Все</a>
      <a>Универмаги</a>
      <a>Магазины</a>
      <a>Лотки</a>
      <a>Киоски</a>
    </p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Поиск">
        <span class="icon is-left">
          <SearchOutlined />
        </span>
      </p>
    </div>
    <slot v-for="tradingPoint in tradingPointStore.tradingPoints" :key="tradingPoint.id" :id="tradingPoint.id"
      :type="tradingPoint.type"></slot>
  </article>
</template>

<style scoped></style>