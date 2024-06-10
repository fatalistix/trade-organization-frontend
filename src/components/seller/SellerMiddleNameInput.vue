<script setup lang="ts">

const middleName = defineModel('middleName', { required: true })
const _ = defineProps<{
    isInvalid: boolean
}>()

</script>

<template>
    <div class="field">
        <label class="label">Отчество</label>
        <div class="control">
            <input type="text" v-model="middleName" :class="{ 'is-danger': isInvalid }" class="input">
        </div>
        <article class="invalid-feedback message is-danger" v-if="isInvalid">
            <div class="message-body">
                Отчество не может быть пустым.
            </div>
        </article>
    </div>
</template>

<style scoped></style>