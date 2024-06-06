<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useDepartmentStoreStore } from '../../stores/DepartmentStoreStore';
import { ref } from 'vue';
import { numeric, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const departmentStoreStore = useDepartmentStoreStore()
const notification = useNotification()

const section = ref(-1)

const rules = {
    section: {
        required,
        numeric,
        custom: (value: number) => (value >= 0)
    }
}

const v = useVuelidate(
    rules, { section }
)

function addHall() {
    if (section.value === -1) {
        notification.notify({
            text: "Выберите секцию",
            type: "warn"
        })
        return
    }

    departmentStoreStore.addHall(
        section.value,
    ).then(
        _ => {
            notification.notify({
                text: "Зал добавлен",
                type: "success"
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось добавить зал",
                type: "warn"
            })
        }
    )
}

</script>

<template>
    <div class="field">
        <div class="level">
            <div class="level-item">
                <label class="label">Секция, в которой будет находиться зал</label>
            </div>
            <div class="level-item">
                <div class="select">
                    <select v-model="section">
                        <option :value="section.id" v-for="section in departmentStoreStore.sections">Секция {{
                            section.id }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <article class="invalid-feedback message is-danger" v-if="v.section.$invalid">
            <div class="message-body">
                Выберите секцию
            </div>
        </article>
    </div>
    <div class="field has-text-centered">
        <button class="button is-primary" @click="addHall" :disabled="v.$invalid">Добавить</button>
    </div>
</template>

<style scoped></style>