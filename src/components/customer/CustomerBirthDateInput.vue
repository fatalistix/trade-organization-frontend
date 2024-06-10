<script setup lang="ts">

const birthDate = defineModel('birthDate', { required: true })
const _ = defineProps<{
    isInvalid: boolean
}>()

</script>

<template>
    <div class="field">
        <label class="label">Дата рождения</label>
        <div class="control">
            <input type="date" v-model="birthDate" :class="{ 'is-danger': isInvalid }" class="input">
        </div>
        <article class="invalid-feedback message is-danger" v-if="isInvalid">
            <div class="message-body">
                Дата рождения должна быть заполнена. Также она не может быть больше текущей.
            </div>
        </article>
    </div>
</template>

<style scoped></style>