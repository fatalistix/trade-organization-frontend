<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { ref } from 'vue';
import { useProductRules } from '../../validation/product';
import useVuelidate from '@vuelidate/core';
import ProductNameInput from './ProductNameInput.vue';
import ProductDescriptionInput from './ProductDescriptionInput.vue';
import { useProductStore } from '../../stores/ProductStore';

const notification = useNotification()

const productStore = useProductStore()

const props = defineProps<{
    id: number
}>()

const isLoading = ref(true)

const name = ref("")
const description = ref("")

const rules = useProductRules()

const v = useVuelidate(
    rules, { name, description }
)

async function loadProduct() {
    await productStore.product(props.id).then(
        p => {
            name.value = p.name
            description.value = p.description
            isLoading.value = false
        },
        err => {
            notification.notify({
                text: err.message
            })
        }
    )
}

loadProduct()

function update() {
    productStore.update(props.id, name.value, description.value).then(
        _ => {
            notification.notify({
                text: "Продукт обновлен",
                type: "success",
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось обновить продукт",
                type: "warn",
            })
        }
    )
}

</script>

<template>
    <div v-if="!isLoading">
        <ProductNameInput v-model:name="name" :is-invalid="v.name.$invalid" />
        <ProductDescriptionInput v-model:description="description" :is-invalid="v.description.$invalid" />
        <div class="field has-text-centered">
            <button class="button is-primary" @click="update()" :disabled="v.$invalid">Сохранить</button>
        </div>
    </div>
</template>

<style scoped></style>