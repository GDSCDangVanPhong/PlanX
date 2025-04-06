<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const value = ref<DateValue>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
          variant="outline"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent  >
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>

