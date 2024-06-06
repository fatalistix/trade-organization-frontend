<script setup lang="ts">
import { useSellerStore } from '../../stores/SellerStore';

const sellerStore = useSellerStore()

</script>

<template>
    <div class="box">
        <article class="panel is-info">
            <p class="panel-heading has-text-centered">Список продавцов</p>
            <p class="panel-tabs">
                <a>Все</a>
                <a>Работающие здесь</a>
                <a>Нигде не работающие</a>
            </p>
            <div class="panel-block">
                <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="Поиск">
                    <span class="icon is-left">
                        <SearchOutlined />
                    </span>
                </p>
            </div>
        </article>
        <aside class="menu">
            <ul class="menu-list">
                <li v-for="seller in sellerStore.sellers">
                    <slot :id="seller.id"></slot>
                </li>
            </ul>
        </aside>
    </div>
</template>

<style scoped></style>