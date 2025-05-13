<script setup lang="ts">
import { ref, computed, h, watch } from 'vue'
import { CalendarDate, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { toDate } from 'reka-ui/date'
import { DateFormatter } from '@internationalized/date'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-vue-next'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const df = new DateFormatter('en-US', { dateStyle: 'long' })

const props = defineProps<{
  modelValue?: CalendarDate | null
}>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
          variant="outline"
          class="w-[240px] ps-3 text-start font-normal"
      >
        <span>{{ value ? df.format(toDate(value)) : "Pick a deadline" }}</span>
        <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
          v-model="value"
          :min-value="today(getLocalTimeZone())"
          calendar-label="Deadline"
          initial-focus
      />
    </PopoverContent>
  </Popover>
</template>
