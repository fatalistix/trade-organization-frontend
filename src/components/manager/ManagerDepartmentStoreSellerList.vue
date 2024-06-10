<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useSellerStore } from '../../stores/SellerStore';
import { SearchOutlined } from '@ant-design/icons-vue'
import { SellerFilter, WorksAtFilterType } from '../../models/seller';
import ManagerDepartmentStoreSellerListElement from './ManagerDepartmentStoreSellerListElement.vue';
import { TradingPointType } from '../../models/trading_point';

const notification = useNotification()

const sellerStore = useSellerStore()

const props = defineProps<{
    tradingPointId: number
    tradingPointType: TradingPointType
}>()

let filter: SellerFilter = {
    worksAtFilterType: WorksAtFilterType.ALL,
    tradingPointId: props.tradingPointId,
    tradingPointType: props.tradingPointType,
    placeOfWorkId: null,
    placeOfWorkType: null,
    search: null
}

sellerStore.updateSellers(filter).then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список продавцов",
            type: "warn"
        })
    }
)

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
                    <ManagerDepartmentStoreSellerListElement :id="seller.id" />
                </li>
            </ul>
        </aside>
    </div>
</template>

<style scoped></style>