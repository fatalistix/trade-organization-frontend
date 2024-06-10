<script setup lang="ts">
import { ref } from 'vue';
import { useSellerStore } from '../../stores/SellerStore';
import SellerEdit from './SellerEdit.vue';

const sellerStore = useSellerStore()

const props = defineProps<{
    id: number
}>()

const seller = sellerStore.getById(props.id)!!

const isModalOpened = ref(false)

</script>

<template>
    <div class="modal" v-if="isModalOpened" :class="{ 'is-active': isModalOpened }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h3 class="title is-3 has-text-centered">Редактирование</h3>
                <SellerEdit :id="seller.id" />
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="isModalOpened = false"></button>
    </div>
    <div class="fixed-grid has-2-cols">
        <div class="grid">
            <div class="cell">
                <strong>{{ seller.firstName + " " + seller.lastName + " " + seller.middleName }}</strong>
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