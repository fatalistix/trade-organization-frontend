<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useCustomerStore } from '../../stores/CustomerStore';
import { ref } from 'vue';
import { useCustomerRules } from '../../validation/customer';
import useVuelidate from '@vuelidate/core';
import CustomerFirstNameInput from './CustomerFirstNameInput.vue';
import CustomerLastNameInput from './CustomerLastNameInput.vue';
import CustomerBirthDateInput from './CustomerBirthDateInput.vue';
import CustomerPhoneNumberInput from './CustomerPhoneNumberInput.vue';
import { Customer } from '../../models/customer';

const notification = useNotification()

const customerStore = useCustomerStore()

const props = defineProps<{
    id: number
}>()

const isLoading = ref(false)

const firstName = ref("")
const lastName = ref("")
const birthDate = ref("")
const phoneNumber = ref("")

const rules = useCustomerRules()

const v = useVuelidate(
    rules, { firstName, lastName, phoneNumber, birthDate }
)

async function loadCustomer() {
    await customerStore.customer(props.id).then(
        c => {
            firstName.value = c.firstName
            lastName.value = c.lastName
            birthDate.value = Customer.birthDateToString(c.birthDate)
            phoneNumber.value = c.phoneNumber

            isLoading.value = false
        },
        _ => {
            notification.notify({
                text: "Не удалось получить покупателя",
                type: "warn"
            })
        }
    )
}

loadCustomer()

function update() {
    customerStore.update({
        id: props.id,
        firstName: firstName.value,
        lastName: lastName.value,
        birthDate: new Date(birthDate.value),
        phoneNumber: phoneNumber.value
    }).then(
        _ => {
            notification.notify({
                text: "Покупатель обновлен",
                type: "success",
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось обновить покупателя",
                type: "warn",
            })
        }
    )
}

</script>

<template>
    <div v-if="!isLoading">
        <CustomerFirstNameInput v-model:firstName="firstName" :is-invalid="v.firstName.$invalid" />
        <CustomerLastNameInput v-model:lastName="lastName" :is-invalid="v.lastName.$invalid" />
        <CustomerBirthDateInput v-model:birthDate="birthDate" :is-invalid="v.birthDate.$invalid" />
        <CustomerPhoneNumberInput v-model:phoneNumber="phoneNumber" :is-invalid="v.phoneNumber.$invalid" />
        <div class="field has-text-centered">
            <button class="button is-primary" @click="update()" :disabled="v.$invalid">Сохранить</button>
        </div>
    </div>
</template>

<style scoped></style>