<script setup lang="ts">
import { ref } from 'vue'
import { UserType, useUserStore } from '../stores/UserStore';

const isActive = ref(false)

const toggleIsActive = () => {
    isActive.value = !isActive.value
}

interface Link {
    role: UserType,
    route: string,
    text: string,
}

const links: Link[] = [
    {
        role: UserType.MANAGER,
        route: "/manager/trading-point",
        text: "Торговые точки",
    },
]

const userStore = useUserStore()

</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <img class="navbar-item" src="/main-logo.png" width="100" height="100" />
            <a id="navbar-burger" role="button" @click="toggleIsActive"
                :class="{ 'navbar-burger': true, 'is-active': isActive }" aria-label="menu" aria-expanded="false"
                data-target="navbarMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div :class="{ 'navbar-menu': true, 'is-active': isActive }" id="navbarMenu">
            <div class="navbar-start" v-for="link in links">
                <RouterLink v-if="link.role === userStore.type" :to="link.route" class="navbar-item">{{ link.text }}</RouterLink> <RouterLink to="/" class="navbar-item"></RouterLink>
            </div>
            <div class="navbar-end">

            </div>
        </div>
    </nav>
</template>

<style scoped lang="scss"></style>