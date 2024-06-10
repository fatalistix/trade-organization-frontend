<script setup lang="ts">
import { useDepartmentStoreStore } from '../../stores/DepartmentStoreStore';

const departmentStoreStore = useDepartmentStoreStore()

</script>

<template>
    <article class="media" v-for="hall in departmentStoreStore.departmentStore!!.halls">
        <div class="media-content">
            <strong>Зал {{ hall.id }} в секции {{ hall.hallContainerId }}</strong>
        </div>
    </article>
    <article class="media" v-if="departmentStoreStore.departmentStore!!.halls.length === 0">
        <div class="media-content has-text-centered">
            Тут пока пусто
        </div>
    </article>
</template>

<style scoped></style>