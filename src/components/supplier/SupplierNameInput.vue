<script setup lang="ts">

const name = defineModel('name', { required: true })
const _ = defineProps<{
    isInvalid: boolean
}>()

</script>

<template>
    <div class="field">
        <label class="label">Название</label>
        <div class="control">
            <input class="input" type="text" v-model="name" :class="{ 'is-danger': isInvalid }" />
        </div>
        <article class="invalid-feedback message is-danger" v-if="isInvalid">
            <div class="message-body">
                Введите название поставщика
            </div>
        </article>
    </div>
</template>

<style scoped></style>