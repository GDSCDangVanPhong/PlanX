<script setup lang="ts">

import PlanXSideBar from "~/components/SideBar/PlanXSideBar.vue";
import Home from "~/components/MainContents/Home.vue";
import KanBanBoard from "~/components/MainContents/KanBanBoard.vue";
import DashBoardForAdmin from "~/components/MainContents/DashBoardForAdmin.vue";
import AccountSetting from "~/components/MainContents/AccountSetting.vue";
import ManageProject from "~/components/CustomizedComps/ManageProject.vue";
const tabState = useTabState()
const hello ="Hello World";


const user = ref({ name: '', email: '', avatar: '' })
const teams = ref([
  {
    name : '',
    id : ''
  }
])

const loadInformation = async () => {
  const token = localStorage.getItem("accessToken");
  const data = await $fetch("http://localhost:4000/user", {
    method: "GET",
    headers: {
      Authorization: token
    }
  })

  user.value = {
    name: data.data.userName,
    email: data.data.email,
    avatar: data.data.avatarUrl,
  }

  teams.value = data.data.roleInProjects.map((role: any) => ({
    name: role.projectName,
    id : role.projectID
  }))
}
console.log(user.value)
console.log(user.value)

onMounted(() => {
  loadInformation()
})



</script>

<template>
  <SidebarProvider>
    <PlanXSideBar :user="user" :teams="teams"/>
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
        </div>
      </header>
      <Home v-if="tabState.tab === 'Home' " />
      <KanBanBoard :title='hello' v-if="tabState.tab === 'Project' " class="flex-1" />
      <DashBoardForAdmin v-if="tabState.tab==='Admin'" />
      <AccountSetting v-if="tabState.tab==='Account'"/>
      <ManageProject v-if ="tabState.tab==='Manage'" />
    </SidebarInset>
  </SidebarProvider>
</template>

