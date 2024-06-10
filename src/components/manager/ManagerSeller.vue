<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { WorksAtFilterType } from '../../models/seller';
import { useSellerStore } from '../../stores/SellerStore';
import SellerRegister from '../seller/SellerCreate.vue';
import SellerList from '../seller/SellerList.vue';
import ManagerTabs from './ManagerTabs.vue';
import SellerModal from '../seller/SellerModal.vue';

const notification = useNotification()

const sellerStore = useSellerStore()

sellerStore.updateSellers({
    worksAtFilterType: WorksAtFilterType.ALL,
    tradingPointId: null,
    tradingPointType: null,
    placeOfWorkId: null,
    placeOfWorkType: null,
    search: null
}).then(
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
    <ManagerTabs activeTab="seller" />
    <div class="container">
        <div class="box">
            <h2 class="title is-2 has-text-centered">Создать нового продавца</h2>
            <SellerRegister />
        </div>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <SellerList>
                        <template v-for="_ in sellerStore.sellers" #default="{ id }">
                            <SellerModal :id="id" />
                        </template>
                    </SellerList>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>