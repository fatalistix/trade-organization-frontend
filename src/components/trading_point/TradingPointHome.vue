<script setup lang="ts">
import SellerList from '../seller/SellerList.vue';
import { useSellerStore } from '../../stores/SellerStore';
import { WorksAtFilterType } from '../../models/seller';
import { useTradingPointStore } from '../../stores/TradingPointStore';
import { useNotification } from '@kyvg/vue3-notification';
import { useRoute, useRouter } from 'vue-router';
import { TradingPointType } from '../../models/trading_point';
import { isError } from 'ts-try';
import SellerPush from '../seller/SellerPush.vue';

const notification = useNotification()

const route = useRoute()
const router = useRouter()

const tradingPointStore = useTradingPointStore()
const sellerStore = useSellerStore()

const id = Number(route.params.id)
if (isNaN(id)) {
    router.push("/not-found")
}

if (typeof route.params.type !== "string") {
    router.push("/not-found")
}

const possibleType = TradingPointType.fromString(route.params.type as string)
if (isError(possibleType)) {
    console.log(possibleType)
    console.log(route.params.type)
    router.push("/not-found")
}

const type = possibleType as TradingPointType

sellerStore.updateSellers({
    worksAtFilterType: WorksAtFilterType.ONLY_NOT_NULL,
    tradingPointId: id,
    tradingPointType: type,
    placeOfWorkId: null,
    placeOfWorkType: null,
    search: null
}).then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список продавцов",
            type: "error"
        })
    }
)
</script>

<template>
    <div class="container">
        <div class="box">
            <h2 class="title is-2 has-text-centered">Выберите продавца</h2>
            <SellerList>
                <template v-for="_ in sellerStore.sellers" #default="{ id }">
                    <SellerPush :id="id" base-url="/seller" />
                </template>
            </SellerList>
        </div>
    </div>
</template>

<style scoped></style>
