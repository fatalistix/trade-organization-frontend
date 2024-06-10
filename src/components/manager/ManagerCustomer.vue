<script setup lang="ts">
import CustomerCreate from '../customer/CustomerCreate.vue';
import ManagerTabs from './ManagerTabs.vue';
import CustomerList from '../customer/CustomerList.vue';
import { useCustomerStore } from '../../stores/CustomerStore';
import CustomerModal from '../customer/CustomerModal.vue';
import { useNotification } from '@kyvg/vue3-notification';

const notification = useNotification()

const customerStore = useCustomerStore()

customerStore.updateCustomers().then(
    _ => { },
    _ => { 
        notification.notify({
            text: "Не удалось получить список покупателей",
            type: "warn"
        })
    }
)

</script>

<template>
    <ManagerTabs activeTab="customer" />
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="box">
                    <h2 class="title is-2 has-text-centered">Покупатели</h2>
                    <CustomerList>
                        <template v-for="_ in customerStore.customers" #default="{ id }">
                            <CustomerModal :id="id" />
                        </template>
                    </CustomerList>
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <h2 class="title is-2 has-text-centered">Добавить нового покупателя</h2>
                    <CustomerCreate />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>