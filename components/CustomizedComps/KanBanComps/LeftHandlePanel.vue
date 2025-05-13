<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Badge } from '~/components/ui/badge'
import AvatarGroup from "~/components/CustomizedComps/AvatarGroup.vue"
import { Button } from '~/components/ui/button'
import { Calendar, Clock, Edit, Trash2, AlertCircle, Plus } from 'lucide-vue-next'

const props = defineProps<{
  taskData: any
}>()
const project = useProjectId()
const isAddingAssignee = ref(false)
const newAssigneeEmail = ref('')
const handleAddAssignee = () => {
  isAddingAssignee.value = true
}

const emit = defineEmits<{
  (e: 'update:level', value: string): void
  (e: 'delete-task'): void
  (e: 'edit-task'): void
  (e: 'add-assignee'): void
}>()

const selectedLevel = ref(props.taskData?.level || 'Medium')
const levelOptions = ['High', 'Medium', 'Low']
const showDeleteDialog = ref(false)

// Format date to readable format
const formatDate = (dateString: string) => {
  if (!dateString) return 'Not set'

  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Calculate days remaining until deadline
const daysUntilDeadline = computed(() => {
  if (!props.taskData?.deadline) return null

  const today = new Date()
  const deadline = new Date(props.taskData.deadline)
  const diffTime = deadline.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
})

// Update level when changed in select
watch(selectedLevel, (newValue) => {
  emit('update:level', newValue)
})

const addAssigneeToTask = async () => {
  if (!newAssigneeEmail.value.trim()) return

  try {
    await $fetch('http://localhost:4000/addToTask', {
      method: 'POST',
      body: {
        assigneeEmail: newAssigneeEmail.value.trim(),
        taskID: props.taskData.taskID,
        projectID: project.projectId,
      },
    })
    newAssigneeEmail.value = ''
    isAddingAssignee.value = false
    emit('add-assignee')
  } catch (e) {
    console.error('Failed to assign:', e)
  }
}


// Create avatar data from assignees
const avatars = computed(() => {
  if (!props.taskData?.assignee || !Array.isArray(props.taskData.assignee)) {
    return []
  }

  return props.taskData.assignee.map((user: any) => ({
    src: user.avatar || '',
    name: user.name || 'User',
  }))
})

// Determine status class based on level
const levelClass = computed(() => {
  switch (selectedLevel.value) {
    case 'High': return 'bg-red-500 hover:bg-red-600'
    case 'Medium': return 'bg-yellow-500 hover:bg-yellow-600'
    case 'Low': return 'bg-green-500 hover:bg-green-600'
    default: return 'bg-slate-500 hover:bg-slate-600'
  }
})

const deadlineStatus = computed(() => {
  if (!daysUntilDeadline.value) return { color: 'text-slate-500', text: 'No deadline' }

  if (daysUntilDeadline.value < 0) {
    return { color: 'text-red-500', text: 'Overdue' }
  } else if (daysUntilDeadline.value === 0) {
    return { color: 'text-orange-500', text: 'Due today' }
  } else if (daysUntilDeadline.value <= 2) {
    return { color: 'text-yellow-500', text: `Due in ${daysUntilDeadline.value} days` }
  } else {
    return { color: 'text-green-500', text: `Due in ${daysUntilDeadline.value} days` }
  }
})
</script>

<template>
  <Card class="border shadow-sm">
    <CardHeader class="pb-2">
      <div class="flex justify-between items-center">
        <CardTitle class="text-lg">Task Details</CardTitle>
        <Select v-model="selectedLevel">
          <SelectTrigger class="w-32">
            <SelectValue :placeholder="selectedLevel" />
          </SelectTrigger>
          <SelectContent class="w-32">
            <SelectGroup>
              <SelectItem v-for="level in levelOptions" :key="level" :value="level">
                <div class="flex items-center gap-2">
                  <Badge :class="[
                    'px-2 py-0.5 text-white',
                    level === 'High' ? 'bg-red-500' :
                    level === 'Medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  ]">
                    {{ level }}
                  </Badge>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <CardDescription>
        <Badge :class="['px-2 py-1 text-white', levelClass]">
          {{ selectedLevel }}
        </Badge>
      </CardDescription>
    </CardHeader>

    <CardContent>
      <div class="space-y-4">
        <!-- Assignees -->
        <div>
          <div v-if="isAddingAssignee" class="flex items-center gap-2">
            <input
                v-model="newAssigneeEmail"
                type="email"
                placeholder="Enter email"
                class="border px-2 py-1 rounded text-sm w-64"
                @keyup.enter="addAssigneeToTask"
                @blur="addAssigneeToTask"
            />
          </div>
          <div v-else class="flex items-center justify-between w-full">
            <div v-if="avatars.length">
              <Avatar class="h-8 w-8 bg-slate-100">
                <AvatarFallback class="text-slate-400">CN</AvatarFallback>
              </Avatar>

            </div>
            <div v-else class="flex items-center w-full text-slate-400">
              <span class="ml-2 text-sm ">No assignees</span>
              <Button variant="outline" size="sm" class="ml-auto" @click="handleAddAssignee">
                <Plus class="h-4 w-4 mr-1" />
                    Add
              </Button>
            </div>

          </div>


        </div>


        <Separator />

        <div>
          <h3 class="text-sm font-medium text-slate-500 mb-1">Deadline</h3>
          <div class="flex items-center">
            <Calendar class="h-4 w-4 mr-2 text-slate-400" />
            <span class="text-sm text-slate-700">{{ formatDate(props.taskData?.deadline) }}</span>
          </div>
          <div v-if="daysUntilDeadline" class="flex items-center mt-1">
            <Clock class="h-4 w-4 mr-2" :class="deadlineStatus.color" />
            <span class="text-sm" :class="deadlineStatus.color">{{ deadlineStatus.text }}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>