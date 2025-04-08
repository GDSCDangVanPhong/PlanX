<script setup lang="ts">
import { ref } from 'vue'
import LevelSelector from "~/components/CustomizedComps/Selector/LevelSelector.vue";
import DeadlinePicker from "~/components/CustomizedComps/Selector/DeadlinePicker.vue";

// Define emit để gửi dữ liệu task mới lên component cha
const emit = defineEmits(['add-task'])

// Khởi tạo các ref để lưu trữ dữ liệu form
const title = ref('')
const description = ref('')
const level = ref('Medium')
const deadline = ref('')

// Hàm xử lý submit form
const handleSubmit = () => {
  const newTask = {
    title: title.value,
    date: deadline.value || new Date().toISOString().split('T')[0],
    comments: 0,
    tag: level.value,
    src: [] // Mặc định không có avatar
  }

  // Gửi task mới lên component cha
  emit('add-task', newTask)

  // Reset form sau khi submit
  title.value = ''
  description.value = ''
  deadline.value = ''
}

// Nhận giá trị từ LevelSelector và DeadlinePicker
const updateLevel = (newLevel: string) => {
  level.value = newLevel
}

const updateDeadline = (newDeadline: string) => {
  deadline.value = newDeadline
}
</script>

<template>
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
              <LevelSelector @update:level="updateLevel"/>
            </div>
            <div class="w-2/3 space-y-2 mt-2.5 ml-auto flex flex-col">
              <FormLabel>Deadline</FormLabel>
              <DeadlinePicker @update:deadline="updateDeadline" class="w-full"/>
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