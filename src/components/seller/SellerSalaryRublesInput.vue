<script setup lang="ts">

const salaryRubles = defineModel('salaryRubles', { required: true })
const _ = defineProps<{
    isInvalid: boolean
}>()

</script>

<template>
    <div class="field">
        <label class="label">Зарплата (рубли)</label>
        <div class="control">
            <input type="number" v-model="salaryRubles" :class="{ 'is-danger': isInvalid }" class="input">
        </div>
        <article class="invalid-feedback message is-danger" v-if="isInvalid">
            <div class="message-body">
                Размер зарплаты в рублях не может быть пустым или отрицательным.
            </div>
        </article>
    </div>
</template>

<style scoped></style>