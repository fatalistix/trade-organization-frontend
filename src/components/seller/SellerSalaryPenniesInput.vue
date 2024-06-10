<script setup lang="ts">

const salaryPennies = defineModel('salaryPennies', { required: true })
const _ = defineProps<{
    isInvalid: boolean
}>()

</script>

<template>
    <div class="field">
        <label class="label">Зарплата (Копейки)</label>
        <div class="control">
            <input type="number" v-model="salaryPennies" :class="{ 'is-danger': isInvalid }" class="input">
        </div>
        <article class="invalid-feedback message is-danger" v-if="isInvalid">
            <div class="message-body">
                Размер зарплаты в копейках должен находиться в диапазоне от 0 до 99
            </div>
        </article>
    </div>
</template>

<style scoped></style>