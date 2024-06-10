<script setup lang="ts">
import { useSellerStore } from '../../stores/SellerStore';

const sellerStore = useSellerStore()

const props = defineProps<{
    id: number
    baseUrl: string
}>()

const seller = sellerStore.getById(props.id)!!

</script>

<template>
    <div class="fixed-grid has-2-cols">
        <div class="grid">
            <div class="cell">
                <strong>{{ seller.firstName + " " + seller.lastName + " " + seller.middleName }}</strong>
            </div>
            <div class="cell">
                <RouterLink class="button is-fullwidth is-small" :to="`${props.baseUrl}/${seller.id}`">
                    Выбрать
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped></style>