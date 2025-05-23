<script setup lang="ts">
import { ref } from 'vue'
import LevelSelector from "~/components/CustomizedComps/Selector/LevelSelector.vue"
import DeadlinePicker from "~/components/CustomizedComps/Selector/DeadlinePicker.vue"
import {useToast} from "~/components/ui/toast";

const emit = defineEmits(['add-task'])
import {CalendarDate, getLocalTimeZone,type DateValue } from '@internationalized/date'

const props = defineProps<{
  columnId: string
}>()
const { toast } = useToast()
const title = ref('')
const description = ref('')
const level = ref('')
const deadline = ref<CalendarDate | null>(null)

const handleSubmit = async () => {
  try {
    if(title.value === ''  ) {
      toast({
        title: 'Failed to create task',
        description: 'Title is required',
        variant: 'destructive',
      });
    }
    if(deadline.value === null  ) {
      toast({
        title: 'Failed to create task',
        description: 'Deadline is required',
        variant: 'destructive',
      });
    }

    else{
      const payload = {
        title: title.value,
        description: description.value,
        level: level.value,
        deadline: deadline.value
            ? deadline.value.toDate(getLocalTimeZone()).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
      }
      console.log(payload)
      const response = await $fetch(`http://localhost:4000/${props.columnId}`, {
        method: 'POST',
        body: payload
      })

      const newTask = {
        title: response.data.title,
        date: response.data.deadline,
        tag: response.data.level,
        src: response.data.avatarList ?? [],
        taskId :response.data.taskID,
        comments: 0
      }

      emit('add-task', newTask)

      title.value = ''
      description.value = ''
      deadline.value = ''
    }

  } catch (err) {
    console.error('Failed to create task:', err)
  }
}

const updateLevel = (newLevel: string) => {
  level.value = newLevel
}

const updateDeadline = (newDeadline: DateValue) => {
  deadline.value = newDeadline
}
</script>


<template>
  <Toaster />
  <Dialog>
    <DialogTrigger class="w-full">
      <slot />
    </DialogTrigger>
    <DialogContent class="w-full">
      <DialogHeader>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogDescription>Adding new task to column</DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleSubmit">
        <FormField v-slot="{ componentField }" name="Title">
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input v-model="title" type="text" placeholder="Enter title" />
            </FormControl>
            <FormMessage/>
          </FormItem>
          <FormItem class="mt-3">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input v-model="description" type="text" placeholder="Enter description" />
            </FormControl>
            <FormMessage/>
          </FormItem>
          <div class="mt-3 flex gap-5">
            <div class="w-1/3 space-y-2">
              <FormLabel>Level</FormLabel>
              <LevelSelector v-model="level"/>
            </div>
            <div class="w-2/3 space-y-2 mt-2.5 ml-auto flex flex-col">
              <FormLabel>Deadline</FormLabel>
              <DeadlinePicker v-model="deadline" class="w-full"/>
            </div>
          </div>
        </FormField>
        <DialogFooter>
          <Button type="submit" class="w-full mt-2">Submit</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>