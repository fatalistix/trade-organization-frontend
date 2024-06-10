<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useApplicationStore } from '../../stores/ApplicationStore';
import { useProductOrderStore } from '../../stores/ProductOrderStore';
import { ref } from 'vue';
import { ProductApplication } from '../../models/application';
import { ProductSupplier } from '../../models/supplier';

const notification = useNotification()

const applicationStore = useApplicationStore()
const productOrderStore = useProductOrderStore()

const props = defineProps<{
    id: number
    supplierProducts: ProductSupplier[]
}>()

const isLoading = ref(true)

const applicationProducts = ref<ProductApplication[]>([])

async function loadApplication() {
    await applicationStore.application(props.id).then(
        a => {
            applicationProducts.value = a.products

            isLoading.value = false
        },
        err => {
            console.error(err)
            notification.notify({
                text: "Не удалось получить список заявок",
                type: "warn"
            })
        }
    )
}

loadApplication()

const selected = ref(false)

function select() {
    if (selected.value) {
        return
    }

    for (const ap of applicationProducts.value) {
        if (props.supplierProducts.some(p => p.productId === ap.productId)) {
            const product = props.supplierProducts.find(p => p.productId === ap.productId)!!
            productOrderStore.add({
                quantity: ap.quantity,
                price: product.price,
                productId: ap.productId
            })
        }
    }

    productOrderStore.addApplicationId(props.id)

    selected.value = true

    notification.notify({
        text: "Продукты добавлены в заказ",
        type: "success"
    })
}

function unselect() {
    if (!selected.value) {
        return
    }

    for (const ap of applicationProducts.value) {
        productOrderStore.remove(ap.productId, ap.quantity)
    }

    productOrderStore.removeApplicationId(props.id)

    selected.value = false

    notification.notify({
        text: "Продукты удалены из заказа",
        type: "success"
    })
}

</script>

<template>
    <div class="columns">
        <div class="column">
            <label class="label has-text-centered">
                Заявка No{{ id }}
            </label>
        </div>
        <div class="column">
            <label class="checkbox">
                <input type="checkbox" v-bind="{ checked: selected }" @change="!selected ? select() : unselect()">
                Добавлен в заказ
            </label>
        </div>
    </div>
</template>

<style scoped></style>