<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import AvatarGroup from "~/components/CustomizedComps/AvatarGroup.vue";


const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:level', value: string): void
  (e: 'update:modelValue', value: string): void
}>()


const selectedLevel = ref(props.modelValue || 'High')


const levels = [
  { value: 'High', label: 'High', color: 'bg-red-400' },
  { value: 'Medium', label: 'Medium', color: 'bg-yellow-400' },
  { value: 'Low', label: 'Low', color: 'bg-green-400' },
]
const avatars = ['https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2' ]


watch(selectedLevel, (newValue) => {
  emit('update:level', newValue)
  emit('update:modelValue', newValue)
})


const getTriggerClass = () => {
  const level = levels.find(l => l.value === selectedLevel.value)
  return level ? `${level.color} text-white` : 'bg-gray-400 text-white'
}
</script>

<template>
  <div class="mt-2">
    <div class="max-w-fit">
      <Select v-model="selectedLevel">
        <SelectTrigger :class="getTriggerClass()">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent class="w-32">
          <SelectGroup>
            <SelectItem
                v-for="level in levels"
                :key="level.value"
                :value="level.value"
                :class="`${level.color} text-white hover:${level.color} hover:text-white`"
            >
              {{ level.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="border px-4 py-3 mt-2 rounded-md">
      <div class="flex items-center justify-between">
        <span class="font-semibold text-gray-700">Detail</span>
        <span :class="[
          'text-xs px-2 py-1 rounded-full text-white',
          selectedLevel === 'High' ? 'bg-red-400' :
          selectedLevel === 'Medium' ? 'bg-yellow-400' :
          'bg-green-400'
        ]">
          {{ selectedLevel }}
        </span>
      </div>

      <div class="mt-4">
        <span class="text-sm text-gray-600">Assignee</span>


          <AvatarGroup :avatars="avatars" class="!justify-start"/>

      </div>

      <div class="mt-4">
        <span class="text-sm text-gray-600">Status</span>
        <div class="mt-1">
          <span class="text-sm text-gray-500">Pending</span>
        </div>
      </div>
    </div>
  </div>
</template>

