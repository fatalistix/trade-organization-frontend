<script setup lang="ts">
import { ref } from 'vue'
import { required, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { tradingPointService } from '../services/trading_point'
import { tradingPointTypeFromString } from '../models/trading_point'
import { Money } from '../models/core'

let type = ref("")
let areaPlot = ref(0)
let rentalCharge = ref(0)
let counterCount = ref(0)
let address = ref("")

const validTypes = ["department_store", "store", "tray", "kiosk"]

const rules = {
    type: { 
        required, 
        custom: (value: string) => validTypes.includes(value)
    },
    areaPlot: {
        required,
        numeric,
        custom: (value: number) => value >= 0
    },
    rentalCharge: {
        required,
        numeric,
        custom: (value: number) => (value >= 0) && (Math.trunc(value * 100) == value * 100),
    },
    counterCount: {
        required,
        numeric,
        custom: (value: number) => value >= 0
    },
    address: {
        required
    }
}

const v = useVuelidate(rules, { type, areaPlot, rentalCharge, counterCount, address })

function register () {
    tradingPointService.register(
        tradingPointTypeFromString(type.value),
        areaPlot.value,
        new Money(Math.trunc(rentalCharge.value), rentalCharge.value - Math.trunc(rentalCharge.value)),
        counterCount.value,
        address.value
    ).then(() => {
        alert("Торговая точка успешно зарегистрирована")
        type.value = ""
        areaPlot.value = 0
        rentalCharge.value = 0
        counterCount.value = 0
        address.value = ""
    })
}

</script>

<template>
    <h1>Зарегистрировать новую торговую точку</h1>
    <div>
        <label>Тип торговой точки</label>
        <select name="type" v-model="type" :class="{ 'is-invalid': v.type.$invalid }">
            <option value="department_store">Универмаг</option>
            <option value="store">Магазин</option>
            <option value="tray">Лоток</option>
            <option value="kiosk">Киоск</option>
        </select>
        <div class="invalid-feedback" v-if="v.type.$invalid">
            Выберите тип торговой точки.
        </div>
    </div>
    <div>
        <label>Площадь торговой точки</label>
        <input type="number" v-model="areaPlot" :class="{ 'is-invalid': v.areaPlot.$invalid }"/>
        <div class="invalid-feedback" v-if="v.areaPlot.$invalid">
            Площадь должна быть положительной.
        </div>
    </div>
    <div>
        <label>Текущая арендная плата за месяц (в рублях и копейках)</label>
        <input type="number" v-model="rentalCharge" :class="{ 'is-invalid': v.rentalCharge.$invalid }"/>
        <div class="invalid-feedback" v-if="v.rentalCharge.$invalid">
            Арендная плата должна быть положительной. Копейка должна быть целым числом.
        </div>
    </div>
    <div>
        <label>Количество прилавков</label>
        <input type="number" v-model="counterCount" :class="{ 'is-invalid': v.counterCount.$invalid }"/>
        <div class="invalid-feedback" v-if="v.counterCount.$invalid">
            Количество прилавков должно быть положительным.
        </div>
    </div>
    <div>
        <label>Адрес торговой точки</label>
        <input type="text" v-model="address" :class="{ 'is-invalid': v.address.$invalid }"/>
        <div class="invalid-feedback" v-if="v.address.$invalid">
            Адрес должен быть заполнен.
        </div>
    </div>
    <div>
        <button @click="register" :disabled="v.$invalid">Зарегистрировать</button>
    </div>
</template>

<style scoped>
</style>