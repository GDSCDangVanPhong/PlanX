<script setup lang="ts">

import TeamSwitcher from "~/components/SideBar/TeamSwitcher.vue";

import UserNav from "~/components/SideBar/UserNav.vue";
import NavContents from "~/components/SideBar/NavContents.vue";


const props = defineProps<{
  user: {
    name: string
    email: string
    avatar: string
  }
  teams: {
    name: string,
    id: string
  }[]
}>()


</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <TeamSwitcher :teams="props.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavContents/>
    </SidebarContent>
    <SidebarFooter>
      <UserNav :user="props.user" />
    </SidebarFooter>
  </Sidebar>
</template>

