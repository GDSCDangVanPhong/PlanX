<script setup lang="ts">

import PlanXSideBar from "~/components/SideBar/PlanXSideBar.vue";
</script>

<template>
  <SidebarProvider>
    <PlanXSideBar/>
    <main>
      <SidebarTrigger />
      <slot />
    </main>
  </SidebarProvider>
</template>

<style scoped>

</style>