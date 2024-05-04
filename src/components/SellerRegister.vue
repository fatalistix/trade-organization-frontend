<script setup lang="ts">
import { ref } from 'vue';

let firstName = ref("")
let lastName = ref("")
let middleName = ref("")
let birthDate = ref(new Date())
let salary = ref(0)
let phoneNumber = ref("")

</script>

<template>
    <h1>Зарегистрировать нового сотрудника</h1>    
    <div>
        <Label>Имя</Label>
        <input type="text" v-model="firstName" />
    </div>
    <div>
        <Label>Фамилия</Label>
        <input type="text" v-model="lastName"/>
    </div>
    <div>
        <label>Отчество</label>
        <input type="text" v-model="middleName" />
    </div>
    <div>
        <label>Дата рождения</label>
        <input type="date" v-model="birthDate" />
    </div>
    <div>
        <label>Зарплата</label>
        <input type="number" v-model="salary" />
    </div>
    <div>
        <label>Номер телефона</label>
        <input type="text" v-model="phoneNumber" />
    </div>
    <div>
        <button>Зарегистрировать</button>
    </div>
</template>