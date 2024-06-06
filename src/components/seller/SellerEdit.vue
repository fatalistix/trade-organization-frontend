<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { numeric, required } from '@vuelidate/validators';
import { useSellerStore } from '../../stores/SellerStore';
import { ref, toRefs } from 'vue';

const sellerStore = useSellerStore()

const props = defineProps<{
    id: number
}>()

const seller = sellerStore.getById(props.id)!!

const {
    firstName, lastName, middleName, birthDate, phoneNumber
} = toRefs(seller)

const salaryRubles = ref(seller.salary.rubles)
const salaryPennies = ref(seller.salary.pennies)

const rules = {
    firstName: {
        required,
    },
    lastName: {
        required,
    },
    middleName: {
        required,
    },
    birthDate: {
        required,
        custom: (s: string) => {
            const val = new Date(s)
            const now = new Date()
            if (val.getUTCFullYear() > now.getUTCFullYear()) {
                return false
            }
            if (val.getUTCFullYear() < now.getUTCFullYear()) {
                return true
            }
            if (val.getMonth() > now.getMonth()) {
                return false
            }
            if (val.getMonth() < now.getMonth()) {
                return true
            }
            if (val.getDay() >= now.getDay()) {
                return false
            }
            return true
        }
    },
    salaryRubles: {
        required,
        numeric,
        custom: (value: number) => (value >= 0) && (Math.trunc(value) == value),
    },
    salaryPennies: {
        required,
        numeric,
        custom: (value: number) => (value >= 0) && (value <= 99) && (Math.trunc(value) == value),
    },
    phoneNumber: {
        required,
    }
}

const v = useVuelidate(
    rules,
    { firstName, lastName, middleName, birthDate, salaryRubles, salaryPennies, phoneNumber },
)


function update() {

}

</script>

<template>
    <h2 class="title is-2 has-text-centered">Редактировать продавца</h2>
    <div class="box">
        <div class="field">
            <label class="label">Имя</label>
            <div class="control">
                <input class="input" type="text" v-model="firstName" :class="{ 'is-invalid': v.firstName.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.firstName.$invalid">
                <div class="message-body">
                    Имя не может быть пустым.
                </div>
            </article>
        </div>
        <div class="field">
            <label class="label">Фамилия</label>
            <div class="control">
                <input class="input" type="text" v-model="lastName" :class="{ 'is-invalid': v.lastName.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.lastName.$invalid">
                <div class="message-body">
                    Фамилия не может быть пустой.
                </div>
            </article>
        </div>
        <div class="field">
            <label class="label">Отчество</label>
            <div class="control">
                <input class="input" type="text" v-model="middleName"
                    :class="{ 'is-invalid': v.middleName.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.middleName.$invalid">
                <div class="message-body">
                    Отчество не может быть пустым.
                </div>
            </article>
        </div>
        <div class="field">
            <label class="label">Дата рождения</label>
            <div class="control">
                <input class="input" type="date" v-model="birthDate" :class="{ 'is-invalid': v.birthDate.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.birthDate.$invalid">
                <div class="message-body" v-if="v.birthDate.required.$invalid">
                    Дата рождения не может быть пустой.
                </div>
                <div class="message-body" v-if="v.birthDate.custom.$invalid">
                    {{ v.birthDate.custom }}
                    Дата рождения не может быть больше текущей.
                </div>
            </article>
        </div>
        <div class="field">
            <label class="label">Зарплата (рубли)</label>
            <div class="control">
                <input class="input" type="number" v-model="salaryRubles"
                    :class="{ 'is-invalid': v.salaryRubles.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.salaryRubles.$invalid">
                <div class="message-body">
                    Зарплата должна быть положительной.
                </div>
            </article>
        </div>
        <div class="field">
            <label class="label">Зарплата (копейки)</label>
            <div class="control">
                <input class="input" type="number" v-model="salaryPennies"
                    :class="{ 'is-invalid': v.salaryPennies.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.salaryPennies.$invalid">
                <div class="message-body">
                    Зарплата должна быть положительной. Копейка должна быть от 0 до 99.
                </div>
            </article>
        </div>
        <div class="field">
            <label class="label">Номер телефона</label>
            <div class="control">
                <input class="input" type="text" v-model="phoneNumber"
                    :class="{ 'is-invalid': v.phoneNumber.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.phoneNumber.$invalid">
                <div class="message-body">
                    Номер телефона не может быть пустым.
                </div>
            </article>
        </div>
        <div class="field has-text-centered">
            <button class="button is-primary" @click="update()" :disabled="v.$invalid">Зарегистрировать</button>
        </div>
    </div>
</template>

<style scoped></style>