<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTradingPointStore } from '../../stores/TradingPointStore';
import { useNotification } from '@kyvg/vue3-notification';
import TradingPointList from '../trading_point/TradingPointList.vue';

const router = useRouter()
const notification = useNotification()

const tradingPointStore = useTradingPointStore()

tradingPointStore.updateTradingPoints().then(
    _ => { },
    _ => {
        notification.notify({
            text: "Не удалось получить список торговых точек",
            type: "warn"
        })
    }
)


function managerLogin() {
    router.push("/manager")
}

</script>

<template>
    <h2 class="title is-2 has-text-centered">
        Вход в аккаунт
    </h2>
    <div class="columns is-centered">
        <div class="column is-6">
            <div class="box">
                <div class="field">
                    <label class="label">Если вы менеджер, нажмите ниже</label>
                    <button @click="managerLogin" class="button is-primary is-rounded is-fullwidth">
                        Зайти как менеджер
                    </button>
                </div>
            </div>
            <div class="box">
                <div class="field">
                    <label class="label">Если вы продавец, выберите вашу торговую точку</label>
                    <TradingPointList base-url="/trading-point" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>