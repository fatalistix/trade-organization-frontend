<script setup lang="ts">
import SellerList from './ManagerDepartmentStoreSellerList.vue';
import { useNotification } from '@kyvg/vue3-notification';
import { useDepartmentStoreStore } from '../../stores/DepartmentStoreStore';
import SectionList from '../section/SectionList.vue';
import SectionAdd from '../section/SectionAdd.vue';
import DepartmentStoreHallList from '../hall/DepartmentStoreHallList.vue';
import DepartmentStoreHallAdd from '../hall/DepartmentStoreHallAdd.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { TradingPointType } from '../../models/trading_point';

const notification = useNotification()

const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)
if (isNaN(id)) {
    router.push("/not-found")
}

const departmentStoreStore = useDepartmentStoreStore()

const isLoading = ref(true)

async function loadDepartmentStore() {
    await departmentStoreStore.load(id).then(
        _ => {
            isLoading.value = false
        },
        err => {
            console.error(err)
            notification.notify({
                text: "Не удалось загрузить универмаг",
                type: "error"
            })
        }
    )
}

loadDepartmentStore()
</script>

<template>
    <h2 class="title is-2 has-text-centered">Универмаг</h2>
    <div class="container" v-if="!isLoading">
        <div class="columns">
            <div class="column">
                <div class="box">
                    <h2 class="title is-2 has-text-centered">Секции</h2>
                    <SectionList />
                    <SectionAdd />
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <h2 class="title is-2 has-text-centered">Залы</h2>
                    <DepartmentStoreHallList />
                </div>
                <div class="box">
                    <DepartmentStoreHallAdd />
                </div>
            </div>
        </div>
        <SellerList :trading-point-id="id" :trading-point-type="TradingPointType.DEPARTMENT_STORE" />
    </div>
</template>

<style scoped></style>