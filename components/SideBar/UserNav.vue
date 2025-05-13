

<script setup lang="ts">

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-vue-next'
import {useSidebar} from "~/components/ui/sidebar";
const router = useRouter()
const props = defineProps<{
  user: {
    name: string
    email: string
    avatar: string
  }
}>()
const tab = useTabState()
const { isMobile } = useSidebar()
const isOpenDialog = ref(false)
const handleLogout = ()=>{
  localStorage.clear()
  router.push('/login')
}
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
              size="lg"
              class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-lg">
                CN
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            :side="isMobile ? 'bottom' : 'right'"
            align="end"
            :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback class="rounded-lg">
                  CN
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>

          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup >
            <DropdownMenuItem class="cursor-pointer"  @click="tab.changingState('Account')">
              <BadgeCheck />
              Account
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer" @click="isOpenDialog=true" >
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
  <Dialog v-model:open="isOpenDialog">

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure to logout</DialogTitle>
      </DialogHeader>
      <DialogFooter class="flex">
        <Button @click="handleLogout">Confirm</Button>
        <Button :variant="'destructive'" @click="isOpenDialog=false">Cancel</Button>
      </DialogFooter>
    </DialogContent>

  </Dialog>
</template>
