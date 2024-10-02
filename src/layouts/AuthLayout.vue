<!-- src/layouts/AuthLayout.vue -->
<template>
  <div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthLayout'
})
</script>

<style scoped>
/* Add your styles here */
</style>
