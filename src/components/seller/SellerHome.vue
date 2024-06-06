<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useProductStore } from '../../stores/ProductStore';
import ApplicationProductList from '../application/ApplicationProductList.vue';
import ApplicationCreate from '../application/ApplicationCreate.vue';
import ApplicationSelectedProductList from '../application/ApplicationSelectedProductList.vue';

const notification = useNotification()

const productStore = useProductStore()

productStore.updateList().then(
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
    <div class="container">
        <h2 class="title is-2 has-text-centered">Заявка</h2>
        <div class="box">
            <h3 class="title is-3 has-text-centered">Отправить заявку</h3>
            <ApplicationCreate />
        </div>
        <div class="box">
            <h3 class="title is-3 has-text-centered">Выберите продукты</h3>
            <ApplicationProductList />
        </div>
        <div class="box">
            <ApplicationSelectedProductList />
        </div>
    </div>
</template>

<style scoped></style>