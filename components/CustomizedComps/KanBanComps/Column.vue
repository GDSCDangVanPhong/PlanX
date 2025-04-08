<script setup lang="ts">
import TaskDescriptionDialog from "~/components/CustomizedComps/KanBanComps/TaskDescriptionDialog.vue";
import { ref } from 'vue'
import { Calendar, SquarePlus, MessageSquare } from 'lucide-vue-next';
import AvatarGroup from "~/components/CustomizedComps/AvatarGroup.vue";
import draggable from 'vuedraggable';
import TaskCard from "~/components/CustomizedComps/KanBanComps/TaskCard.vue";
import CreateTaskDialog from "~/components/CustomizedComps/KanBanComps/CreateTaskDialog.vue";

interface Task {
  title: string;
  date: string;
  comments: number;
  tag: string;
  src?: string[];
}

const props = defineProps<{
  dataArray: Task[],
  title: string
}>()

const dynamicArray = ref(props.dataArray)

// Hàm xử lý thêm task mới
const addTask = (newTask: Task) => {
  dynamicArray.value.unshift(newTask) // Thêm task mới vào đầu mảng
}
</script>

<template>
  <div class="rounded-xl bg-muted/100 h-full px-2 pt-2">
    <div class="pl-4 mb-2 flex gap-x-2">
      <h2 class="text-gray-600">{{props.title}}</h2>
      <Badge v-if="dynamicArray.length!=0" class="h-1/5 mt-0.5">{{dynamicArray.length}}</Badge>
    </div>

    <div class="px-3.5">
      <CreateTaskDialog class="w-full" @add-task="addTask">
        <Button :variant="'outline'" class="mb-2 w-full">
          <SquarePlus class="w-4 h-4 mt-0.5" />
          New Task
        </Button>
      </CreateTaskDialog>
    </div>

    <ScrollArea class="h-96 mt-1 items-center">
      <TaskDescriptionDialog>
        <draggable v-model="dynamicArray" group="tasks" tag="div" class="px-3.5">
          <template #item="{ element }">
            <TaskCard
                :level="element.tag"
                :title="element.title"
                :date="element.date"
                :comments="element.comments"
                :avatarList="element.src"
            />
          </template>
        </draggable>
      </TaskDescriptionDialog>
    </ScrollArea>
  </div>
</template>