<script setup lang="ts">
import { ref } from 'vue';
import { useSellerStore } from '../../stores/SellerStore';
import { useDepartmentStoreStore } from '../../stores/DepartmentStoreStore';
import { useNotification } from '@kyvg/vue3-notification';
import { PlaceOfWorkType } from '../../models/place_of_work';
import { TradingPointType } from '../../models/trading_point';
import { UserOutlined } from '@ant-design/icons-vue';
import { Seller } from '../../models/seller';


const props = defineProps<{
    id: number
}>()

const sellerStore = useSellerStore()
const departmentStoreStore = useDepartmentStoreStore()
const notification = useNotification()

const possibleSeller = sellerStore.sellers.find(seller => seller.id === props.id)
if (!possibleSeller) {
    notification.notify({
        text: "Продавец не найден",
        type: "warn"
    })
}

const seller = possibleSeller as Seller

const newPlaceOfWorkId = ref<number | null>(null)

if (seller.worksAt) {
    newPlaceOfWorkId.value = seller.worksAt.placeOfWork.id
}

const updatePlaceOfWork = () => {
    let newWorksAt = null

    const hall = departmentStoreStore.departmentStore?.halls.find(hall => hall.id === newPlaceOfWorkId.value)
    if (hall) {
        newWorksAt = {
            worksAt: {
                placeOfWork: {
                    id: hall.id,
                    type: PlaceOfWorkType.HALL,
                },
                tradingPoint: {
                    id: hall.tradingPointId,
                    type: TradingPointType.DEPARTMENT_STORE,
                }
            }
        }
    } else {
        newWorksAt = {
            worksAt: null
        }
    }

    console.log(newWorksAt)

    sellerStore.patch(
        props.id, null, null, null, null, null, null, newWorksAt,
    ).then(
        _ => {
            notification.notify({
                text: "Продавец успешно обновлен",
                type: "success"
            })
        },
        _ => {
            notification.notify({
                text: "Не удалось обновить продавца",
                type: "warn"
            })
        }
    )
}

</script>

<template>
    <div class="columns">
        <div class="column">
            <div class="level">
                <span class="icon is-left">
                    <UserOutlined />
                </span>
                <!-- <button class="button" @click="sellerStore.seller = seller"> -->
                {{ seller?.firstName + " " + seller?.lastName + " " + seller?.middleName }}
                <!-- </button> -->
            </div>
        </div>
        <div class="column">
            <div class="select is-fullwidth">
                <select v-model="newPlaceOfWorkId">
                    <option v-for="hall in departmentStoreStore.departmentStore?.halls" :value="hall.id">
                        {{ hall.id }}
                    </option>
                    <option :value="null">
                        Не назначено
                    </option>
                </select>
            </div>
        </div>
        <div class="column">
            <button class="button is-info has-text-centered" @click="updatePlaceOfWork">Обновить</button>
        </div>

    </div>
</template>

<style scoped></style>