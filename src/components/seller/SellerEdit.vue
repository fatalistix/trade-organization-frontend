<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { useSellerStore } from '../../stores/SellerStore';
import { ref } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import { useSellerRules } from '../../validation/seller';
import { Seller } from '../../models/seller';
import SellerFirstNameInput from './SellerFirstNameInput.vue';
import SellerLastNameInput from './SellerLastNameInput.vue';
import SellerMiddleNameInput from './SellerMiddleNameInput.vue';
import SellerBirthDateInput from './SellerBirthDateInput.vue';
import SellerSalaryRublesInput from './SellerSalaryRublesInput.vue';
import SellerSalaryPenniesInput from './SellerSalaryPenniesInput.vue';
import SellerPhoneNumberInput from './SellerPhoneNumberInput.vue';

const notification = useNotification()

const sellerStore = useSellerStore()

const props = defineProps<{
    id: number
}>()

const isLoading = ref(true)

const firstName = ref("")
const lastName = ref("")
const middleName = ref("")
const birthDate = ref("")
const salaryRubles = ref(0)
const salaryPennies = ref(0)
const phoneNumber = ref("")

const rules = useSellerRules()

const v = useVuelidate(
    rules,
    { firstName, lastName, middleName, birthDate, salaryRubles, salaryPennies, phoneNumber },
)

async function loadSeller() {
    await sellerStore.seller(props.id).then(
        s => {
            firstName.value = s.firstName
            lastName.value = s.lastName
            middleName.value = s.middleName
            birthDate.value = Seller.birthDateToString(s.birthDate)
            salaryRubles.value = s.salary.rubles
            salaryPennies.value = s.salary.pennies
            phoneNumber.value = s.phoneNumber

            isLoading.value = false
        },
        _ => {
            notification.notify({
                text: "Не удалось получить список продавцов",
                type: "warn"
            })
        }
    )
}

loadSeller()

function patch() {
    sellerStore.patch(
        props.id,
        firstName.value,
        lastName.value,
        middleName.value,
        new Date(birthDate.value),
        { 
            rubles: salaryRubles.value, 
            pennies: salaryPennies.value,
        },
        phoneNumber.value,
        null
    ).then(
        _ => {
            notification.notify({
                text: "Продавец обновлен",
                type: "success",
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось обновить продавца",
                type: "warn",
            })
        }
    )
}

</script>

<template>
    <div v-id="!isLoading">
        <SellerFirstNameInput v-model:first-name="firstName" :is-invalid="v.firstName.$invalid" />
        <SellerLastNameInput v-model:last-name="lastName" :is-invalid="v.lastName.$invalid" />
        <SellerMiddleNameInput v-model:middle-name="middleName" :is-invalid="v.middleName.$invalid" />
        <SellerBirthDateInput v-model:birth-date="birthDate" :is-invalid="v.birthDate.$invalid" />
        <SellerSalaryRublesInput v-model:salary-rubles="salaryRubles" :is-invalid="v.salaryRubles.$invalid" />
        <SellerSalaryPenniesInput v-model:salary-pennies="salaryPennies" :is-invalid="v.salaryPennies.$invalid" />
        <SellerPhoneNumberInput v-model:phone-number="phoneNumber" :is-invalid="v.phoneNumber.$invalid" />
        <div class="field has-text-centered">
            <button class="button is-primary" @click="patch()" :disabled="v.$invalid">Сохранить</button>
        </div>
    </div>
</template>

<style scoped></style>