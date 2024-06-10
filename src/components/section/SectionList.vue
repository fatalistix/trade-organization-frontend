<script setup lang="ts">
import { useDepartmentStoreStore } from '../../stores/DepartmentStoreStore';

const departmentStoreStore = useDepartmentStoreStore()

</script>

<template>
    <article class="media" v-for="section in departmentStoreStore.departmentStore!!.sections">
        <div class="media-content">
            <strong>Секция {{ section.id }}</strong>
        </div>
    </article>
</template>

<style scoped>
</style>