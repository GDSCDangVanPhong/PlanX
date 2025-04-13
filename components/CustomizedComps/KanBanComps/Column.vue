<script setup lang="ts">
import { ref } from 'vue'
import { SquarePlus } from 'lucide-vue-next'
import draggable from 'vuedraggable'


import TaskDescriptionDialog from "~/components/CustomizedComps/KanBanComps/TaskDescriptionDialog.vue"
import AvatarGroup from "~/components/CustomizedComps/AvatarGroup.vue"
import TaskCard from "~/components/CustomizedComps/KanBanComps/TaskCard.vue"
import CreateTaskDialog from "~/components/CustomizedComps/KanBanComps/CreateTaskDialog.vue"

interface Task {
  title: string
  date: string
  tag: string
  src?: string[]
  taskId: string
  comments?: string[]
}

const props = defineProps<{
  dataArray: Task[]
  title: string
  columnId: string
}>()

const dynamicArray = ref(props.dataArray)
const dialogVisible = ref(false)
const selectedTaskId = ref<string | null>(null)

const addTask = (newTask: Task) => {
  dynamicArray.value.unshift(newTask)
}

const openDialog = (taskId: string) => {
  selectedTaskId.value = taskId
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
  selectedTaskId.value = null
}
</script>


<template>
  <div class="rounded-xl bg-muted/100 h-full px-2 pt-2">
    <div class="pl-4 mb-2 flex gap-x-2">
      <h2 class="text-gray-600">{{ props.title }}</h2>
      <Badge v-if="dynamicArray.length != 0" class="h-1/5 mt-0.5">{{ dynamicArray.length }}</Badge>
    </div>

    <div class="px-3.5">
      <CreateTaskDialog :column-id="props.columnId" class="w-full" @add-task="addTask">
        <Button variant="outline" class="mb-2 w-full">
          <SquarePlus class="w-4 h-4 mt-0.5" />
          New Task
        </Button>
      </CreateTaskDialog>
    </div>

    <ScrollArea class="h-96 mt-1 items-center">
      <draggable v-model="dynamicArray" group="tasks" tag="div" item-key="taskId" class="px-3.5">
        <template #item="{ element }">
          <div @click="openDialog(element.taskId)" class="cursor-pointer">
            <TaskCard
                :taskId="element.taskId"
                :level="element.tag"
                :title="element.title"
                :date="element.date"
                :comments="element.comments"
                :avatarList="element.src"
            />
          </div>
        </template>
      </draggable>
    </ScrollArea>


    <TaskDescriptionDialog
        v-if="selectedTaskId"
        :taskId="selectedTaskId"
        :visible="dialogVisible"
        @close="closeDialog"
    />
  </div>
</template>
