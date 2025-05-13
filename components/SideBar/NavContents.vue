<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings,ChevronRight } from "lucide-vue-next"

const tabState = useTabState()
const items = [
  {
    title: "Home",
    url: "/login",
    icon: Home,
  },

  {
    title: "Admin",
    url: "#",
    icon: Calendar,
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
          <Collapsible>
            <CollapsibleTrigger class="w-full group">
              <SidebarMenuButton :tooltip="'Project'">
                <component :is="Inbox" />
                <span>Project</span>
                <ChevronRight
                    class="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90"
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubButton as-child>
                  <span class="cursor-pointer" @click="tabState.changingState('Project')">Progress Board</span>
                </SidebarMenuSubButton>
                <SidebarMenuSubButton as-child>
                  <span class="cursor-pointer" @click="tabState.changingState('Manage')">Manage Project</span>
                </SidebarMenuSubButton>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
</template>
