<script setup lang="ts">
const level = defineModel<string>()
</script>

<template>
    <Select v-model="level">
        <SelectTrigger>
          <SelectValue placeholder="Choose a level"/>
        </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
</template>

