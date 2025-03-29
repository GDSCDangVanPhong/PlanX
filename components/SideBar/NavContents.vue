<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings } from "lucide-vue-next"

const tabState = useTabState()
const items = [
  {
    title: "Home",
    url: "/login",
    icon: Home,
  },
  {
    title: "Project",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

</script>

<template>
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in items" :key="item.title">
            <SidebarMenuButton asChild :tooltip="item.title" @click="tabState.changingState(item.title)" >
              <div class="cursor-pointer" @click="tabState.changingState(item.title)">
                <component :is="item.icon" />
                <span>{{item.title}}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
</template>
