<script setup lang="ts">

const description = defineModel('description', { required: true })
const props = defineProps<{
    isInvalid: boolean 
}>()

</script>

<template>
    <div class="field">
        <label class="label">Описание</label>
        <div class="control">
            <textarea class="textarea" type="text" v-model="description"
                :class="{ 'is-danger': isInvalid }" />
        </div>
        <article class="invalid-feedback message is-danger" v-if="isInvalid">
            <div class="message-body">
                Введите описание продукта
            </div>
        </article>
    </div>
</template>

<style scoped></style>