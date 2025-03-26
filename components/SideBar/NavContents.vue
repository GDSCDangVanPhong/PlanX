<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings } from "lucide-vue-next"
const items = [
  {
    title: "Home",
    url: "/login",
    icon: Home,
  },
  {
    title: "Inbox",
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
            <SidebarMenuButton asChild>
              <a :href="item.url">
                <component :is="item.icon" />
                <span>{{item.title}}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
</template>
