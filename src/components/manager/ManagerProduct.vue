<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import ProductList from '../product/ProductList.vue';
import ProductCreate from '../product/ProductCreate.vue';
import ManagerTabs from './ManagerTabs.vue';
import ProductModal from '../product/ProductModal.vue';
import { useProductStore } from '../../stores/ProductStore';

const notification = useNotification()

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

</script>

<template>
    <ManagerTabs activeTab="product" />
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="box">
                    <h2 class="title is-2 has-text-centered">Товары</h2>
                    <ProductList>
                        <template v-for="_ in productStore.products" #default="{ id }">
                            <ProductModal :id="id" />
                        </template>
                    </ProductList>
                </div>
            </div>
            <div class="column">
                <dib class="box">
                    <h2 class="title is-2 has-text-centered">Добавить новый продукт</h2>
                    <ProductCreate />
                </dib>
            </div>
        </div>
    </div>
</template>

<style scoped></style>