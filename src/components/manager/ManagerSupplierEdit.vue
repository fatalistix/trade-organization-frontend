<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useRoute, useRouter } from 'vue-router';
import { useSupplierStore } from '../../stores/SupplierStore';
import { ref } from 'vue';
import { SupplierType } from '../../models/supplier';
import SupplierNameInput from '../supplier/SupplierNameInput.vue';
import { useSupplierRules } from '../../validation/supplier';
import useVuelidate from '@vuelidate/core';
import ProductList from '../product/ProductList.vue';
import SupplierProduct from '../supplier/SupplierProduct.vue';
import { useProductStore } from '../../stores/ProductStore';
import ProductSupplierList from '../product/ProductSupplierList.vue';
import { useProductSupplierStore } from '../../stores/ProductSupplierStore';
import SupplierProductSupplier from '../supplier/SupplierProductSupplier.vue';


const notification = useNotification()

const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)
if (isNaN(id)) {
    router.push("/not-found")
}

const supplierStore = useSupplierStore()
const productSupplierStore = useProductSupplierStore()

const isLoading = ref(true)

const name = ref("")
const type = ref(SupplierType.AVAILABLE)

async function loadSupplier() {
    await supplierStore.load(id).then(
        s => {
            name.value = s.name
            type.value = s.type
            productSupplierStore.products = s.products
            isLoading.value = false
        },
        _ => {
            notification.notify({
                text: "Не удалось загрузить поставщика",
                type: "error"
            })
        }
    )
}

loadSupplier()

const rules = useSupplierRules()

const v = useVuelidate(
    rules, { name }
)

const productStore = useProductStore()

productStore.updateProducts().then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список продуктов",
            type: "warn"
        })
    }
)

function update() {
    supplierStore.update({
        id: id,
        name: name.value,
        type: type.value,
        products: productSupplierStore.products
    }).then(
        _ => {
            notification.notify({
                text: "Поставщик обновлен",
                type: "success",
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось обновить поставщика",
                type: "warn",
            })
        }
    )
}

</script>

<template>
    <div v-if="!isLoading">
        <h1 class="title is-1 has-text-centered">Поставщик</h1>
        <div class="container">
            <div class="box has-text-centered">
                <button class="button is-primary is-fullwidth" @click="update()">Сохранить</button>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="box">
                        <h2 class="title is-2 has-text-centered">Редактировать</h2>
                        <SupplierNameInput v-model:name="name" :is-invalid="v.name.$invalid" />
                        <div class="field">
                            <label class="label">Статус</label>
                            <div class="control">
                                <div class="select is-fullwidth">
                                    <select v-model="type">
                                        <option :value="SupplierType.AVAILABLE">Доступен</option>
                                        <option :value="SupplierType.NOT_AVAILABLE">Не доступен</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="box">
                        <h2 class="title is-2 has-text-centered">Продукты</h2>
                        <ProductList>
                            <template v-for="_ in productStore.products" #default="{ id }">
                                <SupplierProduct :id="id" />
                            </template>
                        </ProductList>
                    </div>
                    <div class="box">
                        <h2 class="title is-2 has-text-centered">Продукты поставщика</h2>
                        <ProductSupplierList>
                            <template v-for="_ in productSupplierStore.products" #default="{ id }">
                                <SupplierProductSupplier :id="id" />
                            </template>
                        </ProductSupplierList>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>