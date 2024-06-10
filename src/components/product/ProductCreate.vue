<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import useVuelidate from '@vuelidate/core';
import { ref } from 'vue';
import ProductNameInput from './ProductNameInput.vue';
import { useProductRules } from '../../validation/product';
import ProductDescriptionInput from './ProductDescriptionInput.vue';
import { useProductStore } from '../../stores/ProductStore';

const notification = useNotification()

const name = ref("")
const description = ref("")

const rules = useProductRules()

const v = useVuelidate(
    rules, { name, description }
)

const productStore = useProductStore()

function create() {
    productStore.create(
        name.value, description.value,
    ).then(
        _ => {
            name.value = ""
            description.value = ""

            notification.notify({
                text: "Продукт создан",
                type: "success",
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось создать продукт",
                type: "warn",
            })
        }
    )
}

</script>

<template>
    <ProductNameInput v-model:name="name" :is-invalid="v.name.$invalid"/>
    <ProductDescriptionInput v-model:description="description" :is-invalid="v.description.$invalid" />
    <div class="field has-text-centered">
        <button class="button is-primary" @click="create()" :disabled="v.$invalid">Создать</button>
    </div>
</template>

<style scoped></style>