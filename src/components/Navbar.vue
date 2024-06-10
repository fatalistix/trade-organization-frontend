<script setup lang="ts">
import { ref } from 'vue'

const isActive = ref(false)

const toggleIsActive = () => {
    isActive.value = !isActive.value
}

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
            <div class="navbar-start">
            </div>
            <div class="navbar-end">

            </div>
        </div>
    </nav>
</template>

<style scoped lang="scss"></style>