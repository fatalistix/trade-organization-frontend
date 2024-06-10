<script setup lang="ts">
import { ref } from 'vue';
import ProductEdit from './ProductEdit.vue';
import { useProductStore } from '../../stores/ProductStore';

const productStore = useProductStore()

const props = defineProps<{
    id: number
}>()

const product = productStore.getById(props.id)!!

const isModalOpened = ref(false)

</script>

<template>
    <div class="modal" v-if="isModalOpened" :class="{ 'is-active': isModalOpened }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h3 class="title is-3 has-text-centered">Редактирование</h3>
                <ProductEdit :id="product.id" />
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="isModalOpened = false"></button>
    </div>
    <div class="fixed-grid has-2-cols">
        <div class="grid">
            <div class="cell">
                <strong>{{ product.name }}</strong>
            </div>
            <div class="cell">
                <button class="button is-fullwidth is-small" @click="isModalOpened = true">
                    Редактировать
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>