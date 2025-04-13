<script setup lang="ts">

import PlanXSideBar from "~/components/SideBar/PlanXSideBar.vue";
import Home from "~/components/MainContents/Home.vue";
import KanBanBoard from "~/components/MainContents/KanBanBoard.vue";
import DashBoardForAdmin from "~/components/MainContents/DashBoardForAdmin.vue";
const tabState = useTabState()
const hello ="Hello World";
</script>

<template>
  <SidebarProvider>
    <PlanXSideBar/>
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
        </div>
      </header>
      <Home v-if="tabState.tab === 'Home' " />
      <KanBanBoard :title='hello' v-if="tabState.tab === 'Project' " class="flex-1" />
      <DashBoardForAdmin v-if="tabState.tab==='Admin'" />
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>

</style>