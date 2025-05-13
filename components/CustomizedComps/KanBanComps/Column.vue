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
const onTaskDrop = (evt: any) => {
  console.log('Drag event:', evt);

  let task: Task | null = null;
  let fromColumnId: string | null = null;
  let toColumnId: string | null = null;

  if (evt.added) {
    task = evt.added.element;
    toColumnId = props.columnId; // Use props.columnId directly for the target column
    fromColumnId = evt.from?.dataset?.columnId || task.fromColumnId; // Fallback to task.fromColumnId if set
  } else if (evt.removed) {
    task = evt.removed.element;
    fromColumnId = props.columnId; // Source column
  } else if (evt.moved) {
    task = evt.moved.element;
    fromColumnId = props.columnId;
    toColumnId = props.columnId;
  }

  console.log('Extracted:', { task, fromColumnId, toColumnId });

  if (!task || !fromColumnId || !toColumnId) {
    console.error('Invalid drag event data:', { task, fromColumnId, toColumnId });
    return;
  }

  emit('update-tasks', {
    task,
    fromColumnId,
    toColumnId,
  });
};

const emit = defineEmits<{
  (e: 'update-tasks', payload: { task: Task; fromColumnId: string; toColumnId: string }): void
}>()


const dynamicArray = ref<Task[]>([])
const dialogVisible = ref(false)
const selectedTaskId = ref<string | null>(null)

const addTask = (newTask: Task) => {
  dynamicArray.value.unshift({ ...newTask, fromColumnId: props.columnId });
};

watch(
    () => props.dataArray,
    (newData) => {
      dynamicArray.value = newData.map(task => ({ ...task, fromColumnId: props.columnId }));
    },
    { immediate: true }
);
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
      <draggable
          v-model="dynamicArray"
          group="tasks"
          tag="div"
          item-key="taskId"
          class="px-3.5"
          
          @change="onTaskDrop"
      >
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
