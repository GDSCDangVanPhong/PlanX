<script setup lang="ts">

</script>

<template>
    <Select>
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

