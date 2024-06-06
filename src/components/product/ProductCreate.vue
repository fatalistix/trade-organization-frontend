<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { ref } from 'vue';
import { useProductStore } from '../../stores/ProductStore';

const notification = useNotification()

const name = ref("")
const description = ref("")

const rules = {
    name: {
        required,
    },
    description: {
        required
    }
}

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
    <div class="field">
        <label class="label">Название</label>
        <input class="input" type="text" v-model="name" :class="{ 'is-invalid': v.name.$invalid }" />
        <article class="invalid-feedback message is-danger" v-if="v.name.$invalid">
            <div class="message-body">
                Введите название продукта
            </div>
        </article>
    </div>
    <div class="field">
        <label class="label">Описание</label>
        <textarea class="textarea" type="text" v-model="description" :class="{ 'is-invalid': v.description.$invalid }" />
        <article class="invalid-feedback message is-danger" v-if="v.description.$invalid">
            <div class="message-body">
                Введите описание продукта
            </div>
        </article>
    </div>
    <div class="field has-text-centered">
        <button class="button is-primary" @click="create()" :disabled="v.$invalid">Создать</button>
    </div>
</template>

<style scoped></style>