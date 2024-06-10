<script setup lang="ts">

const lastName = defineModel('lastName', { required: true })
const _ = defineProps<{
    isInvalid: boolean
}>()

</script>

<template>
    <div class="field">
        <label class="label">Фамилия</label>
        <div class="control">
            <input type="text" v-model="lastName" :class="{ 'is-danger': isInvalid }" class="input">
        </div>
        <article class="invalid-feedback message is-danger" v-if="isInvalid">
            <div class="message-body">
                Фамилия не может быть пустой.
            </div>
        </article>
    </div>
</template>

<style scoped></style>