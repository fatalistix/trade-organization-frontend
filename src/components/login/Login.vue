<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

function managerLogin() {
    router.push("/manager")
}

const tradingPointId = ref(0)
const tradingPointType = ref("")

const sellerLogin = () => {
    router.push("/trading-point/" + tradingPointId.value + "/" + tradingPointType.value + "/sellers")
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
                    <label class="label">Если вы не менеджер, то введите идентификатор торговой точки</label>
                    <div class="control">
                        <input class="input is-rounded is-large" type="text" placeholder="id" v-model="tradingPointId"/>
                    </div>
                    <div class="select is-rounded is-large is-fullwidth">
                        <select v-model="tradingPointType">
                            <option value="department_store">Универмаг</option>
                            <option value="store">Магазин</option>
                            <option value="tray">Лоток</option>
                            <option value="kiosk">Киоск</option>
                        </select>
                    </div>
                    <button @click="sellerLogin" class="button is-primary is-rounded is-fullwidth">Вход</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>