<script setup lang="ts">
import { useApplicationStore } from '../../stores/ApplicationStore';

const applicationStore = useApplicationStore()

</script>

<template>
    <article class="media" v-for="application in applicationStore.applications">
        <div class="media-content">
            <slot :id="application.id"></slot>
        </div>
    </article>
    <article class="media" v-if="applicationStore.applications.length === 0">
        <div class="media-content has-text-centered">
            Заявок пока нет
        </div>
    </article>
</template>

<style scoped></style>