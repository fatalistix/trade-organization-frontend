<script setup lang="ts">
import { ref } from 'vue'
import { required, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { TradingPointType } from '../../models/trading_point'
import { Money } from '../../models/core'
import { useTradingPointStore } from '../../stores/TradingPointStore'
import { useNotification } from '@kyvg/vue3-notification'
import { isError } from 'ts-try'

const notification = useNotification()

const type = ref("")
const areaPlot = ref(0)
const rentalChargeRubles = ref(0)
const rentalChargePennies = ref(0)
const counterCount = ref(0)
const address = ref("")

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
    rentalChargeRubles: {
        required,
        numeric,
        custom: (value: number) => (value >= 0) && (Math.trunc(value) == value),
    },
    rentalChargePennies: {
        required,
        numeric,
        custom: (value: number) => (value >= 0) && (value <= 99) && (Math.trunc(value) == value),
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

const v = useVuelidate(
    rules,
    { type, areaPlot, rentalChargeRubles, rentalChargePennies, counterCount, address },
)

const tradingPointStore = useTradingPointStore()

function register() {
    const rentalCharge = Money.from(rentalChargeRubles.value, rentalChargePennies.value)
    if (isError(rentalCharge)) {
        notification.notify({
            text: "Неверная сумма аренды",
            type: "warn"
        })
        return
    }

    tradingPointStore.create(
        TradingPointType.fromString(type.value) as TradingPointType,
        areaPlot.value,
        rentalCharge,
        counterCount.value,
        address.value
    ).then(
        _ => {
            type.value = ""
            areaPlot.value = 0
            rentalChargeRubles.value = 0
            rentalChargePennies.value = 0
            counterCount.value = 0
            address.value = ""

            notification.notify({
                text: "Торговая точка зарегистрирована",
                type: "success",
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось зарегистрировать торговую точку",
                type: "error"

            })
        }
    )
}

</script>

<template>
    <h2 class="title is-2 has-text-centered">Зарегистрировать новую торговую точку</h2>
    <div class="box">
        <div class="field">
            <label class="label">Тип торговой точки</label>
            <div class="select is-fullwidth">
                <select name="type" v-model="type" :class="{ 'is-invalid': v.type.$invalid }">
                    <option value="department_store">Универмаг</option>
                    <option value="store">Магазин</option>
                    <option value="tray">Лоток</option>
                    <option value="kiosk">Киоск</option>
                </select>
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.type.$invalid">
                <div class="message-body">
                    Выберите тип торговой точки.
                </div>
            </article>
        </div>
        <div class="field">
            <label class="label">Площадь торговой точки</label>
            <div class="control">
                <input class="input" type="number" v-model="areaPlot" :class="{ 'is-invalid': v.areaPlot.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.areaPlot.$invalid">
                <div class="message-body">
                    Площадь должна быть положительной.
                </div>
            </article>
        </div>
        <div class="field">
            <label class="label">Текущая арендная плата за месяц (в рублях)</label>
            <div class="control">
                <input class="input" type="number" v-model="rentalChargeRubles"
                    :class="{ 'is-invalid': v.rentalChargeRubles.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.rentalChargeRubles.$invalid">
                <div class="message-body">
                    Арендная плата должна быть положительной.
                </div>
            </article>
        </div>
        <div class="field">
            <label class="label">Текущая арендная плата за месяц (в копейках)</label>
            <div class="control">
                <input class="input" type="number" v-model="rentalChargePennies"
                    :class="{ 'is-invalid': v.rentalChargePennies.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.rentalChargePennies.$invalid">
                <div class="message-body">
                    Арендная плата должна быть положительной. Копейка должна быть от 0 до 99.
                </div>
            </article>
        </div>
        <div class="field">
            <label class="label">Количество прилавков</label>
            <div class="control">
                <input class="input" type="number" v-model="counterCount"
                    :class="{ 'is-invalid': v.counterCount.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.counterCount.$invalid">
                <div class="message-body">
                    Количество прилавков должно быть положительным.
                </div>
            </article>
        </div>
        <div class="field">
            <label class="label">Адрес торговой точки</label>
            <div class="control">
                <input class="input" type="text" v-model="address" :class="{ 'is-invalid': v.address.$invalid }" />
            </div>
            <article class="invalid-feedback message is-danger" v-if="v.address.$invalid">
                <div class="message-body">
                    Адрес должен быть заполнен.
                </div>
            </article>
        </div>
        <div class="field has-text-centered">
            <button class="button is-primary " @click="register" :disabled="v.$invalid">Зарегистрировать</button>
        </div>
    </div>
</template>

<style scoped></style>