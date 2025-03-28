<script setup lang="ts">
import { Check } from 'lucide-vue-next';
const Undone =5
const Done =10
import { SquareCheck } from 'lucide-vue-next';
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
  <div class="flex flex-1 flex-col gap-4 px-5 ">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <BarChartCard/>
      <ProjectQuickView/>
      <CalendarCard/>
    </div>
    <div class="min-h-[100vh] flex-1 rounded-xl  md:min-h-min" >
        <TasksTable/>
    </div>
  </div>






</template>
