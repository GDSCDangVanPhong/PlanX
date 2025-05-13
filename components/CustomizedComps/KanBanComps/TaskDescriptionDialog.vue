<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { ResizableHandle, ResizablePanelGroup } from '~/components/ui/resizable'
import { SplitterPanel } from 'reka-ui'
import { Textarea } from '~/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '~/components/ui/card'
import CommentsComponent from '~/components/CustomizedComps/CommentsComponent.vue'
import LeftHandlePanel from '~/components/CustomizedComps/KanBanComps/LeftHandlePanel.vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '~/components/ui/dialog'
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Separator } from '~/components/ui/separator'

import { Loader2 } from 'lucide-vue-next'
import { Badge } from '~/components/ui/badge'
import {useToast} from "~/components/ui/toast";

const props = defineProps<{
  taskId: string
  visible: boolean
}>()

const emit = defineEmits(['close', 'task-updated', 'task-deleted'])

const comment = ref('')
const task = ref<any>(null)
const comments = ref<any[]>([])
const isLoading = ref(true)
const isSendingComment = ref(false)
const { toast } = useToast()

const fetchTask = async () => {
  if (!props.taskId) return

  try {
    isLoading.value = true
    const res = await $fetch(`http://localhost:4000/task/${props.taskId}`)
    // Store the full task data object
    task.value = res.data
    console.log('Fetched task data:', task.value) // Debug log

    // Process comments
    comments.value = (res.data.listOfComments || []).map((c: Record<string, string>) => {
      const [username, content] = Object.entries(c)[0]
      return {
        avatar: '',
        username,
        content
      }
    })
  } catch (err) {
    console.error('Lỗi khi fetch task:', err)
    toast({
      title: 'Error',
      description: 'Could not load task details',
      variant: 'destructive'
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (props.visible && props.taskId) {
    fetchTask()
  }
})

watch(() => props.taskId, fetchTask)
watch(() => props.visible, (newValue) => {
  if (newValue && props.taskId) {
    fetchTask()
  }
})

// Debug watcher to track task value
watch(() => task.value, (newValue) => {
  console.log('Task value updated:', newValue)
})

const addComment = async () => {
  if (!comment.value.trim()) return

  try {
    isSendingComment.value = true
    const payload = {
      taskID: props.taskId,
      userName: 'TênNgườiDùng', // Replace with actual user name
      comment: comment.value
    }

    const res = await $fetch('http://localhost:4000/addComment', {
      method: 'POST',
      body: payload
    })

    comments.value.push({
      avatar: '',
      username: payload.userName,
      content: payload.comment
    })

    comment.value = ''
    toast({
      title: 'Success',
      description: 'Comment added successfully'
    })
  } catch (err) {
    console.error('Lỗi khi gửi comment:', err)
    toast({
      title: 'Error',
      description: 'Could not add comment',
      variant: 'destructive'
    })
  } finally {
    isSendingComment.value = false
  }
}

const updateTaskLevel = async (level: string) => {
  try {
    await $fetch(`http://localhost:4000/updateTask/${props.taskId}`, {
      method: 'PUT',
      body: {
        level
      }
    })

    task.value.level = level
    emit('task-updated', task.value)
    toast({
      title: 'Success',
      description: 'Task level updated successfully'
    })
  } catch (err) {
    console.error('Lỗi khi cập nhật level:', err)
    toast({
      title: 'Error',
      description: 'Could not update task level',
      variant: 'destructive'
    })
  }
}

const deleteTask = async () => {
  try {
    await $fetch(`http://localhost:4000/deleteTask/${props.taskId}`, {
      method: 'DELETE'
    })

    emit('task-deleted', props.taskId)
    emit('close')
    toast({
      title: 'Success',
      description: 'Task deleted successfully'
    })
  } catch (err) {
    console.error('Lỗi khi xóa task:', err)
    toast({
      title: 'Error',
      description: 'Could not delete task',
      variant: 'destructive'
    })
  }
}

const editTask = () => {
  // You can implement this based on your requirements
  // For example, you might want to open another dialog or navigate to an edit page
  toast({
    title: 'Edit Task',
    description: 'Edit task functionality to be implemented'
  })
}

// Get level badge color
const getLevelColor = (level: string) => {
  switch (level) {
    case 'High': return 'bg-red-500'
    case 'Medium': return 'bg-yellow-500'
    case 'Low': return 'bg-green-500'
    default: return 'bg-slate-500'
  }
}
</script>

<template>
  <Dialog :open="visible" @update:open="v => !v && emit('close')">
    <DialogContent class="!w-11/12 !max-h-3/4 !max-w-none !px-6">
      <DialogHeader>
        <DialogTitle v-if="!isLoading" class="flex items-center gap-2">
          {{ task?.title || 'Task Details' }}
          <Badge v-if="task?.level" :class="['ml-2', getLevelColor(task.level)]">
            {{ task.level }}
          </Badge>
        </DialogTitle>
      </DialogHeader>

      <ResizablePanelGroup
          id="vertical-demo-group-1"
          direction="horizontal"
          class="min-h-[200px] max-w-full rounded-lg border mt-4"
      >
        <SplitterPanel :min-size="35" :default-size="50" class="w-full">
          <div v-if="isLoading" class="flex justify-center items-center h-full">
            <Loader2 class="h-8 w-8 animate-spin text-slate-500" />
          </div>

          <div v-else class="p-4">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="break-words text-slate-700">{{ task?.description || 'No description provided' }}</p>
              </CardContent>
            </Card>

            <Card class="mt-6">
              <CardHeader class="pb-2">
                <CardTitle class="text-base">Comments</CardTitle>
                <CardDescription>Add your thoughts or feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="flex space-x-3">
                  <Avatar class="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Textarea
                      v-model="comment"
                      placeholder="Add a comment..."
                      class="min-h-24"
                  />
                </div>
              </CardContent>
              <CardFooter class="flex justify-end">
                <Button @click="addComment" :disabled="isSendingComment">
                  <Loader2 v-if="isSendingComment" class="mr-2 h-4 w-4 animate-spin" />
                  {{ isSendingComment ? 'Posting...' : 'Post Comment' }}
                </Button>
              </CardFooter>
            </Card>

            <ScrollArea class="h-14 mt-4">
              <div v-if="comments.length === 0" class="px-4 text-slate-500 text-center py-8">
                No comments yet
              </div>
              <div v-else v-for="item in comments" :key="item.username + item.content" class="px-4 mt-2.5">
                <CommentsComponent :avatar="item.avatar" :content="item.content" :username="item.username" />
                <Separator class="mt-1" />
              </div>
            </ScrollArea>
          </div>
        </SplitterPanel>

        <ResizableHandle with-handle />
        <SplitterPanel id="vertical-demo-panel-2" :default-size="50">
          <div class="p-4">
            <div v-if="isLoading" class="flex justify-center items-center h-full">
              <Loader2 class="h-8 w-8 animate-spin text-slate-500" />
            </div>
            <LeftHandlePanel
                v-else
                :taskData="task"
                @update:level="updateTaskLevel"
                @delete-task="deleteTask"
                @edit-task="editTask"
            />
          </div>
        </SplitterPanel>
      </ResizablePanelGroup>
    </DialogContent>
  </Dialog>
</template>