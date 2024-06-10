<script setup lang="ts">

const firstName = defineModel('firstName', { required: true })
const _ = defineProps<{
    isInvalid: boolean
}>()

</script>

<template>
    <div class="field">
        <label class="label">Имя</label>
        <div class="control">
            <input type="text" v-model="firstName" :class="{ 'is-danger': isInvalid }" class="input">
        </div>
        <article class="invalid-feedback message is-danger" v-if="isInvalid">
            <div class="message-body">
                Имя не может быть пустым.
            </div>
        </article>
    </div>
</template>

<style scoped></style>