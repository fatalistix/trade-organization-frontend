<script setup lang="ts">

const phoneNumber = defineModel('phoneNumber', { required: true })
const _ = defineProps<{
    isInvalid: boolean
}>()

</script>

<template>
    <div class="field">
        <label class="label">Номер телефона</label>
        <div class="control">
            <input type="text" v-model="phoneNumber" :class="{ 'is-danger': isInvalid }" class="input">
        </div>
        <article class="invalid-feedback message is-danger" v-if="isInvalid">
            <div class="message-body">
                Номер телефона не может быть пустой.
            </div>
        </article>
    </div>
</template>

<style scoped></style>