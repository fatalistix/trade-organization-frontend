<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { ref } from 'vue';
import { useCustomerRules } from '../../validation/customer';
import useVuelidate from '@vuelidate/core';
import { useCustomerStore } from '../../stores/CustomerStore';
import CustomerFirstNameInput from './CustomerFirstNameInput.vue';
import CustomerLastNameInput from './CustomerLastNameInput.vue';
import CustomerBirthDateInput from './CustomerBirthDateInput.vue';
import CustomerPhoneNumberInput from './CustomerPhoneNumberInput.vue';

const notification = useNotification()

const firstName = ref("")
const lastName = ref("")
const birthDate = ref("")
const phoneNumber = ref("")

const rules = useCustomerRules()

const v = useVuelidate(
    rules, { firstName, lastName, phoneNumber, birthDate }
)

const customerStore = useCustomerStore()

function create() {
    customerStore.create(
        firstName.value, lastName.value, new Date(birthDate.value), phoneNumber.value
    ).then(
        _ => {
            firstName.value = ""
            lastName.value = ""
            phoneNumber.value = ""
            birthDate.value = ""

            notification.notify({
                text: "Покупатель создан",
                type: "success",
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось создать покупателя",
                type: "warn",
            })
        }
    )
}

</script>

<template>
    <CustomerFirstNameInput v-model:firstName="firstName" :is-invalid="v.firstName.$invalid"/>
    <CustomerLastNameInput v-model:lastName="lastName" :is-invalid="v.lastName.$invalid" />
    <CustomerBirthDateInput v-model:birthDate="birthDate" :is-invalid="v.birthDate.$invalid" />
    <CustomerPhoneNumberInput v-model:phoneNumber="phoneNumber" :is-invalid="v.phoneNumber.$invalid" />
    <div class="field has-text-centered">
        <button class="button is-primary" @click="create()" :disabled="v.$invalid">Создать</button>
    </div>
</template>

<style scoped></style>