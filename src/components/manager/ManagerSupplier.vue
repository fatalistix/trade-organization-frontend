<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useSupplierStore } from '../../stores/SupplierStore';
import ManagerTabs from './ManagerTabs.vue';
import SupplierList from '../supplier/SupplierList.vue';
import SupplierCreate from '../supplier/SupplierCreate.vue';
import SupplierPush from '../supplier/SupplierPush.vue';

const notification = useNotification()

const supplierStore = useSupplierStore()

supplierStore.updateSuppliers().then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список поставщиков",
            type: "warn"
        })
    }
)

</script>

<template>
    <ManagerTabs activeTab="supplier" />
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="box">
                    <h2 class="title is-2 has-text-centered">Поставщики</h2>
                    <SupplierList>
                        <template v-for="_ in supplierStore.suppliers" #default="{ id }">
                            <SupplierPush :id="id" :baseUrl="`/manager/supplier`" />
                        </template>
                    </SupplierList>
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <h2 class="title is-2 has-text-centered">Добавить нового поставщика</h2>
                    <SupplierCreate />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>