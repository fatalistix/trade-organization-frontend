<script setup lang="ts">
import { computed } from 'vue';
import { useProductOrderStore } from '../../stores/ProductOrderStore';
import { useProductStore } from '../../stores/ProductStore';

const productOrderStore = useProductOrderStore()
const productStore = useProductStore()

const props = defineProps<{
    id: number
}>()

const product = productStore.getById(props.id)!!

const quantity = computed({
    get: () => { return productOrderStore.getByProductId(props.id)!!.quantity },
    set: () => { }
})

</script>

<template>
    <div class="columns">
        <div class="column">
            <label class="label has-text-centered">
                {{ product.name }}
            </label>
        </div>
        <div class="column">
            <label class="label has-text-centered">
                {{ quantity }}
            </label>
        </div>
    </div>
</template>

<style scoped></style>