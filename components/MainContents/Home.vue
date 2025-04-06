<script setup lang="ts">
import { Check } from 'lucide-vue-next';
const Undone =5
const Done =10

import BarChartCard from "~/components/CustomizedComps/BarChartCard.vue";
import ProjectQuickView from "~/components/CustomizedComps/ProjectQuickView.vue";
import CalendarCard from "~/components/CustomizedComps/CalendarCard.vue";
import TasksTable from "~/components/CustomizedComps/TasksTable.vue";

const data = [
  { name: 'Done Tasks', total: Done },
  { name: 'Undone Tasks', total: Undone},

]
const DoneIcon = Check
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 px-5 pb-4">
    <div class="grid auto-rows-min gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <BarChartCard/>
      <ProjectQuickView/>
      <CalendarCard/>
    </div>
    <div class="min-h-[100vh] flex-col flex-1 rounded-xl  md:min-h-min" >
        <TasksTable />
    </div>
  </div>
</template>
