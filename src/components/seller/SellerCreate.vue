<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useVuelidate } from '@vuelidate/core';
import { ref } from 'vue';
import { useSellerStore } from '../../stores/SellerStore';
import { Money } from '../../models/core';
import { isError } from 'ts-try';
import { useSellerRules } from '../../validation/seller';
import SellerFirstNameInput from './SellerFirstNameInput.vue';
import SellerLastNameInput from './SellerLastNameInput.vue';
import SellerMiddleNameInput from './SellerMiddleNameInput.vue';
import SellerBirthDateInput from './SellerBirthDateInput.vue';
import SellerSalaryRublesInput from './SellerSalaryRublesInput.vue';
import SellerSalaryPenniesInput from './SellerSalaryPenniesInput.vue';
import SellerPhoneNumberInput from './SellerPhoneNumberInput.vue';

const notification = useNotification()

const sellerStore = useSellerStore()

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

function create() {
    const salary = Money.from(salaryRubles.value, salaryPennies.value)
    if (isError(salary)) {
        notification.notify({
            text: "Неверная сумма заработка",
            type: "warn"
        })
        return
    }

    sellerStore.create(
        firstName.value,
        lastName.value,
        middleName.value,
        new Date(birthDate.value),
        salary,
        phoneNumber.value
    ).then(
        _ => {
            firstName.value = ""
            lastName.value = ""
            middleName.value = ""
            birthDate.value = ""
            salaryRubles.value = 0
            salaryPennies.value = 0
            phoneNumber.value = ""

            notification.notify({
                text: "Продавец зарегистрирован",
                type: "success",
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось зарегистрировать продавца",
                type: "warn",
            })
        }
    )
}

</script>

<template>
    <div class="fixed-grid has-3-cols">
        <div class="grid">
            <div class="cell">
                <SellerFirstNameInput v-model:firstName="firstName" :is-invalid="v.firstName.$invalid" />
            </div>
            <div class="cell">
                <SellerLastNameInput v-model:lastName="lastName" :is-invalid="v.lastName.$invalid" />
            </div>
            <div class="cell">
                <SellerMiddleNameInput v-model:middleName="middleName" :is-invalid="v.middleName.$invalid" />
            </div>
            <div class="cell">
                <SellerBirthDateInput v-model:birthDate="birthDate" :is-invalid="v.birthDate.$invalid" />
            </div>
            <div class="cell">
                <SellerSalaryRublesInput v-model:salaryRubles="salaryRubles" :is-invalid="v.salaryRubles.$invalid" />
                <SellerSalaryPenniesInput v-model:salaryPennies="salaryPennies"
                    :is-invalid="v.salaryPennies.$invalid" />
            </div>
            <div class="cell">
                <SellerPhoneNumberInput v-model:phoneNumber="phoneNumber" :is-invalid="v.phoneNumber.$invalid" />
            </div>
        </div>
    </div>
    <div class="field has-text-centered">
        <button class="button is-primary" @click="create()" :disabled="v.$invalid">Создать</button>
    </div>
</template>

<style scoped></style>