<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { ResizableHandle, ResizablePanelGroup } from '~/components/ui/resizable'
import { SplitterPanel } from 'reka-ui'
import { Textarea } from '~/components/ui/textarea'
import CommentsComponent from '~/components/CustomizedComps/CommentsComponent.vue'
import LeftHandlePanel from '~/components/CustomizedComps/KanBanComps/LeftHandlePanel.vue'
import { Dialog, DialogContent } from '~/components/ui/dialog'
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Separator } from '~/components/ui/separator'

const props = defineProps<{
  taskId: string
  visible: boolean
}>()

const emit = defineEmits(['close'])

const comment = ref('')
const task = ref<any>(null)
const comments = ref<any[]>([])
const isLoading = ref(true)
const levelBadge = ref('')

const fetchTask = async () => {
  try {
    const res = await $fetch(`http://localhost:4000/task/${props.taskId}`)
    task.value = res.data
    comments.value = (res.data.listOfComments || []).map((c: Record<string, string>) => {
      const [username, content] = Object.entries(c)[0]
      return {
        avatar: '',
        username,
        content
      }
    })
    levelBadge.value = res.data.level
  } catch (err) {
    console.error('Lỗi khi fetch task:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchTask)
watch(() => props.taskId, fetchTask)

const addComment = async () => {
  if (!comment.value.trim()) return
  try {
    const payload = {
      taskID: props.taskId,
      userName: 'TênNgườiDùng',
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
  } catch (err) {
    console.error('Lỗi khi gửi comment:', err)
  }
}
</script>
<template>
  <Dialog :open="visible" @update:open="v => !v && emit('close')">
    <DialogContent class="!w-11/12 !max-w-none !px-6">
      <ResizablePanelGroup
          id="vertical-demo-group-1"
          direction="horizontal"
          class="min-h-[200px] max-w-full rounded-lg border mt-4"
      >
        <SplitterPanel :min-size="35" :default-size="50" class="w-full">
          <div class="px-4">
            <h1 class="font-bold text-lg">{{ task?.title || 'Đang tải...' }}</h1>
            <p class="font-semibold text-md mt-2">Description</p>
            <p class="break-words">{{ task?.description || 'Không có mô tả' }}</p>
            <p class="font-bold mt-14">Comments</p>
            <div class="flex space-x-3">
              <Avatar class="w-8 h-8 mt-2">
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Textarea v-model="comment" class="mt-2 mb-1" />
            </div>
            <div class="mt-2 flex justify-end">
              <Button @click="addComment">Comment</Button>
            </div>
          </div>

          <ScrollArea class="h-24 mt-4">
            <div v-for="item in comments" :key="item.username + item.content" class="px-4 mt-2.5">
              <CommentsComponent :avatar="item.avatar" :content="item.content" :username="item.username" />
              <Separator class="mt-1" />
            </div>
          </ScrollArea>
        </SplitterPanel>

        <ResizableHandle with-handle />
        <SplitterPanel id="vertical-demo-panel-2" :default-size="50">
          <div class="px-4">
            <LeftHandlePanel />
          </div>
        </SplitterPanel>
      </ResizablePanelGroup>
    </DialogContent>
  </Dialog>
</template>
