<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import useVuelidate from '@vuelidate/core';
import { ref } from 'vue';
import { useSupplierStore } from '../../stores/SupplierStore';
import { useSupplierRules } from '../../validation/supplier';
import SupplierNameInput from './SupplierNameInput.vue';

const notification = useNotification()

const name = ref("")

const rules = useSupplierRules()

const v = useVuelidate(
    rules, { name }
)

const supplierStore = useSupplierStore()

function create() {
    supplierStore.create(name.value).then(
        _ => {
            name.value = ""

            notification.notify({
                text: "Поставщик создан",
                type: "success",
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось создать поставщика",
                type: "warn",
            })
        }
    )
}
</script>

<template>
    <SupplierNameInput v-model:name="name" :is-invalid="v.name.$invalid"/>
    <div class="field has-text-centered">
        <button class="button is-primary" @click="create()" :disabled="v.$invalid">Создать</button>
    </div>
</template>

<style scoped></style>