<script setup lang="ts">
import { useSidebar } from "~/components/ui/sidebar"
import { ChevronsUpDown, Plus } from 'lucide-vue-next'
import {useProjectId} from "~/stores/useProjectId";

const props = defineProps<{
  teams?: {
    name: string
    id : string
  }[]
}>()

const isDiaLogOpen = ref(false)
const { isMobile } = useSidebar()


const activeTeam = ref(props.teams?.[0] || { name: 'No Team' })

const project_name = ref('')
const activeID = useProjectId()

watch(() => props.teams, (newTeams) => {
  if (Array.isArray(newTeams) && newTeams.length > 0) {
    activeTeam.value = newTeams[0]
  }
  activeID.setProjectId(newTeams[0].id)
  console.log(activeID.projectId)
}, { immediate: true })

const handleSelectTeam = (team) => {
  activeTeam.value = team
  activeID.setProjectId(team.id) // ✅ truyền projectID vào store
}
const isDialogOpen =ref(false)
const handleCreateProject = async () => {
  const token = localStorage.getItem('accessToken')
  const res = await $fetch('http://localhost:4000/createProject', {
    method: 'POST',
    headers: {
      'Authorization': token
    },
    body: {
      projectName: project_name.value
    }
  })
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


            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {{ activeTeam.name }}
              </span>

            </div>
            <ChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            :side="isMobile ? 'bottom' : 'right'"
            :side-offset="4"
        >
          <DropdownMenuLabel class="text-xs text-muted-foreground">
            Teams
          </DropdownMenuLabel>
          <DropdownMenuItem
              v-for="(team, index) in teams"
              :key="team.name"
              class="gap-2 p-2 cursor-pointer"
              @click="handleSelectTeam(team)"

          >

            {{ team.name }}

          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-2 p-2">
            <div class="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus class="size-4" />
            </div>
            <div class="font-medium text-muted-foreground cursor-pointer" @click="isDialogOpen= true">
              Add team
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
  <Dialog v-model:open="isDialogOpen" >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add new team</DialogTitle>
        <DialogDescription>Create new Project</DialogDescription>
      </DialogHeader>
      <Label>Project Name</Label>
      <Input v-model="project_name" />
      <Button @click="handleCreateProject">Create</Button>
    </DialogContent>
  </Dialog>
</template>
